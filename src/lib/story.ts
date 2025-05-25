export interface StoryChoice {
  text: string;
  nextId: string;
  appearDelay?: number;
  visibleDuration?: number | null;
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}


export interface StoryNode {
  id: string;
  title?: string;
  text: string;
  image?: string;
  video?: string;
  audio?: string;
  choices: StoryChoice[];
  defaultChoiceId?: string; // <--- NEW: ID of default choice
  hotspots?: StoryHotspot[];
}

export interface StoryHotspot {
  area: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  label?: string; // for accessibility or tooltip
  nextId?: string; // optional, to trigger a jump
  text?: string;   // optional, to show a popup
}


export const story: Record<string, StoryNode> = {
  start: {
    id: 'start',
    title: 'In the Beginning',
    text: 'At the Faculty of Sciences of the University of Lisbon, where the corridors smell of burnt coffee and academic hopelessness, there was something dark going on.',
    video: '/Videos/Fcul.mp4',
    defaultChoiceId: 'joao',
    choices: [
      {
        text: 'Joao',
        nextId: 'joao',
        appearDelay: 4000,
        visibleDuration: null,
        position: { top: '50%', right: '10%' }
      },
      {
        text: 'Sofia',
        nextId: 'sofia',
        appearDelay: 4000,
        visibleDuration: null,
        position: { top: '10%', right: '50%' }
      },
    ]
  },
  joao: {
    id: 'joao',
    title: 'João Limão',
    text: 'João Limão, with his revolutionary mane fluttering in the Almada wind, had just received his final exam grade for “Networks of Interdimensional Distributed Systems”: 8.9. Unacceptable. A public humiliation. An ideological betrayal.',
    image: '/Images/JoaoLimao.png',
    choices: [
      {
        text: 'Next',
        nextId: 'sofia',
        appearDelay: 1000,
        visibleDuration: null,
        position: { top: '30px', right: '30px' }
      },
    ]
  },
  sofia: {
    id: 'sofia',
    title: 'Sofia the Magician',
    text: 'Next to her, Sofia “The Magician”, sitting in an inverted lotus position in the middle of the study room, was consulting the spirits of the realm of the dead - the only ones who still knew how Moodle worked. She too had failed. And the spirits were angry.',
    image: '/Images/sofiaAMaga.png',
    choices: [
      {
        text: 'Next',
        nextId: 'hugo',
        appearDelay: 2000,
        visibleDuration: null,
        position: { top: '30px', left: '30px' }
      },
    ],
    hotspots: [
    {
      area: { top: '12%', left: '50%', width: '10%', height: '20%' },
      label: 'Chama da sofia',
      text: 'Chama da sofia'
    },
    
  ]
  },
  hugo: {
    id: 'hugo',
    title: 'Hugo Linux Master',
    text: 'Hugana, wearing a hoodie with a ninja turtle print and a Linux terminal that was always open, muttered: \n\nThis was sabotage... Tito is using evil AI to fix tests... I detected an obscure process called grade_reaper.py.',
    image: '/Images/HugoLinux.png',
    choices: [
      {
        text: 'Next',
        nextId: '1',
        appearDelay: 3000,
        visibleDuration: 8000,
        position: { bottom: '30px', left: '50%' } // center bottom
      },
    ]
  },
  1: {
    id: '1',
    title: 'The Reunion',
    text: 'And that\'s how the three of them decided: they were going to hack Tito\'s system.',
    image: '/Images/thereunion.png',
    choices: [
      {
        text: 'Next',
        nextId: 'start',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },
};

