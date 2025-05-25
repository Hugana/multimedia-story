import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { story, StoryNode } from '../lib/story';
import { Howl } from 'howler';
import styles from '../styles/StoryEngine.module.css';

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

  useEffect(() => {
    if (hasStarted && !beep.current) {
      beep.current = new Howl({ src: ['/sounds/beeps.mp3'], volume: 0.15 });
    }
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
  
    let index = 0;
    setDisplayedText('');
    setIsAnimating(true);
  
    narrationAudio.current?.stop();
    narrationAudio.current = null;
  
    if (node.audio) {
      narrationAudio.current = new Howl({ src: [node.audio], volume: 1.0 });
      narrationAudio.current.play();
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
    <div className={`${styles.treeNodeWrapper} ${depth === 0 ? styles.rootNode : ''}`} key={node.id}>
      <div
        className={`${styles.nodeBox} ${node.id === currentNode.id ? styles.current : ''}`}
        onClick={() => setCurrentNode(node)}
      >
        {story[node.id]?.title || node.id}
      </div>
      <div className={styles.childrenContainer}>
        {node.children.map((child) => renderTree(child, depth + 1))}
      </div>
    </div>
  );

  if (!hasStarted) {
    return (
      <div className={styles.intro}>
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
    <div className={styles.container}>
      <div className={styles.storyPanel}>
        <div key={currentNode.id} className={`${styles.storyMediaContainer} ${styles.fadeInSlideUp}`}>
        {node.video ? (
          <video
            src={node.video}
            autoPlay
            loop
            muted
            controls={false}
            className={`${styles.storyVideo}`}
          />
        ) : (
          <Image
            src={node.image!}
            alt="Scene"
            fill
            className={`${styles.storyImage}`}
          />
        )}


    <p
      className={styles.storyText}
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

      <div className={styles.treePanel}>
        <h2>Story Tree</h2>
        <div className={styles.tree}>{renderTree(rootNode)}</div>
      </div>
    </div>
  );
};

export default StoryEngine;
