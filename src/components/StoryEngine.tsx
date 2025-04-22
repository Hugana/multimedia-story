import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { story, StoryNode } from '../lib/story';
import { Howl } from 'howler';

const StoryEngine = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentId, setCurrentId] = useState<string>('start');
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const node: StoryNode = story[currentId];

  const beep = useRef<Howl | null>(null);

  // Initialize beep sound AFTER user starts
  useEffect(() => {
    if (hasStarted && !beep.current) {
      beep.current = new Howl({
        src: ['/sounds/beeps.mp3'],
        volume: 0.15,
        preload: true
      });
    }
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let index = 0;

    setDisplayedText('');
    setIsAnimating(true);

    const interval = setInterval(() => {
      if (index < node.text.length) {
        const char = node.text[index];
        if (char !== undefined) {
          setDisplayedText((prev) => prev + char);

          if (index > 2 && index % 2 === 0 && char !== ' ') {
            beep.current?.play();
          }
        }
        index++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, [currentId, hasStarted]);

  // Save current story slide
  useEffect(() => {
    if (hasStarted) {
      localStorage.setItem('storyNode', currentId);
    }
  }, [currentId, hasStarted]);

  // 👉 Intro screen before story starts
  if (!hasStarted) {
    return (
      <div style={{
        color: 'white',
        textAlign: 'center',
        padding: '4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'UndertaleFont'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Welcome to the Story</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Click the button to begin. Turn up your volume for the best experience.
        </p>
        <button
          onClick={() => setHasStarted(true)}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'UndertaleFont'
          }}
        >
          Start Story
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#222',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 0 20px rgba(0,0,0,0.4)',
      fontFamily: 'UndertaleFont',
      color: 'white'
    }}>
      {node.image && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4 / 3',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '1rem',
            backgroundColor: '#000'
          }}
        >
          <Image
            src={node.image}
            alt="Scene"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      <p
        style={{
          fontSize: '1.3rem',
          lineHeight: 1.6,
          marginBottom: '2rem',
          cursor: isAnimating ? 'pointer' : 'default'
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {node.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => setCurrentId(choice.nextId)}
            style={{
              padding: '1rem',
              fontSize: '1rem',
              backgroundColor: '#444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              fontFamily: 'UndertaleFont'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#666')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#444')}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoryEngine;
