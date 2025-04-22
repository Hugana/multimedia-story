import { useEffect, useState } from 'react';
import Image from 'next/image';
import { story, StoryNode } from '../lib/story';

const StoryEngine = () => {
  const [currentId, setCurrentId] = useState<string>('start');
  const node: StoryNode = story[currentId];

  // Load progress from localStorage
  /*useEffect(() => {
    const saved = localStorage.getItem('storyNode');
    if (saved && story[saved]) {
      setCurrentId(saved);
    }
  }, []);*/

  // Save progress when the node changes
  useEffect(() => {
    localStorage.setItem('storyNode', currentId);
  }, [currentId]);

  return (
    <div style={{
      backgroundColor: '#222',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 0 20px rgba(0,0,0,0.4)'
    }}>
    {node.image && (
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3', // or whatever ratio matches your images best
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '1rem',
          backgroundColor: '#000' // optional: adds background around smaller images
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


      <p style={{ fontSize: '1.3rem', lineHeight: 1.6, marginBottom: '2rem' }}>
        {node.text}
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
              transition: 'background-color 0.2s'
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
