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

export interface StoryHotspot {
  area: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  label?: string;
  nextId?: string;
  text?: string;
}

export interface StoryNode {
  id: string;
  title?: string;
  text: string;
  image?: string;
  video?: string;
  audio?: string;
  audioVolume?: number;      // volume entre 0.0 e 1.0
  audioDuration?: number;    // duração em milissegundos
  audioLoop?: boolean;
  choices: StoryChoice[];
  defaultChoiceId?: string;
  hotspots?: StoryHotspot[];
}

export const story: Record<string, StoryNode> = {
  start: {
    id: 'start',
    title: 'In the Beginning',
    text: 'At the Faculty of Sciences of the University of Lisbon, where the corridors smell of burnt coffee and academic hopelessness, there was something dark going on.',
    video: '/Videos/Fcul.mp4',
    audio: '/sounds/university.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    defaultChoiceId: 'EvilProfessor',
    choices: [
      {
        text: 'Next',
        nextId: 'EvilProfessor',
        appearDelay: 4000,
        visibleDuration: null,
        position: { top: '10%', right: '45%' }
      },
    ]
  },
  EvilProfessor: {
    id: 'EvilProfessor',
    title: 'The Evil Professor',
    text: 'Tito the evil professor using an AI to deliberate rate the students with 9.4 on the subject of “Networks of Interdimensional Distributed Systems”.',
    image: '/Images/EvilProfessor.png',
    audio: '/sounds/evil-professor.mp3',
    audioVolume: 0.2,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'sofia',
        appearDelay: 2000,
        visibleDuration: null,
        position: { top: '30px', left: '30px' }
      },
    ]
  },
  sofia: {
    id: 'sofia',
    title: 'Sofia the Magician',
    text: 'Sofia “The Magician”, sitting in an inverted lotus position in the middle of the study room, was consulting the spirits of the realm of the dead - the only ones who still knew how Moodle worked. She too had failed. And the spirits were angry.',
    image: '/Images/sofiaAMaga.png',
    audio: '/sounds/sofia-sound.mp3',
    audioVolume: 0.2,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'joao',
        appearDelay: 2000,
        visibleDuration: null,
        position: { top: '30px', left: '30px' }
      },
    ],
    hotspots: [
      {
        area: { top: '12%', left: '50%', width: '10%', height: '20%' },
        label: 'Sofia\'s flame',
        text: 'Powers of the undead',
      },

    ]
  },
  hugo: {
    id: 'hugo',
    title: 'Hugo Linux Master',
    text: 'Hugo, wearing a hoodie with a ninja turtle print and a Linux terminal that was always open, muttered: \n\nThis was sabotage... Tito is using evil AI to fix tests... I detected an obscure process called grade_reaper.py.',
    image: '/Images/HugoLinux.png',
    audio: '/sounds/hugana.mp3',
    audioVolume: 0.1,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'TheReunion',
        appearDelay: 2000,
        visibleDuration: null,
        position: { top: '30px', left: '30px' }
      },
    ]
  },
  joao: {
    id: 'joao',
    title: 'João Limão',
    text: 'João Limão, with his revolutionary mane fluttering in the Almada wind, had just received his final exam grade for “Networks of Interdimensional Distributed Systems”: 9.4. Unacceptable. A public humiliation. An ideological betrayal.',
    image: '/Images/JoaoLimao.png',
    audio: '/sounds/joao.mp3',
    audioVolume: 0.1,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'hugo',
        appearDelay: 2000,
        visibleDuration: null,
        position: { top: '30px', left: '30px' }
      },
    ]
  },
  TheReunion: {
    id: 'TheReunion',
    title: 'The Reunion',
    text: 'Due to the evil plans of Tito the three of them decided: they were going to hack Tito\'s system.',
    image: '/Images/thereunion.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'ChoiceDoor',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },
  ChoiceDoor: {
    id: 'ChoiceDoor',
    title: 'The First Challenge',
    text: 'Our heroes arrive at the door of Room R. There are sensors, a keypad with thermal recognition and... a handwritten sign \n (Make the correct choice).',
    image: '/Images/ChoiceDoor.png',
    audio: '/sounds/first-challenge.mp3',
    audioVolume: 0.1,
    audioLoop: true,
    choices: [
      {
        text: 'Sofia',
        nextId: 'ChoiceDoorSofia1',
        appearDelay: 100,
        visibleDuration: null,
        position: { top: '20%', right: '57%' }
      },
      {
        text: 'Hugo',
        nextId: 'ChoiceDoorHugo1',
        appearDelay: 100,
        visibleDuration: null,
        position: { top: '16%', right: '67%' }
      },
      {
        text: 'João',
        nextId: 'ChoiceDoorJoao1',
        appearDelay: 100,
        visibleDuration: null,
        position: { top: '12%', right: '26%' }
      },
    ]
  },
  ChoiceDoorSofia1: {
    id: 'ChoiceDoorSofia1',
    title: 'Sofia casts a spell',
    text: 'Sofia cast\'s a spell to disguice her friends to appear like students that have 20.',
    image: '/Images/ChoiceDoorSofia1.png',
    audio: '/sounds/spell.mp3',
    audioVolume: 0.1,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'ChoiceDoorSofia2',
        appearDelay: 2000,
        visibleDuration: null,
        position: { top: '30px', left: '30px' }
      },
    ]
  },
  ChoiceDoorSofia2: {
    id: 'ChoiceDoorSofia2',
    title: 'Evil Spirit Challenge',
    text: 'The Sofia spell was not strong enough, and the door was protected by black magic. This summoned the evil professor in spirit form.',
    image: '/Images/ChoiceDoorSofia2.png',
    audio: '/sounds/demon.mp3',
    audioVolume: 0.1,
    audioLoop: true,
    choices: [
      {
        text: 'Wrong Choice, Repeat the Challenge',
        nextId: 'ChoiceDoor',
        appearDelay: 2000,
        visibleDuration: null,
        position: { top: '30px', left: '30px' }
      },
    ]
  },
  ChoiceDoorJoao1: {
    id: 'ChoiceDoorJoao1',
    title: 'João grabs the crowbar and a wine bottle',
    text: 'João gets a crowbar and a wine bottle, saying, "This needs to be broken with pure strength."',
    image: '/Images/ChoiceDoorJoao1.png',
    audio: '/sounds/glass-breaking.mp3',
    audioVolume: 0.1,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'ChoiceDoorJoao2',
        appearDelay: 2000,
        visibleDuration: null,
        position: { top: '30px', left: '30px' }
      },
    ]
  },
  ChoiceDoorJoao2: {
    id: 'ChoiceDoorJoao2',
    title: 'João grabs the crowbar and a wine bottle',
    text: 'João tried to break the door down, but it was too strong. He ended up pooping himself...',
    image: '/Images/ChoiceDoorJoao2.png',
    audio: '/sounds/fart.mp3',
    audioVolume: 0.1,
    audioLoop: true,
    choices: [
      {
        text: 'Wrong Choice, Repeat the Challenge',
        nextId: 'ChoiceDoor',
        appearDelay: 2000,
        visibleDuration: null,
        position: { top: '30px', left: '30px' }
      },
    ]
  },
  ChoiceDoorHugo1: {
    id: 'ChoiceDoorHugo1',
    title: 'Super Linux Programmer Mode',
    text: 'Hugo gathers his strength and enters "Super Programmer Linux Mode", executing the OpenSesame.py program by typing ultra-fast.',
    image: '/Images/ChoiceDoorHugo1.png',
    audio: '/sounds/power-up.mp3',
    audioVolume: 0.1,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'ChoiceDoorHugo3',
        appearDelay: 2000,
        visibleDuration: null,
        position: { top: '30px', left: '30px' }
      },
    ]
  },
  ChoiceDoorHugo3: {
    id: 'ChoiceDoorHugo3',
    title: 'Hugo programming',
    text: '',
    video: '/Videos/hugo3.mp4',
    audio: '/sounds/climax.mp3',
    audioVolume: 0.4,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'ChoiceDoorHugo2',
        appearDelay: 2000,
        visibleDuration: null,
        position: { top: '30px', left: '30px' }
      },
    ]
  },
  ChoiceDoorHugo2: {
    id: 'ChoiceDoorHugo2',
    title: 'The Door opens',
    text: 'The door opens and Hugo is drained after that huge effort.',
    image: '/Images/ChoiceDoorHugo2.png',
    audio: '/sounds/door-opening.mp3',
    audioVolume: 0.4,
    audioLoop: true,
    choices: [
      {
        text: 'Great Job! Next',
        nextId: 'EvilProfessorGabinetChallenge',
        appearDelay: 2000,
        visibleDuration: null,
        position: { top: '30px', left: '30px' }
      },
    ]
  },
  EvilProfessorGabinetChallenge: {
    id: 'EvilProfessorGabinetChallenge',
    title: 'The Gabinet',
    text: '(Obtain information about the professor and when ready click on the computer).',
    image: '/Images/EvilProfessorGabinet.png',
    audio: 'sounds/dramatic-sound.mp3',
    audioVolume: 0.2,
    audioLoop: true,
    choices: [],
    hotspots: [
      {
        area: { top: '24%', left: '57%', width: '5%', height: '15%' },
        label: 'Tito Trophy',
        text: 'Tito was awarded the most evil professor of all time.',
      },
      {
        area: { top: '0%', left: '17%', width: '12%', height: '12%' },
        label: 'Student skull',
        text: 'The skull of the last student to ever challenge Tito and make a report to the director.',
      },
      {
        area: { top: '13%', left: '67%', width: '12%', height: '12%' },
        label: 'THE END',
        nextId: 'EvilProfessorDesktop'
      },
    ]
  },

  EvilProfessorDesktop: {
    id: 'EvilProfessorDesktop',
    title: 'Desktop',
    text: 'The students were able to change the grade but a suspicious file caught their eyes (click projeto_presidencial.mrs).',
    image: '/Images/DesktopEnv.png',
    audio: 'sounds/dramatic-sound.mp3',
    audioVolume: 0.2,
    audioLoop: true,
    choices: [],
    hotspots: [
      {
        area: { top: '14%', left: '52%', width: '10%', height: '15%' },
        label: 'SUS File',
        text: 'SUS File.',
        nextId: 'ThePresidencialPlot'
      },
    
    ]
  },

  ThePresidencialPlot: {
    id: 'ThePresidencialPlot',
    title: 'The ThePresidencialPlot',
    text: '“Operation MAGNO - Initiated by Marcelo and Tito in 2017. \n Objective: To create a national assessment algorithm to level out students averages and avoid ‘academic inflation’.And more... The system would be secretly fed by the students social networks, the location of their cell phones on exam days, and... the consumption of coffee in the college machines.',
    image: '/Images/MarceloAndEvilSetor.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'TheReunion2',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  TheReunion2: {
    id: 'TheReunion2',
    title: 'The Reunion 2',
    text: 'Sofia, Hugo and João sit drinking and thinking about how they can stop the madness.',
    image: '/Images/thereunion2.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'AndreMatos',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  AndreMatos: {
    id: 'AndreMatos',
    title: 'André Matos',
    text: 'André Matos: You guys are trying to change the system. I tried too... in 2002. I failed. But I left a door open.',
    image: '/Images/AndreMatos.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'SofiaAsking',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  SofiaAsking: {
    id: 'SofiaAsking',
    title: 'Sofia Asking',
    text: 'Sofia “The Magician”: You are the author of the script sistema-vampiro-2002.sh?!',
    image: '/Images/SofiaAsking.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'AndreMatos1',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

   AndreMatos1: {
    id: 'AndreMatos1',
    title: 'André Matos',
    text: 'André Matos: I am. But it only works if you have access to the rector central server, and for that, you wil need something that few people know about: the incomplete proof key, hidden in the abandoned lab.',
    image: '/Images/AndreMatos.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'AbandonedLab',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  AbandonedLab: {
    id: 'AbandonedLab',
    title: 'The Abandoned Lab',
    text: 'Our heroes have now arrived at the Abandoned Lab.',
    image: '/Images/AbandonedLab.png',
    audio: '/sounds/first-challenge.mp3',
    audioVolume: 0.1,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'DemonicProfessor',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  DemonicProfessor: {
    id: 'DemonicProfessor',
    title: 'The Final Encounter',
    text: 'IF YOU THINK YOU ARE GETTING THE KEY, THINK AGAIN !!! YOU NEED TO BEAT ME FIRST!!! MUUUUUAHAHAHA!',
    image: '/Images/DemonicFormSetor.png',
    audio: '/sounds/first-challenge.mp3',
    audioVolume: 0.1,
    audioLoop: true,
    choices: [
      {
        text: 'Battle with Sofia',
        nextId: 'SofiaFinalBattle',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '45%' } // center top
      },

      {
        text: 'Battle with João',
        nextId: 'JoaoFinalBattle1',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '20%' } 
      },

      {
        text: 'Battle with Hugo',
        nextId: 'HugoFinalBattle',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '70%' } 
      },
    ]
  },

  SofiaFinalBattle: {
    id: 'SofiaFinalBattle',
    title: '#1 Sofia Battle',
    text: 'Sofia tries to summon a lvl 3 spirit to fight, but the demonic AURA is too strong...',
    image: '/Images/SofiaFinalBattle.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'You Failed. Retry',
        nextId: 'DemonicProfessor',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  JoaoFinalBattle1: {
    id: 'JoaoFinalBattle1',
    title: '#1 João Battle',
    text: 'João raises his fits and challenges the evil demonic professor for a fight!',
    image: '/Images/JoaoDemonicFight1.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'FIGHT!!!',
        nextId: 'JoaoFinalBattle2',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  JoaoFinalBattle2: {
    id: 'JoaoFinalBattle2',
    title: '#2 João Battle',
    text: 'The professor is too strong; João cannot win the fight!!!',
    image: '/Images/JoaoDemonicFight2.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'You Failed. Retry',
        nextId: 'DemonicProfessor',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  HugoFinalBattle: {
    id: 'HugoFinalBattle',
    title: '#1 Hugo Battle',
    text: 'Hugo challanges the evil professor to a programming duel!!',
    image: '/Images/HugoFinalFight.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'HugoFinalBattle2',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  HugoFinalBattle2: {
    id: 'HugoFinalBattle2',
    title: '#2 Hugo Battle',
    text: 'The battle intensifies as they argue about which programming language is the best.',
    image: '/Images/HugoFinalFight2.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'FinalBattleResult',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  FinalBattleResult: {
    id: 'FinalBattleResult',
    title: '#3 Hugo Battle',
    text: 'Both die in a tragic and hot explosion.',
    image: '/Images/BattleResult.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'TheKey',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  TheKey: {
    id: 'TheKey',
    title: 'The Key',
    text: 'Sofia and João are able to retrieve the key to destroy the evil professor plans.',
    image: '/Images/TheKey.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'Memories',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },


  Memories: {
    id: 'Memories',
    title: 'Memories',
    text: 'In the end they were able to change the program, stop the evil plans and save FCUL. But at what cost??? Hugo was not there with them.',
    image: '/Images/Memories.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'Library',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  Library: {
    id: 'Library',
    title: 'Library',
    text: 'But on a quiet day at the library... João and Sofia were surprised by Hugo.',
    image: '/Images/Library.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'Next',
        nextId: 'TheEnd',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },

  TheEnd: {
    id: 'TheEnd',
    title: 'The End',
    text: '',
    image: '/Images/TheEnd.png',
    audio: '/sounds/reunion.mp3',
    audioVolume: 0.5,
    audioLoop: true,
    choices: [
      {
        text: 'THE END',
        nextId: 'ToBeContinued',
        appearDelay: 2500,
        visibleDuration: null,
        position: { top: '20px', left: '50%' } // center top
      },
    ]
  },
 
  ToBeContinued: {
    id: 'ToBeContinued',
    title: 'To Be Continued',
    text: '',
    video: '/Videos/the_end.mp4',
    audio: '/sounds/the_end.mp3',
    audioVolume: 0.4,
    audioLoop: true,
    defaultChoiceId: 'start',
    choices: [],
  },
};

