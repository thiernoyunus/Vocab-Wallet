export type LessonStatus = "locked" | "current" | "unlocked" | "completed";

export interface LessonSummary {
  id: number;
  title: string;
  description: string;
  wordCount: number;
  xp: number;
  status: LessonStatus;
  milestone: number;
}

export interface LessonWord {
  english: string;
  arabic: string;
}

export const lessons: LessonSummary[] = [
  {
    id: 1,
    title: "Greetings التحية",
    description: "Introduce yourself and greet others",
    wordCount: 12,
    xp: 10,
    status: "completed",
    milestone: 1
  },
  {
    id: 2,
    title: "Getting to Know التعارف",
    description: "Ask questions and learn about new friends",
    wordCount: 15,
    xp: 15,
    status: "current",
    milestone: 2
  },
  {
    id: 3,
    title: "Family الأسرة",
    description: "Talk about family members and relationships",
    wordCount: 18,
    xp: 20,
    status: "unlocked",
    milestone: 3
  },
  {
    id: 4,
    title: "Home السكن",
    description: "Describe your home and neighbourhood",
    wordCount: 14,
    xp: 20,
    status: "locked",
    milestone: 4
  },
  {
    id: 5,
    title: "Self Introduction التعريف بالنفس",
    description: "Share facts about yourself confidently",
    wordCount: 16,
    xp: 25,
    status: "locked",
    milestone: 5
  }
];

export const lessonContent: Record<number, LessonWord[]> = {
  1: [
    { english: "Salutation", arabic: "تَحِيَّة/تَحِيَّات" },
    { english: "Lesson", arabic: "دَرْس/دُرُوس" },
    { english: "First", arabic: "أَوَّل/أَوَّلُون" },
    { english: "Brother", arabic: "أَخ/إِخْوَة" },
    { english: "Sister", arabic: "أُخْت/أَخَوات" },
    { english: "Mosque", arabic: "مَسْجِد/مَسَاجِد" },
    { english: "House", arabic: "بَيْت/بُيُوت" },
    { english: "You (dual)", arabic: "أَنْتُما" },
    { english: "They (dual)", arabic: "هُما" },
    { english: "How are you?", arabic: "كَيْف حالُك؟" },
    { english: "All praise be to Allah", arabic: "الحَمْدُ لِلَّه أَنا بِخَيْر" },
    { english: "Thank you I am fine as well", arabic: "شُكْرًا أَنا بِخَيْرٍ أَيْضًا" }
  ],
  2: [
    { english: "Friend", arabic: "صَدِيق/أَصْدِقاء" },
    { english: "Name", arabic: "اِسْم/أَسْماء" },
    { english: "Country", arabic: "بَلَد/بِلاد" },
    { english: "Work", arabic: "عَمَل/أَعْمال" },
    { english: "Student", arabic: "طالِب/طُلّاب" },
    { english: "Teacher", arabic: "مُعَلِّم/مُعَلِّمون" },
    { english: "Nice to meet you", arabic: "تَشَرَّفْنَا" },
    { english: "Where from?", arabic: "مِن أَيْنَ؟" },
    { english: "I live", arabic: "أَسْكُن" },
    { english: "City", arabic: "مَدِينَة/مُدُن" },
    { english: "Job", arabic: "وَظِيفَة/وَظائِف" },
    { english: "Language", arabic: "لُغَة/لُغَات" },
    { english: "Family", arabic: "عائِلَة/عائِلات" },
    { english: "To like", arabic: "أُحِبّ" },
    { english: "Hobby", arabic: "هُوايَة/هُوايات" }
  ],
  3: [
    { english: "Mother", arabic: "أُمّ/أُمَّهات" },
    { english: "Father", arabic: "أَب/آباء" },
    { english: "Siblings", arabic: "إِخْوَة" },
    { english: "Child", arabic: "طِفْل/أَطْفال" },
    { english: "Parents", arabic: "والِدان" },
    { english: "Grandmother", arabic: "جَدَّة/جَدّات" },
    { english: "Grandfather", arabic: "جَدّ/أَجْداد" },
    { english: "Uncle", arabic: "عَمّ/أَعْمام" },
    { english: "Aunt", arabic: "عَمَّة/عَمّات" },
    { english: "Family home", arabic: "بَيْت العائِلَة" },
    { english: "Marriage", arabic: "زَواج" },
    { english: "Celebration", arabic: "اِحْتِفال" },
    { english: "Together", arabic: "مَعًا" },
    { english: "Love", arabic: "مَحَبَّة" },
    { english: "Support", arabic: "دَعْم" },
    { english: "Cousin", arabic: "ابْنُ العَمّ" },
    { english: "Relatives", arabic: "أَقْرِباء" },
    { english: "Traditions", arabic: "تَقالِيد" }
  ],
  4: [
    { english: "Apartment", arabic: "شَقَّة/شُقَق" },
    { english: "Room", arabic: "غُرْفَة/غُرَف" },
    { english: "Kitchen", arabic: "مَطْبَخ/مَطابِخ" },
    { english: "Bathroom", arabic: "حَمّام/حَمّامات" },
    { english: "Garden", arabic: "حَدِيقَة/حَدائِق" },
    { english: "Neighbour", arabic: "جار/جِيران" },
    { english: "Street", arabic: "شارِع/شَوارِع" },
    { english: "Market", arabic: "سوق/أَسْواق" },
    { english: "Rent", arabic: "إيجار" },
    { english: "Furniture", arabic: "أَثاث" },
    { english: "Window", arabic: "نافِذَة/نَوافِذ" },
    { english: "Door", arabic: "باب/أَبْواب" },
    { english: "Roof", arabic: "سَطْح" },
    { english: "Building", arabic: "مَبْنى/مَباني" }
  ],
  5: [
    { english: "Name", arabic: "اِسْم" },
    { english: "Age", arabic: "عُمْر" },
    { english: "Country", arabic: "بَلَد" },
    { english: "Study", arabic: "دِراسَة" },
    { english: "Work", arabic: "عَمَل" },
    { english: "Dream", arabic: "حُلْم" },
    { english: "Skill", arabic: "مَهارَة" },
    { english: "Goal", arabic: "هَدَف" },
    { english: "Journey", arabic: "رِحْلَة" },
    { english: "Success", arabic: "نَجاح" },
    { english: "Story", arabic: "قِصَّة" },
    { english: "Future", arabic: "مُسْتَقْبَل" },
    { english: "Ambition", arabic: "طُمُوح" },
    { english: "Confidence", arabic: "ثِقَة" },
    { english: "Introduce", arabic: "قَدَّم" },
    { english: "Presentation", arabic: "عَرْض" }
  ]
};
