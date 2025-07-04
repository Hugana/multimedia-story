import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { story, StoryNode, StoryHotspot } from '../lib/story';
import { Howl } from 'howler';
import styles from '../styles/StoryEngine.module.css';


type AppConfig = {
  interface: {
    font: string;
    textSpeed: number;
    background: string;
    primaryColor: string;
    textColor: string;
  };
  textbox: {
    font: string;
    textSpeed: number;
    background: string;
    primaryColor: string;
    textColor: string;
  };
};


type PathNode = {
  id: string;
  children: PathNode[];
  parent?: PathNode;
};

const createNode = (id: string, parent?: PathNode): PathNode => ({
  id,
  parent,
  children: []
});

const StoryEngine = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentNode, setCurrentNode] = useState<PathNode>(() => createNode('start'));
  const [rootNode, setRootNode] = useState<PathNode>(() => createNode('start'));
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleChoices, setVisibleChoices] = useState<boolean[]>([]);
  const beep = useRef<Howl | null>(null);
  const narrationAudio = useRef<Howl | null>(null);
  const node: StoryNode = story[currentNode.id];
  const [activeHotspot, setActiveHotspot] = useState<StoryHotspot | null>(null);
  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
  const [config, setConfig] = useState<AppConfig | null>(null);



  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch('/config/config.xml'); // usa /config/ e não ../config/
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');

        const getSectionValue = (section: string, tag: string) =>
          xml.querySelector(`${section} > ${tag}`)?.textContent?.trim() || '';

        const newConfig: AppConfig = {
          interface: {
            font: getSectionValue('interface', 'font'),
            textSpeed: parseInt(getSectionValue('interface', 'textSpeed') || '25'),
            background: getSectionValue('interface', 'background'),
            primaryColor: getSectionValue('interface', 'primaryColor'),
            textColor: getSectionValue('interface', 'textColor'),
          },
          textbox: {
            font: getSectionValue('textbox', 'font'),
            textSpeed: parseInt(getSectionValue('textbox', 'textSpeed') || '25'),
            background: getSectionValue('textbox', 'background'),
            primaryColor: getSectionValue('textbox', 'primaryColor'),
            textColor: getSectionValue('textbox', 'textColor'),
          },
        };

        setConfig(newConfig);
      } catch (err) {
        console.error('Failed to load config.xml:', err);
      }
    };

    loadConfig();
  }, []);


  useEffect(() => {
    if (!hasStarted) return;

    setActiveHotspot(null);
    let index = 0;
    setDisplayedText('');
    setIsAnimating(true);

    narrationAudio.current?.stop();
    narrationAudio.current = null;

    if (node.audio) {
      narrationAudio.current = new Howl({
        src: [node.audio],
        volume: node.audioVolume ?? 1.0,
        loop: node.audioLoop ?? false,
      });
      narrationAudio.current.play();

      if (node.audioDuration) {
        setTimeout(() => {
          narrationAudio.current?.stop();
        }, node.audioDuration);
      }
    }

    const interval = setInterval(() => {
      const char = node.text[index];
      if (char !== undefined) {
        setDisplayedText((prev) => prev + char);
        if (beep.current && index > 0 && index % 2 === 0 && char.match(/[a-zA-Z0-9]/)) {
          beep.current.play();
        }
        index++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 25);

    // -- Begin: Choice visibility logic --
    const newVisibilities = node.choices.map(() => false);
    setVisibleChoices(newVisibilities);

    const timeouts: NodeJS.Timeout[] = [];

    node.choices.forEach((choice, i) => {
      const delay = choice.appearDelay ?? 0;
      const duration = choice.visibleDuration ?? null;

      const showTimer = setTimeout(() => {
        setVisibleChoices((prev) => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      }, delay);
      timeouts.push(showTimer);

      if (duration !== null) {
        const hideTimer = setTimeout(() => {
          setVisibleChoices((prev) => {
            const updated = [...prev];
            updated[i] = false;
            return updated;
          });
        }, delay + duration);
        timeouts.push(hideTimer);
      }
    });

    // -- End: Choice visibility logic --

    return () => {
      clearInterval(interval);
      narrationAudio.current?.stop();
      timeouts.forEach(clearTimeout);
    };
  }, [currentNode.id, hasStarted]);


  const restartStory = () => {
    const newRoot = createNode('start');
    setRootNode(newRoot);
    setCurrentNode(newRoot);
    setDisplayedText('');
    setHasStarted(false);
  };

  const structuredCloneTree = (node: PathNode, parent?: PathNode): PathNode => {
    const clone: PathNode = {
      id: node.id,
      parent,
      children: node.children.map((child) => structuredCloneTree(child))
    };
    clone.children.forEach((child) => (child.parent = clone));
    return clone;
  };

  const findNodeById = (node: PathNode, id: string): PathNode | undefined => {
    if (node.id === id) return node;
    for (const child of node.children) {
      const result = findNodeById(child, id);
      if (result) return result;
    }
    return undefined;
  };

  const handleChoice = (nextId: string) => {
    const existing = currentNode.children.find((child) => child.id === nextId);
    if (existing) {
      setCurrentNode(existing);
    } else {
      const newNode = createNode(nextId, currentNode);
      const newRoot = structuredCloneTree(rootNode);
      const updatedCurrent = findNodeById(newRoot, currentNode.id);
      if (updatedCurrent) {
        updatedCurrent.children.push(newNode);
      }
      setRootNode(newRoot);
      setCurrentNode(newNode);
    }


  };

  const renderTree = (node: PathNode, depth = 0) => (
      <div
        className={`${styles.treeNodeWrapper} ${depth === 0 ? styles.rootNode : ''}`}
        key={node.id}
      >
        <div
          className={`${styles.nodeBox} ${node.id === currentNode.id ? styles.current : ''}`}
          onClick={() => setCurrentNode(node)}
          onMouseEnter={() => setHoverNodeId(node.id)}
          onMouseLeave={() => setHoverNodeId(null)}
          style={{ position: 'relative' }} 
        >
          {story[node.id]?.title || node.id}

          {hoverNodeId === node.id && (
            <div className={styles.thumbnailPreview}>
              {story[node.id]?.video ? (
                <VideoThumbnail videoSrc={story[node.id].video!} />
              ) : story[node.id]?.image ? (
                <img
                  src={story[node.id].image!}
                  alt="Thumbnail"
                  className={styles.thumbnailImage}
                />
              ) : null}
            </div>
          )}
        </div>

        <div className={styles.childrenContainer}>
          {node.children.map((child) => renderTree(child, depth + 1))}
        </div>
      </div>
    );

  if (!hasStarted) {
    return (
      <div className={styles.intro} 
      style={{
        backgroundColor: config?.interface.background,
        color: config?.interface.textColor,
        fontFamily: config?.interface.font,
        margin: 0,
        padding: 0,
        height: "100%",
        width: "100%",
      }}>
        <h1 className={styles.engineTitle}>VisioPath</h1>
        <p className={styles.engineSubtitle}>Your story, your choices, your world—on the web.</p>
        <p className={styles.enginePrompt}>Click the button to begin. Turn up your volume for the best experience.</p>
        <button onClick={() => setHasStarted(true)} className={styles.startButton}>
          Start Story
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}
      style={{
      backgroundColor: config?.interface.background,
      color: config?.interface.textColor,
      fontFamily: config?.interface.font,
    }}>
      <div className={styles.storyPanel}>
        <div key={currentNode.id} className={`${styles.storyMediaContainer} ${styles.fadeInSlideUp}`}>
          {node.video ? (
            <video
              src={node.video}
              autoPlay
              loop={false}
              muted
              controls={false}
              className={`${styles.storyVideo}`}
              onEnded={() => {
                if (node.defaultChoiceId) {
                  handleChoice(node.defaultChoiceId);
                }
              }}
            />
          ) : (
            <Image
              src={node.image!}
              alt="Scene"
              fill
              className={`${styles.storyImage}`}
            />
          )}

          {node.hotspots?.map((hotspot, index) => (
            <div
              key={index}
              className={styles.hotspot}
              style={{
                position: 'relative',
                ...hotspot.area,
                cursor: 'pointer',
                zIndex: 5
              }}
              onClick={() => {
                if (hotspot.nextId) handleChoice(hotspot.nextId);
                if (hotspot.text) setActiveHotspot(hotspot);
              }}
              title={hotspot.label}
            />
          ))}

          {activeHotspot && activeHotspot.text && (
            <div
              className={styles.hotspotPopup}
              style={{
                position: 'absolute',
                top: activeHotspot.area.top,
                left: activeHotspot.area.left,
                zIndex: 10,

              }}
              onClick={() => setActiveHotspot(null)}
            >
              {activeHotspot.text}
            </div>
          )}

          <p
            className={styles.storyText}
            style={{
              fontFamily: config?.textbox.font
            }}
            onClick={() => {
              if (isAnimating) {
                setDisplayedText(node.text);
                setIsAnimating(false);
              }
            }}
          >
            {displayedText}
          </p>

          {node.choices.map((choice, index) =>
            visibleChoices[index] ? (
              <button
                key={index}
                onClick={() => handleChoice(choice.nextId)}
                className={styles.choiceButton}
                style={{
                  fontFamily: config?.interface.font,
                  position: 'absolute',
                  ...choice.position,
                  zIndex: 10
                }}
              >
                {choice.text}
              </button>
            ) : null
          )}

        </div>

        <button onClick={restartStory} className={styles.restartButton}>
          Start Again
        </button>
      </div>

      <div className={styles.treePanel} 
      style={{
      fontFamily: config?.interface.font,
      }}>
        <h2 >Story Tree</h2>
        <div className={styles.tree}>{renderTree(rootNode)}</div>
      </div>
    </div>
  );
};

const VideoThumbnail = ({ videoSrc }: { videoSrc: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');

    const handleSeeked = () => {
      if (!ctx) return; 
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const url = canvas.toDataURL();
      setImageURL(url);
    };

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = 2;
    });
    video.addEventListener('seeked', handleSeeked, { once: true });

    return () => {
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [videoSrc]);

  return (
    <>
      {!imageURL && (
        <>
          <video
            ref={videoRef}
            src={videoSrc}
            style={{ display: 'none' }}
            preload="auto"
            crossOrigin="anonymous"
          />
          <canvas
            ref={canvasRef}
            width={160}
            height={90}
            style={{ display: 'none' }}
          />
        </>
      )}
      {imageURL && <img src={imageURL} alt="Thumbnail" style={{ width: '100%', borderRadius: '4px' }} />}
    </>
  );
};

export default StoryEngine;
