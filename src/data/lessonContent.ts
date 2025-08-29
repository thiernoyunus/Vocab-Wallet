export interface Word {
  english: string;
  arabic: string;
  transliteration: string;
  pronunciation?: string;
}

export interface Phrase {
  english: string;
  arabic: string;
  transliteration: string;
  context?: string;
}

export interface GrammarNote {
  title: string;
  explanation: string;
  examples: Array<{
    arabic: string;
    english: string;
    transliteration: string;
  }>;
}

export interface Exercise {
  id: string;
  type: 'translation' | 'multiple-choice' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface LessonContent {
  id: number;
  title: string;
  description: string;
  objectives: string[];
  vocabulary: Word[];
  phrases: Phrase[];
  grammar: GrammarNote[];
  exercises: Exercise[];
  culturalNotes?: string[];
}

export const lessonOneContent: LessonContent = {
  id: 1,
  title: "Lesson 1: Salutation التحية",
  description: "Learn essential Arabic greetings and basic introductions used in daily conversations.",
  objectives: [
    "Master common Arabic greetings",
    "Learn how to introduce yourself",
    "Understand basic courtesy expressions",
    "Practice proper pronunciation of greeting phrases"
  ],
  vocabulary: [
    {
      english: "Peace",
      arabic: "سَلام",
      transliteration: "salaam"
    },
    {
      english: "Hello/Peace be upon you",
      arabic: "السَّلامُ عَلَيْكُم",
      transliteration: "as-salaamu 'alaykum"
    },
    {
      english: "And upon you peace",
      arabic: "وَعَلَيْكُمُ السَّلام",
      transliteration: "wa 'alaykumu s-salaam"
    },
    {
      english: "Good morning",
      arabic: "صَباحُ الخَيْر",
      transliteration: "sabaahu l-khayr"
    },
    {
      english: "Good morning (response)",
      arabic: "صَباحُ النُّور",
      transliteration: "sabaahu n-nuur"
    },
    {
      english: "Good evening",
      arabic: "مَساءُ الخَيْر",
      transliteration: "masaa'u l-khayr"
    },
    {
      english: "Good evening (response)",
      arabic: "مَساءُ النُّور",
      transliteration: "masaa'u n-nuur"
    },
    {
      english: "Welcome",
      arabic: "أَهْلاً وَسَهْلاً",
      transliteration: "ahlan wa sahlan"
    },
    {
      english: "Thank you",
      arabic: "شُكْراً",
      transliteration: "shukran"
    },
    {
      english: "You're welcome",
      arabic: "عَفْواً",
      transliteration: "'afwan"
    },
    {
      english: "Excuse me/Sorry",
      arabic: "عُذْراً",
      transliteration: "'udhran"
    },
    {
      english: "Goodbye",
      arabic: "مَعَ السَّلامَة",
      transliteration: "ma'a s-salaamah"
    }
  ],
  phrases: [
    {
      english: "How are you?",
      arabic: "كَيْف حالُك؟",
      transliteration: "kayf haaluk?",
      context: "Used when addressing one person"
    },
    {
      english: "How are you? (plural/formal)",
      arabic: "كَيْف حالُكُم؟",
      transliteration: "kayf haalukum?",
      context: "Used when addressing multiple people or being formal"
    },
    {
      english: "I am fine, praise be to Allah",
      arabic: "أَنا بِخَيْرٍ الحَمْدُ لِلَّه",
      transliteration: "ana bi-khayr, al-hamdu lillaah",
      context: "Common response to 'How are you?'"
    },
    {
      english: "What is your name?",
      arabic: "ما اسْمُك؟",
      transliteration: "ma ismuk?",
      context: "Asking someone's name"
    },
    {
      english: "My name is...",
      arabic: "اسْمي...",
      transliteration: "ismii...",
      context: "Introducing yourself"
    },
    {
      english: "Nice to meet you",
      arabic: "تَشَرَّفْنا",
      transliteration: "tasharrafnaa",
      context: "Formal way to say 'pleased to meet you'"
    },
    {
      english: "Where are you from?",
      arabic: "مِن أَيْنَ أَنْت؟",
      transliteration: "min ayna ant?",
      context: "Asking about someone's origin"
    },
    {
      english: "I am from...",
      arabic: "أَنا مِن...",
      transliteration: "ana min...",
      context: "Stating your origin"
    }
  ],
  grammar: [
    {
      title: "Greeting Responses",
      explanation: "In Arabic, greetings often have specific responses. It's important to learn both the greeting and its appropriate response.",
      examples: [
        {
          arabic: "السَّلامُ عَلَيْكُم → وَعَلَيْكُمُ السَّلام",
          english: "Peace be upon you → And upon you peace",
          transliteration: "as-salaamu 'alaykum → wa 'alaykumu s-salaam"
        },
        {
          arabic: "صَباحُ الخَيْر → صَباحُ النُّور",
          english: "Good morning → Good morning (response)",
          transliteration: "sabaahu l-khayr → sabaahu n-nuur"
        }
      ]
    },
    {
      title: "Formal vs. Informal Address",
      explanation: "Arabic distinguishes between addressing one person (أَنْت) and multiple people or formal address (أَنْتُم).",
      examples: [
        {
          arabic: "كَيْف حالُك؟",
          english: "How are you? (to one person)",
          transliteration: "kayf haaluk?"
        },
        {
          arabic: "كَيْف حالُكُم؟",
          english: "How are you? (to multiple people/formal)",
          transliteration: "kayf haalukum?"
        }
      ]
    },
    {
      title: "Religious Expressions",
      explanation: "Many Arabic expressions include references to Allah, reflecting the cultural and religious context of the language.",
      examples: [
        {
          arabic: "الحَمْدُ لِلَّه",
          english: "Praise be to Allah",
          transliteration: "al-hamdu lillaah"
        },
        {
          arabic: "إِن شاءَ اللَّه",
          english: "God willing",
          transliteration: "in shaa' allaah"
        }
      ]
    }
  ],
  exercises: [
    {
      id: "ex1",
      type: "multiple-choice",
      question: "What is the appropriate response to 'السَّلامُ عَلَيْكُم'?",
      options: [
        "شُكْراً",
        "وَعَلَيْكُمُ السَّلام",
        "صَباحُ الخَيْر",
        "أَهْلاً وَسَهْلاً"
      ],
      correctAnswer: "وَعَلَيْكُمُ السَّلام",
      explanation: "The traditional response to 'السَّلامُ عَلَيْكُم' is 'وَعَلَيْكُمُ السَّلام', returning the greeting of peace."
    },
    {
      id: "ex2",
      type: "translation",
      question: "Translate to Arabic: 'Good morning'",
      correctAnswer: "صَباحُ الخَيْر",
      explanation: "صَباحُ الخَيْر (sabaahu l-khayr) literally means 'morning of goodness'."
    },
    {
      id: "ex3",
      type: "multiple-choice",
      question: "How do you say 'Thank you' in Arabic?",
      options: [
        "عُذْراً",
        "عَفْواً",
        "شُكْراً",
        "أَهْلاً"
      ],
      correctAnswer: "شُكْراً",
      explanation: "شُكْراً (shukran) is the standard way to say 'thank you' in Arabic."
    },
    {
      id: "ex4",
      type: "fill-blank",
      question: "Complete the phrase: 'أَنا _____ الحَمْدُ لِلَّه' (I am fine, praise be to Allah)",
      correctAnswer: "بِخَيْرٍ",
      explanation: "بِخَيْرٍ (bi-khayr) means 'fine' or 'well' and is commonly used in responses about one's condition."
    },
    {
      id: "ex5",
      type: "translation",
      question: "Translate to English: 'ما اسْمُك؟'",
      correctAnswer: "What is your name?",
      explanation: "ما اسْمُك؟ (ma ismuk?) is the standard way to ask someone's name in Arabic."
    }
  ],
  culturalNotes: [
    "The greeting 'السَّلامُ عَلَيْكُم' is used by Muslims worldwide and literally means 'peace be upon you'.",
    "It's considered polite to use both hands when shaking hands during greetings.",
    "In formal situations, it's common to ask about someone's family and health as part of the greeting process.",
    "The phrase 'الحَمْدُ لِلَّه' (praise be to Allah) is commonly used in responses to show gratitude and acknowledgment of God's blessings."
  ]
};