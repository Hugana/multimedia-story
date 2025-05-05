export type StoryNode = {
  id: string;
  title: string; // 👈 NEW
  text: string;
  image?: string;
  choices: {
    text: string;
    nextId: string;
  }[];
};

export const story: Record<string, StoryNode> = {
  start: {
    id: 'start',
    title: 'The Awakening',
    text: 'You wake up in a dark, damp room. The air smells of mold. You hear faint whispers from behind the walls.',
    image: '/Images/actimel.png',
    choices: [
      { text: 'joao', nextId: 'joao' },
      { text: 'padre', nextId: 'padre' }
    ]
  },
  joao: {
    id: 'joao',
    title: 'Symbols on the Wall',
    text: 'The candle illuminates strange symbols written in red across the walls. The whispers grow louder.',
    image: '/Images/joao.png',
    choices: [
      { text: 'start', nextId: 'start' },
      { text: 'nova', nextId: 'nova' }
    ]
  },
  padre: {
    id: 'padre',
    title: 'The Whispers',
    text: 'The candle illuminates strange symbols written in red across the walls. The whispers grow louder.',
    image: '/Images/padre.png',
    choices: [
      { text: 'start', nextId: 'start' },
      { text: 'nova2', nextId: 'nova2' }
    ]
  },
  nova: {
    id: 'nova',
    title: 'The Whispers',
    text: 'The candle illuminates strange symbols written in red across the walls. The whispers grow louder.',
    image: '/Images/padre.png',
    choices: [
      { text: 'start', nextId: 'start' },
      { text: 'nova2', nextId: 'nova2' }
    ]
  },
  nova2: {
    id: 'nova2',
    title: 'The Whispers',
    text: 'The candle illuminates strange symbols written in red across the walls. The whispers grow louder.',
    image: '/Images/padre.png',
    choices: [
      { text: 'start', nextId: 'start' },
      { text: 'nova2', nextId: 'nova2' }
    ]
  },
};
