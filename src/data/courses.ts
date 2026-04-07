export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  image: string;
  trending: boolean;
  benefits: string[];
  whatYouLearn: string[];
  whatYouGet: string[];
  faqs: { question: string; answer: string }[];
}

export const courses: Course[] = [
  {
    id: "spiritual-healing",
    title: "Spiritual Healing Mastery",
    shortDescription: "Unlock the power of spiritual healing and transform your life from within.",
    description: "This comprehensive course guides you through ancient and modern spiritual healing techniques. Learn to channel energy, clear blockages, and create profound transformation in your life and the lives of others.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600",
    trending: true,
    benefits: ["Deep inner peace and clarity", "Enhanced intuition and awareness", "Ability to heal yourself and others", "Stronger spiritual connection", "Reduced stress and anxiety"],
    whatYouLearn: ["Energy channeling techniques", "Chakra balancing and alignment", "Meditation and mindfulness practices", "Aura reading and cleansing", "Crystal healing fundamentals"],
    whatYouGet: ["20+ hours of video content", "Guided meditation audios", "Certification upon completion", "Lifetime access", "Community support group"],
    faqs: [
      { question: "Do I need prior experience?", answer: "No, this course is designed for beginners and advanced practitioners alike." },
      { question: "How long do I have access?", answer: "You get lifetime access to all course materials." },
      { question: "Is there a certificate?", answer: "Yes, you receive a certificate upon completing all modules." },
    ],
  },
  {
    id: "manifestation-magic",
    title: "Manifestation Magic",
    shortDescription: "Learn the art and science of manifesting your dream life.",
    description: "Discover the powerful principles of manifestation and learn to align your thoughts, emotions, and actions to attract abundance, love, and success into your life.",
    price: 3499,
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600",
    trending: true,
    benefits: ["Clarity on life goals", "Attract abundance effortlessly", "Overcome limiting beliefs", "Build unshakeable confidence", "Create your dream reality"],
    whatYouLearn: ["Law of Attraction principles", "Vision board creation", "Affirmation techniques", "Gratitude practices", "Abundance mindset cultivation"],
    whatYouGet: ["15+ hours of content", "Manifestation journal template", "Weekly live Q&A sessions", "Private community access", "Bonus guided visualizations"],
    faqs: [
      { question: "Does manifestation really work?", answer: "Yes! When practiced correctly with aligned action, manifestation creates powerful results." },
      { question: "How soon will I see results?", answer: "Many students report shifts within the first week of practice." },
    ],
  },
  {
    id: "tarot-reading",
    title: "Tarot Reading Certification",
    shortDescription: "Master the art of tarot reading and offer professional readings.",
    description: "From beginner to certified tarot reader — learn the meaning of every card, spreads, intuition development, and how to conduct professional readings.",
    price: 5999,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600",
    trending: true,
    benefits: ["Read tarot for yourself and others", "Develop psychic intuition", "Start a tarot reading business", "Understand life patterns", "Connect with higher guidance"],
    whatYouLearn: ["All 78 tarot card meanings", "Popular tarot spreads", "Intuition development exercises", "Client reading techniques", "Ethics in tarot reading"],
    whatYouGet: ["30+ hours of video lessons", "Tarot card meaning cheat sheets", "Practice reading exercises", "Professional certification", "Business setup guide"],
    faqs: [
      { question: "Do I need my own tarot deck?", answer: "Yes, we recommend having a Rider-Waite deck to follow along." },
      { question: "Can I make a career from this?", answer: "Absolutely! Many of our graduates run successful tarot reading businesses." },
    ],
  },
  {
    id: "meditation-mastery",
    title: "Meditation & Mindfulness",
    shortDescription: "Achieve deep calm, focus, and inner peace through meditation.",
    description: "A transformative journey into meditation practices from around the world. Learn techniques for stress relief, focus, emotional balance, and spiritual awakening.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600",
    trending: false,
    benefits: ["Reduced stress and anxiety", "Better sleep quality", "Enhanced focus and productivity", "Emotional resilience", "Spiritual growth"],
    whatYouLearn: ["Breathing techniques", "Guided meditation practices", "Walking meditation", "Body scan methods", "Transcendental meditation basics"],
    whatYouGet: ["12+ hours of content", "50 guided meditation audios", "Daily practice calendar", "Progress tracking journal", "Community forum access"],
    faqs: [
      { question: "I can't sit still — is this for me?", answer: "Absolutely! We teach many styles including walking and active meditation." },
    ],
  },
  {
    id: "numerology-basics",
    title: "Numerology Fundamentals",
    shortDescription: "Decode the hidden meaning of numbers in your life.",
    description: "Learn how numbers influence your personality, relationships, career, and destiny. Master numerology calculations and offer readings to others.",
    price: 3999,
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600",
    trending: false,
    benefits: ["Understand your life path", "Improve relationships", "Make better decisions", "Discover hidden talents", "Guide others with numerology"],
    whatYouLearn: ["Life path number calculation", "Name numerology", "Compatibility analysis", "Year forecasting", "Business numerology"],
    whatYouGet: ["18+ hours of video", "Calculation worksheets", "Practice assignments", "Certificate of completion", "Lifetime access"],
    faqs: [
      { question: "Is numerology scientific?", answer: "Numerology is a metaphysical practice with thousands of years of tradition and practical application." },
    ],
  },
  {
    id: "reiki-healing",
    title: "Reiki Level 1 & 2",
    shortDescription: "Learn traditional Usui Reiki healing for self and others.",
    description: "Comprehensive Reiki training covering Level 1 (self-healing) and Level 2 (healing others). Includes attunement, hand positions, symbols, and distance healing.",
    price: 6999,
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600",
    trending: false,
    benefits: ["Heal yourself and others", "Reduce pain and stress", "Boost immune system", "Enhance spiritual awareness", "Start a healing practice"],
    whatYouLearn: ["Reiki history and principles", "Hand positions for healing", "Sacred Reiki symbols", "Distance healing techniques", "Setting up a practice"],
    whatYouGet: ["25+ hours of training", "Reiki attunement ceremony", "Level 1 & 2 certificates", "Practice client sessions", "Ongoing mentorship"],
    faqs: [
      { question: "Are attunements done online?", answer: "Yes, distance attunements are equally powerful and have been practiced for decades." },
    ],
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Priya Sharma",
    text: "Surbhi's spiritual healing course completely transformed my life. I found peace I never knew existed within me.",
    course: "Spiritual Healing Mastery",
    rating: 5,
  },
  {
    id: "2",
    name: "Ankit Verma",
    text: "The manifestation course helped me attract my dream job within 3 months. The techniques are powerful and practical.",
    course: "Manifestation Magic",
    rating: 5,
  },
  {
    id: "3",
    name: "Meera Patel",
    text: "I went from knowing nothing about tarot to doing professional readings. Surbhi is an incredible teacher.",
    course: "Tarot Reading Certification",
    rating: 5,
  },
  {
    id: "4",
    name: "Rahul Gupta",
    text: "The meditation course helped me overcome severe anxiety. I'm now calmer, more focused, and happier than ever.",
    course: "Meditation & Mindfulness",
    rating: 5,
  },
  {
    id: "5",
    name: "Sneha Iyer",
    text: "Surbhi's Reiki training was life-changing. I now help my family and friends with healing sessions regularly.",
    course: "Reiki Level 1 & 2",
    rating: 5,
  },
  {
    id: "6",
    name: "Deepak Joshi",
    text: "Numerology opened my eyes to patterns I never noticed. This course is thorough, practical, and beautifully taught.",
    course: "Numerology Fundamentals",
    rating: 4,
  },
];

export const blogPosts = [
  {
    id: "1",
    title: "5 Signs Your Chakras Are Blocked",
    description: "Learn to identify the subtle signs that indicate energy blockages in your chakra system and what you can do about them.",
    date: "March 15, 2026",
  },
  {
    id: "2",
    title: "The Power of Morning Affirmations",
    description: "Discover how starting your day with positive affirmations can rewire your brain and transform your reality.",
    date: "March 8, 2026",
  },
  {
    id: "3",
    title: "Beginner's Guide to Crystal Healing",
    description: "Everything you need to know about choosing, cleansing, and using crystals for healing and manifestation.",
    date: "February 28, 2026",
  },
  {
    id: "4",
    title: "Understanding Your Life Path Number",
    description: "A deep dive into numerology's most important number and what it reveals about your purpose and destiny.",
    date: "February 20, 2026",
  },
  {
    id: "5",
    title: "How Reiki Changed My Life",
    description: "My personal journey with Reiki healing — from skeptic to certified practitioner and teacher.",
    date: "February 10, 2026",
  },
];
