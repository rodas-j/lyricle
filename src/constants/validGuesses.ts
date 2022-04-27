export type LyricsField = {
  song: string
  lyrics: Array<string>
}

export const VALID_GUESSES: Array<LyricsField> = [
  
  {lyrics: ['Well, you can tell by the way I use my walk',
    "I'm a woman's man, no time to talk",
    'Music loud and women warm',
    "I've been kicked around since I was born",
    "And now it's all right, it's okay",
    'And you may look the other way'],
   song: "Bee Gees ─ Stayin' Alive"},
  {lyrics: ['On a dark desert highway',
    'Cool wind in my hair',
    'Warm smell of colitas',
    'Rising up through the air',
    'Up ahead in the distance',
    'I saw a shimmering light'],
   song: 'Eagles ─ Hotel California'},
  {lyrics: ["Hey, ho, let's go",
    "Hey, ho, let's go",
    "Hey, ho, let's go",
    "Hey, ho, let's go",
    "They're formin' in a straight line",
    "They're goin' through a tight one"],
   song: 'Ramones ─ Blitzkrieg Bop'},
  {lyrics: ['Some people call me the space cowboy, yeah',
    'Some call me the gangster of love',
    'Some people call me Maurice',
    "'Cause I speak of the pompatus of love",
    'People talk about me, baby',
    "Say I'm doing you wrong, doing you wrong"],
   song: 'Steve Miller Band ─ The Joker'},
  {lyrics: ['When I find myself in times of trouble, Mother Mary comes to me',
    'Speaking words of wisdom, "Let it be"',
    'And in my hour of darkness, she is standing right in front of me',
    'Speaking words of wisdom, "Let it be"',
    'Let it be, let it be, let it be, let it be',
    'Whisper words of wisdom, let it be'],
   song: 'The Beatles ─ Let it Be'},
  {lyrics: ['Yow....yow....yow',
    'Huh, huh, huh',
    'Please allow me to introduce myself',
    "I'm a man of wealth and taste",
    "I've been around for a long, long year",
    "Stole many a man's soul and faith"],
   song: 'Rolling Stones ─ Sympathy for the Devil'},
  {lyrics: 'None',
   song: 'Bob Dylan/The Jimi Hendrix Experience ─ All Along the Watchtower'},
  {lyrics: ['This is the end',
    'Beautiful friend',
    'This is the end',
    'My only friend, the end',
    'Of our elaborate plans, the end',
    'Of everything that stands, the end'],
   song: 'Doors ─ The End'},
  {lyrics: ['Hello darkness, my old friend',
    "I've come to talk with you again",
    'Because a vision softly creeping',
    'Left its seeds while I was sleeping',
    'And the vision that was planted in my brain',
    'Still remains within the sound of silence'],
   song: 'Simon & Garfunkel ─ The Sound of Silence'},
  {lyrics: ["Well, it's one for the money, two for the show",
    'Three to get ready, now go, cat, go',
    "But don't you step on my blue suede shoes",
    'Well, you can do anything, but stay off of my blue suede shoes',
    'Well, you can knock me down, step in my face',
    'Slander my name all over the place'],
   song: 'Elvis Presley ─ Blue Suede Shoes'},
  {lyrics: ["C'mon, man",
    'And with the local DBC news',
    'LL Cool J with a triumphant comeback',
    'Word (But tonight—)',
    "Don't call it a comeback, I been here for years",
    "I'm rocking my peers, putting suckas in fear"],
   song: 'LL Cool J ─ Mama Said Knock You Out'},
  {lyrics: ['You are now about to witness the strength of street knowledge',
    'Straight outta Compton!',
    'Crazy motherfucker named Ice Cube',
    'From the gang called Niggas Wit Attitudes',
    "When I'm called off, I got a sawed-off",
    'Squeeze the trigger, and bodies are hauled off'],
   song: 'N.W.A. ─ Straight Outta Compton'},
  {lyrics: ['Bring the Noise LyricsToo black, too strong',
    'Too black, too strong',
    'Yo Chuck, these honey drippers are still fronting on us',
    "Show 'em that we can do this, cause we always knew this",
    'Haha, yeah boy!',
    'Bass! How low can you go?'],
   song: 'Public Enemy ─ Bring the Noise'},
  {lyrics: ["She's got a smile that it seems to me",
    'Reminds me of childhood memories',
    'Where everything was as fresh as the bright blue sky (Sky)',
    'Now and then when I see her face',
    'She takes me away to that special place',
    "And if I stared too long I'd probably break down and cry"],
   song: "Guns N' Roses ─ Sweet Child o' Mine"},
  {lyrics: ['Reconnoitering The Rim LyricsFADE IN:',
    "EXT. ELLSWORTH'S CLAIM - DAY",
    'Ellsworth works his sluice-system at the creek-bank, watches',
    "Driscoll's dog paw at a woodchuck hole --",
    'ELLSWORTH',
    '(to his dog)'],
   song: "R.E.M. ─ It's the End of the World as We Know It (And I Feel Fine)"},
  {lyrics: ["Josie's on a vacation far away",
    'Come around and talk it over',
    'So many things that I wanna say',
    'You know I like my girls a little bit older',
    'I just wanna use your love tonight',
    "And I don't wanna lose your love tonight"],
   song: 'The Outfield ─ Your Love'},
  {lyrics: ['Dearly beloved',
    'We are gathered here today',
    'To get through this thing called "life"',
    'Electric word, life',
    "It means forever and that's a mighty long time",
    "But I'm here to tell you there's something else"],
   song: "Prince and The Revolution ─ Let's Go Crazy"},
  {lyrics: ["Just a small-town girl, livin' in a lonely world",
    "She took the midnight train goin' anywhere",
    'Just a city boy, born and raised in South Detroit',
    "He took the midnight train goin' anywhere",
    'A singer in a smoky room',
    'The smell of wine and cheap perfume'],
   song: "Journey ─ Don't Stop Believin'"},
  {lyrics: ['She was a fast machine, she kept her motor clean',
    'She was the best damn woman that I ever seen',
    'She had the sightless eyes, telling me no lies',
    'Knocking me out with those American thighs',
    'Taking more than her share, had me fighting for air',
    'She told me to come, but I was already there'],
   song: 'AC/DC ─ You Shook Me All Night Long'},
  {lyrics: ["Oh Mama, I'm in fear for my life from the long arm of the law",
    "Lawman has put an end to my running, and I'm so far from my home",
    "Oh Mama, I can hear you a-cryin', you're so scared and all alone",
    "Hangman is comin' down from the gallows, and I don't have very long",
    '(Yeah!)',
    'The jig is up, the news is out'],
   song: 'Styx ─ Renegade'},
  {lyrics: ['I saw a werewolf with a Chinese menu in his hand',
    'Walking through the streets of Soho in the rain',
    "He was looking for the place called Lee Ho Fook's",
    'Gonna get a big dish of beef chow mein',
    'Ah-hoo, werewolves of London',
    'Ah-hoo'],
   song: 'Warren Zevon ─ Werewolves of London'},
  {lyrics: ['At first I was afraid, I was petrified',
    "Kept thinkin' I could never live without you by my side",
    "But then I spent so many nights thinkin' how you did me wrong",
    'And I grew strong, and I learned how to get along',
    "And so you're back, from outer space",
    'I just walked in to find you here with that sad look upon your face'],
   song: 'Gloria Gaynor ─ I Will Survive'},
  {
    song: 'Bruno Mars ─ Grenade',
    lyrics: [
      "Easy come, easy go, that's just how you live, oh",
      'Take, take, take it all, but you never give',
      'Should have known you was trouble from the first kiss',
      'Had your eyes wide open',
      'Why were they open? (Ooh)',
    ],
  },
  {
    song: 'Queen ─ Under Pressure',
    lyrics: [
      "It's the terror of knowing what the world is about",
      'Watching some good friends screaming',
      'Let me out',
      'Pray tomorrow gets me higher, high',
      'Pressure on people, people on streets',
    ],
  },
  {
    song: 'RHCP ─ Dark Necessities',
    lyrics: [
      'Coming out to the light of day',
      'We got many moons that are deep at play',
      "So I keep an eye on the shadow's smile",
      'To see what it has to say',
      'You and I both know',
      'Everything must go away',
    ],
  },
  {
    song: 'Florence + the Machine ─ Dog Days Are Over',
    lyrics: [
      'Happiness hit her like a train on a track',
      'Coming towards her stuck still no turning back',
      'She hid around corners and she hid under beds',
      'She killed it with kisses and from it she fled',
      'With every bubble she sank with her drink',
    ],
  },
  {
    song: 'Michael Jackson ─ Billie Jean',
    lyrics: [
      'For forty days and forty nights',
      'The law was on her side',
      "But who can stand when she's in demand",
      'Her schemes and plans',
      "'Cause we danced on the floor in the round",
    ],
  },
  {
    song: 'Ed Sheeran ─ Shape of You',
    lyrics: [
      'One week in we let the story begin',
      "We're going out on our first date",
      'You and me are thrifty, so go all you can eat',
      'Fill up your bag and I fill up a plate',
      'We talk for hours and hours about the sweet and the sour',
    ],
  },
  {
    song: 'Ed Sheeran ─ Perfect',
    lyrics: [
      "We are still kids, but we're so in love",
      'Fighting against all odds',
      "I know we'll be alright this time",
      'Darling, just hold my hand',
      "Be my girl, I'll be your man",
    ],
  },
  {
    song: 'Adele ─ Rolling in the Deep',
    lyrics: [
      'Baby, I have no story to be told',
      "But I've heard one on you and I'm gonna make your head burn",
      'Think of me in the depths of your despair',
      'Think of me in the depths of your despair',
      "Make a home down there as mine sure won't be shared",
    ],
  },
  {
    song: 'The Beatles ─ Hey Jude',
    lyrics: [
      'And anytime you feel the pain, hey Jude, refrain,',
      "Don't carry the world upon your shoulders.",
      "For well you know that it's a fool who plays it cool",
      'By making his world a little colder.',
      'By making his world a little colder.',
    ],
  },
  {
    song: 'Michael Jackson ─ Beat it',
    lyrics: [
      "You have to show them that you're really not scared",
      "You're playin' with your life, this ain't no truth or dare",
      "They'll kick you, then they beat you,",
      "Then they'll tell you it's fair",
      'So beat it, but you want to be bad',
    ],
  },
]
