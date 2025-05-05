import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { story, StoryNode } from '../lib/story';
import { Howl } from 'howler';
// ...imports unchanged
import styles from '../styles/StoryEngine.module.css';

const StoryEngine = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentId, setCurrentId] = useState<string>('start');
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [history, setHistory] = useState<StoryNode[]>([]);
  const beep = useRef<Howl | null>(null);
  const node: StoryNode = story[currentId];

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

    const interval = setInterval(() => {
      if (index < node.text.length) {
        setDisplayedText((prev) => prev + node.text[index]);
        if (index > 2 && index % 2 === 0 && node.text[index] !== ' ') {
          beep.current?.play();
        }
        index++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [currentId, hasStarted]);

  const restartStory = () => {
    setHasStarted(false);
    setCurrentId('start');
    setDisplayedText('');
    setHistory([]);
    localStorage.removeItem('storyNode');
  };

  if (!hasStarted) {
    return (
      <div className={styles.intro}>
        <h1>Welcome to the Story</h1>
        <p>Click the button to begin. Turn up your volume for the best experience.</p>
        <button onClick={() => setHasStarted(true)}>Start Story</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.storyPanel}>
        {node.image && (
          <div className={styles.storyImageContainer}>
            <Image src={node.image} alt="Scene" fill className={styles.storyImage} />
          </div>
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

        <div className={styles.choices}>
          {node.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => {
                setHistory((prev) => [...prev, node]);
                setCurrentId(choice.nextId);
              }}
              className={styles.choiceButton}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical decision tree panel */}
      <div className={styles.treePanel}>
        <h2>Your Path</h2>
        <div className={styles.tree}>
          {history.map((node, index) => (
            <div key={index} className={styles.treeNode}>
              <div className={styles.connector}></div>
              <div className={styles.nodeBox}>{node.title}</div>
            </div>
          ))}
          {/* Current node */}
          <div className={styles.treeNode}>
            <div className={styles.connector}></div>
            <div className={`${styles.nodeBox} ${styles.current}`}>{node.title}</div>
          </div>
        </div>
        <button onClick={restartStory} className={styles.restartButton}>
          Start Again
        </button>
      </div>
    </div>
  );
};

export default StoryEngine;
