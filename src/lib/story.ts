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
    choices: [
      {
        text: 'next',
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
    text: 'Hugana, wearing a hoodie with a ninja turtle print and a Linux terminal that was always open, muttered: \n\nThis was sabotage... Tito is using evil AI to fix tests... I detected an obscure process called grade_reaper.py.',
    image: '/Images/HugoLinux.png',
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
    text: 'Our heroes arrive at the door of Room R. There are sensors, a keypad with thermal recognition and... a handwritten sign \n (Make the correct choice)',
    image: '/Images/ChoiceDoor.png',
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
    text: 'Sofia cast\'s a spell to disguice her friends to appear like students that have 20',
    image: '/Images/ChoiceDoorSofia1.png',
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
    text: 'Sofia spell was not strong enough and the door was protected with black magic, summoning the evil professor in spirit form',
    image: '/Images/ChoiceDoorSofia2.png',
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
    title: 'Joao grabs the crowbar and a wine bottle',
    text: 'Joao gets himself a crowbar and a wine bottle and says :"This needs to be breached with pure strenght".',
    image: '/Images/ChoiceDoorJoao1.png',
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
    title: 'Joao grabs the crowbar and a wine bottle',
    text: 'Joao tried to break the lock of the door but the door has too strong and he ended up pooping himself..',
    image: '/Images/ChoiceDoorJoao2.png',
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
    text: 'Hugo gathers his strenght and goes into "Super Programmer Linux Mode" and starts typing ultra fast executing the OpenSezame.py program.',
    image: '/Images/ChoiceDoorHugo1.png',
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
    text: 'The door open and Hugo is drained after that huge effort',
    image: '/Images/ChoiceDoorHugo2.png',
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
    text: '(Optain information about the professor and when ready click on the computer)',
    image: '/Images/EvilProfessorGabinet.png',
    choices: [],
    hotspots: [
    {
      area: { top: '24%', left: '57%', width: '5%', height: '15%' },
      label: 'Tito Trophy',
      text: 'Tito was awarded the most evil professor of all time',
    },
    {
      area: { top: '0%', left: '17%', width: '12%', height: '12%' },
      label: 'Student skull',
      text: 'The skull of the last student to ever challenge Tito and make a report to the director',
    },
    {
      area: { top: '13%', left: '67%', width: '12%', height: '12%' },
      label: 'Student skull',
      nextId:'start'
    },
  ]
  },
  ToBeContinued: {
    id: 'ToBeContinued',
    title: 'To Be Continued',
    text: '',
    video: '/Videos/Fcul.mp4',
    choices: [],
    hotspots: [
    {
      area: { top: '24%', left: '57%', width: '5%', height: '15%' },
      label: 'Tito Trophy',
      text: 'Tito was awarded the most evil professor of all time',
    },
    {
      area: { top: '0%', left: '17%', width: '12%', height: '12%' },
      label: 'Student skull',
      text: 'The skull of the last student to ever challenge Tito and make a report to the director',
    },
    {
      area: { top: '13%', left: '67%', width: '12%', height: '12%' },
      label: 'Student skull',
      nextId:'ToBeContinued'
    },
  ]
  },
};

