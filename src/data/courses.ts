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
  { id: "1", title: "5 Signs Your Chakras Are Blocked", description: "Learn to identify the subtle signs that indicate energy blockages in your chakra system and what you can do about them.", date: "March 15, 2026" },
  { id: "2", title: "The Power of Morning Affirmations", description: "Discover how starting your day with positive affirmations can rewire your brain and transform your reality.", date: "March 8, 2026" },
  { id: "3", title: "Beginner's Guide to Crystal Healing", description: "Everything you need to know about choosing, cleansing, and using crystals for healing and manifestation.", date: "February 28, 2026" },
  { id: "4", title: "Understanding Your Life Path Number", description: "A deep dive into numerology's most important number and what it reveals about your purpose and destiny.", date: "February 20, 2026" },
  { id: "5", title: "How Reiki Changed My Life", description: "My personal journey with Reiki healing — from skeptic to certified practitioner and teacher.", date: "February 10, 2026" },
];

export const blogPostContent: Record<string, string> = {
  "1": `Have you ever felt persistently drained, emotionally unstable, or physically unwell without a clear medical cause? These could be signs that your chakras — the energy centers in your body — are blocked.\n\nThe human body has seven main chakras, each governing different aspects of our physical, emotional, and spiritual well-being. When energy flows freely through these centers, we feel balanced and vibrant. But when one or more chakras become blocked, it can manifest in surprising ways.\n\nSign 1: Chronic fatigue despite adequate rest. When your root chakra is blocked, you may feel perpetually tired because your foundational energy is disrupted.\n\nSign 2: Difficulty expressing yourself. A blocked throat chakra can make communication feel impossible — you might struggle to speak your truth or feel a literal lump in your throat.\n\nSign 3: Inability to trust your intuition. When your third eye chakra is blocked, decision-making becomes agonizing because you've lost connection to your inner wisdom.\n\nSign 4: Emotional numbness or overwhelming emotions. Heart chakra blockages can swing you between feeling nothing and feeling everything too intensely.\n\nSign 5: Digestive issues and low self-esteem. Your solar plexus chakra governs both your digestive system and your sense of personal power.\n\nThe good news? Chakra blockages are not permanent. Through meditation, energy healing, yoga, and conscious awareness, you can restore the natural flow of energy in your body. Start by identifying which chakra resonates most with your symptoms, and begin your healing journey there.`,

  "2": `The first thoughts you think each morning set the tone for your entire day. If you wake up with worry, stress, or negativity, your brain is already wired for a difficult day. But what if you could reprogram that pattern?\n\nMorning affirmations are positive, present-tense statements that you repeat to yourself upon waking. They work by leveraging neuroplasticity — your brain's ability to form new neural pathways through repetition.\n\nWhen you consistently tell yourself "I am worthy of abundance" or "I attract positive experiences," your subconscious mind begins to accept these statements as truth. Over time, your thoughts, behaviors, and even the opportunities you notice begin to align with these beliefs.\n\nHere's a simple morning affirmation practice to get started: Before reaching for your phone, sit up in bed and take three deep breaths. Then repeat 5-10 affirmations that resonate with your goals. Speak them aloud with conviction and emotion.\n\nSome powerful affirmations to try: "I am grateful for this new day and all the possibilities it holds." "I am confident, capable, and worthy of success." "Love flows to me and through me effortlessly." "I release all fear and embrace joy."\n\nConsistency is key. Practice daily for at least 21 days before judging results. Many of my students report significant shifts in their mindset, relationships, and opportunities within the first month.`,

  "3": `Crystals have been used for healing and spiritual purposes for thousands of years across virtually every culture. From the ancient Egyptians who buried their dead with quartz to modern holistic practitioners, the belief in crystal energy has endured.\n\nBut how do you get started with crystal healing? It begins with choosing the right crystals.\n\nFor beginners, I recommend starting with these five essential crystals: Clear Quartz (the master healer, amplifies energy), Amethyst (calming, enhances intuition), Rose Quartz (opens the heart, promotes self-love), Black Tourmaline (protection, grounding), and Citrine (abundance, positivity).\n\nOnce you have your crystals, cleansing them is essential. Crystals absorb energy from their environment, so you want to clear any previous energy before using them. Methods include moonlight bathing (place under a full moon overnight), sage smudging, running water (not for all crystals), and sound cleansing with a singing bowl.\n\nTo use crystals for healing, you can meditate while holding them, place them on specific chakra points, carry them in your pocket throughout the day, or create a crystal grid in your home.\n\nRemember, crystals are tools that amplify your own intention and energy. They work best when combined with meditation, affirmation, and a genuine desire for healing and growth.`,

  "4": `In numerology, your Life Path Number is the most significant number in your chart. It reveals your life's purpose, natural talents, and the challenges you'll face along the way.\n\nCalculating your Life Path Number is simple: reduce your birth date to a single digit. For example, if you were born on July 15, 1990: 7 + 1 + 5 + 1 + 9 + 9 + 0 = 32, then 3 + 2 = 5. Your Life Path Number would be 5.\n\nLife Path 1: The Leader. You're independent, ambitious, and innovative. Your challenge is learning to collaborate.\n\nLife Path 2: The Diplomat. You're sensitive, intuitive, and cooperative. Your challenge is setting boundaries.\n\nLife Path 3: The Communicator. You're creative, expressive, and joyful. Your challenge is focus and discipline.\n\nLife Path 4: The Builder. You're practical, reliable, and hardworking. Your challenge is flexibility.\n\nLife Path 5: The Adventurer. You're freedom-loving, adaptable, and curious. Your challenge is commitment.\n\nLife Path 6: The Nurturer. You're responsible, caring, and community-oriented. Your challenge is avoiding over-giving.\n\nLife Path 7: The Seeker. You're analytical, spiritual, and introspective. Your challenge is trusting others.\n\nLife Path 8: The Powerhouse. You're ambitious, authoritative, and material-focused. Your challenge is balancing material and spiritual.\n\nLife Path 9: The Humanitarian. You're compassionate, generous, and idealistic. Your challenge is letting go.\n\nUnderstanding your Life Path Number is just the beginning of your numerology journey, but it provides a powerful foundation for self-awareness and personal growth.`,

  "5": `Five years ago, if you had told me I would become a certified Reiki practitioner and teacher, I would have laughed. I was the ultimate skeptic — a person who needed scientific proof for everything.\n\nMy journey began out of desperation. I was dealing with chronic back pain that no doctor could explain or resolve. A friend suggested I try Reiki, and with nothing to lose, I booked a session.\n\nDuring my first session, I felt warmth radiating from the practitioner's hands, even though they weren't touching me. I experienced a wave of emotion — tears I didn't expect, followed by a profound sense of peace. My pain, which had been constant for months, reduced by half after that single session.\n\nI was hooked. I enrolled in Reiki Level 1 training to understand what had happened to me. During the attunement ceremony, I felt energy coursing through my body unlike anything I'd ever experienced. It was as if a door had opened inside me that I never knew existed.\n\nLevel 2 training deepened my practice. I learned to send distance healing, use sacred symbols, and work with others. I started practicing on friends and family, and the results were remarkable — my mother's migraines decreased, my partner's anxiety improved, and my own chronic pain became a thing of the past.\n\nToday, I teach Reiki to hundreds of students, and each one's transformation reminds me of my own journey. Reiki didn't just heal my body — it changed my entire perspective on life, health, and what's possible when we open ourselves to energy healing.`,
};
