export type StoryNode = {
    id: string;
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
      text: 'You wake up in a dark, damp room. The air smells of mold. You hear faint whispers from behind the walls.',
      image: '/Images/actimel.png',
      choices: [
        { text: 'Light a candle nearby', nextId: 'joao' },
        { text: 'Knock on the wall', nextId: 'padre' }
      ]
    },
    joao: {
      id: 'joao',
      text: 'The candle illuminates strange symbols written in red across the walls. The whispers grow louder.',
      image: '/Images/joao.png',
      choices: [
        { text: 'Read the symbols aloud', nextId: 'symbols' },
        { text: 'Extinguish the candle', nextId: 'dark' }
      ]
    },
    padre: {
        id: 'padre',
        text: 'The candle illuminates strange symbols written in red across the walls. The whispers grow louder.',
        image: '/Images/padre.png',
        choices: [
          { text: 'Read the symbols aloud', nextId: 'symbols' },
          { text: 'Extinguish the candle', nextId: 'dark' }
        ]
      },
  };
  