export type GalleryItem = {
  title: string;
  label: string;
  image: string;
  alt: string;
  copy: string;
};

export type Room = {
  name: string;
  description: string;
  price: string;
  image: string;
  alt: string;
  size: string;
  details: string[];
};

export type Experience = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
};

export type DiningVenue = {
  name: string;
  description: string;
  image: string;
  hours: string;
};

export type Offer = {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
  inclusions: string[];
};

export type Testimonial = {
  quote: string;
  guest: string;
  origin: string;
};

export type Treatment = {
  name: string;
  time: string;
  price: string;
};

export type Statistic = {
  value: string;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type SectionText = {
  eyebrow: string;
  title: string;
  copy: string;
};

export type HotelContent = {
  brand: {
    logoLetter: string;
    hotelName: string;
    hotelSuffix: string;
    locationLine: string;
    heroTitleTop: string;
    heroTitleBottom: string;
    heroTagline: string;
    heroImage: string;
    heroAlt: string;
    ctaPrimary: string;
    ctaSecondary: string;
    signatureEyebrow: string;
    signatureTitle: string;
    signatureCopy: string;
    stats: Statistic[];
  };
  sections: {
    gallery: SectionText;
    rooms: SectionText;
    roomsSideCopy: string;
    experiences: SectionText;
    dining: SectionText;
    diningNote: string;
    wellness: SectionText;
    wellnessBackgroundImage: string;
    wellnessBadge: string;
    offers: SectionText;
    testimonialsEyebrow: string;
    awardsEyebrow: string;
    awardsTitle: string;
    contact: SectionText;
    reservationsTitle: string;
    reservationsCopy: string;
    footerCopy: string;
    newsletterTitle: string;
    newsletterCopy: string;
  };
  contact: {
    address: string;
    phoneDisplay: string;
    phoneRaw: string;
    whatsappNumber: string;
    email: string;
    mapQuery: string;
  };
  gallery: GalleryItem[];
  rooms: Room[];
  experiences: Experience[];
  diningVenues: DiningVenue[];
  offers: Offer[];
  testimonials: Testimonial[];
  awards: string[];
  treatments: Treatment[];
  socialLinks: SocialLink[];
};

const image = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const defaultContent: HotelContent = {
  brand: {
    logoLetter: "A",
    hotelName: "AUSTINA",
    hotelSuffix: "Hotel Lagos",
    locationLine: "Adewale B/Stop · Ikotun Lagos",
    heroTitleTop: "Austina",
    heroTitleBottom: "Hotel",
    heroTagline:
      "Quiet grandeur, ocean-teal calm, and golden Lagos hospitality — an ultra-luxury sanctuary off Governor Road.",
    heroImage: image("photo-1566073771259-6a8506099945", 2400),
    heroAlt: "Luxury hotel exterior with pool and palm trees",
    ctaPrimary: "Book Now",
    ctaSecondary: "Explore Hotel",
    signatureEyebrow: "Signature Arrival",
    signatureTitle: "Butler-style hosting, serene rooms, destination dining, and discreet event spaces.",
    signatureCopy: "A calm luxury experience shaped for rest, private dining, business stays, and elegant Lagos celebrations.",
    stats: [
      { value: "48", label: "Suites" },
      { value: "4", label: "Venues" },
      { value: "24h", label: "Concierge" },
    ],
  },
  sections: {
    gallery: {
      eyebrow: "A visual retreat",
      title: "Every frame feels composed, calm, and quietly cinematic.",
      copy: "Move through pool terraces, spa sanctuaries, suites, dining rooms, and Lagos escapes — then open any image in the lightbox.",
    },
    rooms: {
      eyebrow: "Rooms & suites",
      title: "Residential comfort, tailored for moments that matter.",
      copy: "Choose from elegant rooms, serene terrace suites, and our most exclusive residence — each layered in warm whites, deep charcoal, ocean teal, and gold.",
    },
    roomsSideCopy:
      "Every stay includes high-speed Wi‑Fi, premium bath amenities, smart entertainment, daily housekeeping, and access to our concierge team for dining, transport, and city experiences.",
    experiences: {
      eyebrow: "Experiences",
      title: "The city, the spa, the table, and every celebration — curated beautifully.",
      copy: "Austina Hotel connects guests to the best of Lagos while preserving the calm, privacy, and grace of a luxury retreat.",
    },
    dining: {
      eyebrow: "Dining & bars",
      title: "Four venues, one quietly glamorous point of view.",
      copy: "From breakfast rituals to champagne evenings, our culinary spaces pair polished service with Lagos warmth.",
    },
    diningNote:
      "Private dining, chef’s tasting menus, birthday dinners, and intimate business hosting are available by request.",
    wellness: {
      eyebrow: "Spa & wellness",
      title: "Deep rest, intelligent recovery, luminous skin.",
      copy: "Our wellness menu blends aromatherapy, touch therapy, facials, body rituals, and private yoga for travelers who want to feel restored.",
    },
    wellnessBackgroundImage: image("photo-1544161515-4ab6ce6db874", 2200),
    wellnessBadge: "By appointment",
    offers: {
      eyebrow: "Special offers",
      title: "Packages made for richer stays.",
      copy: "Seasonal escapes, romantic rituals, and executive ease — with thoughtful inclusions already arranged.",
    },
    testimonialsEyebrow: "Guest notes",
    awardsEyebrow: "Awards & press",
    awardsTitle: "Recognized for a luxury sensibility shaped by Lagos hospitality.",
    contact: {
      eyebrow: "Contact & location",
      title: "Arrive at a quieter side of Lagos luxury.",
      copy: "Austina Hotel is located at Adewale B/Stop, off Governor Road, Ikotun Lagos. Send an enquiry, reserve a table, or speak with us on WhatsApp.",
    },
    reservationsTitle: "Reservations",
    reservationsCopy:
      "Share your preferred dates and our team will respond with tailored availability, packages, and arrival support.",
    footerCopy:
      "Ultra-luxury hospitality at Adewale B/Stop, off Governor Road, Ikotun Lagos — crafted for rest, dining, celebrations, and refined city stays.",
    newsletterTitle: "Newsletter",
    newsletterCopy:
      "Receive private offers, dining notes, and wellness invitations from Austina Hotel.",
  },
  contact: {
    address: "Adewale B/Stop, off Governor Road, Ikotun Lagos.",
    phoneDisplay: "+234 803 000 8848",
    phoneRaw: "+2348030008848",
    whatsappNumber: "2348030008848",
    email: "reservations@austinahotel.com",
    mapQuery: "Adewale B/Stop, off Governor Road, Ikotun Lagos",
  },
  gallery: [
    {
      title: "Poolside Evenings",
      label: "Signature Pool",
      image: image("photo-1540541338287-41700207dee6", 1800),
      alt: "Luxury hotel pool at sunset with loungers",
      copy: "Sun-warmed terraces, private cabanas, and a quiet turquoise pool made for unhurried Lagos afternoons.",
    },
    {
      title: "Private Suites",
      label: "Villas & Suites",
      image: image("photo-1582719478250-c89cae4dc85b", 1800),
      alt: "Elegant suite bedroom with warm lighting",
      copy: "Residential-style sanctuaries with soft linens, warm whites, handcrafted details, and intuitive service.",
    },
    {
      title: "Serenity Spa",
      label: "Spa Rituals",
      image: image("photo-1540555700478-4be289fbecef", 1800),
      alt: "Spa treatment room with candles and towels",
      copy: "Restorative rituals, aromatherapy journeys, and tailored recovery therapies in a deeply calm setting.",
    },
    {
      title: "Chef’s Table",
      label: "Restaurant",
      image: image("photo-1414235077428-338989a2e8c0", 1800),
      alt: "Fine dining restaurant table setting",
      copy: "Modern Nigerian flavors, coastal inspiration, and quietly theatrical dining rooms for every occasion.",
    },
    {
      title: "Lagos Escapes",
      label: "Beach Day Trips",
      image: image("photo-1507525428034-b723cf961d3e", 1800),
      alt: "Soft beach shoreline with blue ocean",
      copy: "Curated beach, lagoon, shopping, and cultural excursions planned seamlessly by our concierge team.",
    },
  ],
  rooms: [
    {
      name: "Ocean Teal Signature Suite",
      description:
        "A refined suite with sculptural furniture, a spa-style bath, and a calming teal-and-gold palette.",
      price: "₦185,000 / night",
      image: image("photo-1590490360182-c33d57733427", 1200),
      alt: "Luxury suite with king bed and warm lighting",
      size: "52 sqm",
      details: ["King bed", "Rain shower", "Smart TV", "Breakfast for two"],
    },
    {
      name: "Governor Road Executive Room",
      description:
        "Designed for business travelers who want privacy, speed, and indulgent comfort after a long day.",
      price: "₦125,000 / night",
      image: image("photo-1618773928121-c32242e63f39", 1200),
      alt: "Modern hotel room with neutral tones",
      size: "38 sqm",
      details: ["Work desk", "High-speed Wi‑Fi", "Mini bar", "Airport transfer on request"],
    },
    {
      name: "Austina Garden Terrace",
      description:
        "A quiet hideaway with private terrace seating, garden views, and evening turn-down service.",
      price: "₦210,000 / night",
      image: image("photo-1631049307264-da0ec9d70304", 1200),
      alt: "Luxury bedroom with terrace-style view",
      size: "58 sqm",
      details: ["Private terrace", "Lounge area", "Luxury bath amenities", "Evening canapés"],
    },
    {
      name: "Ikotun Premier King",
      description:
        "Elegant, spacious, and quietly glamorous with handcrafted accents and generous natural light.",
      price: "₦155,000 / night",
      image: image("photo-1566665797739-1674de7a421a", 1200),
      alt: "Bright luxury hotel room with king bed",
      size: "44 sqm",
      details: ["King bed", "Marble vanity", "Tea service", "Late checkout when available"],
    },
    {
      name: "Presidential Residence",
      description:
        "The hotel’s most exclusive residence with a private dining salon, butler-style hosting, and VIP arrival.",
      price: "₦450,000 / night",
      image: image("photo-1600585154340-be6161a56a0c", 1200),
      alt: "Luxury residence lounge and exterior",
      size: "118 sqm",
      details: ["Private salon", "Two bedrooms", "Dedicated host", "Priority concierge"],
    },
    {
      name: "Wellness Studio Suite",
      description:
        "A serene suite for rest-focused stays with space for yoga, in-room treatments, and nourishing dining.",
      price: "₦198,000 / night",
      image: image("photo-1591088398332-8a7791972843", 1200),
      alt: "Calm hotel suite bedroom with soft textiles",
      size: "50 sqm",
      details: ["Yoga mat", "Aromatherapy menu", "Healthy minibar", "Spa credit option"],
    },
  ],
  experiences: [
    {
      title: "Lagoon & Surf Day Trips",
      eyebrow: "Curated Escapes",
      description:
        "Let our concierge arrange private transfers to Lagos beaches, lagoon cruises, surf lessons, and golden-hour picnics.",
      image: image("photo-1500530855697-b586d89ba3ee", 1000),
    },
    {
      title: "Morning Yoga",
      eyebrow: "Mindful Mornings",
      description:
        "Begin with guided breathwork, movement, and fresh-pressed juices beside the pool or in your suite.",
      image: image("photo-1506126613408-eca07ce68773", 1000),
    },
    {
      title: "Celebrations & Weddings",
      eyebrow: "Private Events",
      description:
        "Intimate proposals, traditional ceremonies, executive dinners, and statement receptions designed with polish.",
      image: image("photo-1519225421980-715cb0215aed", 1000),
    },
    {
      title: "Lagos Culture Concierge",
      eyebrow: "Local Discovery",
      description:
        "Personal shopping, art, music, nightlife, and market experiences with trusted local hosts and luxury transport.",
      image: image("photo-1533929736458-ca588d08c8be", 1000),
    },
  ],
  diningVenues: [
    {
      name: "The Governor’s Table",
      description:
        "A polished all-day restaurant serving contemporary Nigerian cuisine, continental classics, and indulgent breakfasts.",
      image: image("photo-1555396273-367ea4eb4db5", 1200),
      hours: "6:30 AM – 11:00 PM",
    },
    {
      name: "Teal Bar & Lounge",
      description:
        "Low-lit, cinematic, and intimate — signature cocktails, champagne service, small plates, and live weekend sets.",
      image: image("photo-1514933651103-005eec06c04b", 1200),
      hours: "4:00 PM – 1:00 AM",
    },
    {
      name: "Adewale Grill",
      description:
        "Open-flame grilled seafood, suya-inspired cuts, garden salads, and relaxed poolside dining under the palms.",
      image: image("photo-1552566626-52f8b828add9", 1200),
      hours: "12:00 PM – 10:30 PM",
    },
    {
      name: "The Ivory Patisserie",
      description:
        "Single-origin coffee, delicate pastries, afternoon tea, and private cake orders for special occasions.",
      image: image("photo-1525610553991-2bede1a236e2", 1200),
      hours: "7:00 AM – 7:00 PM",
    },
  ],
  offers: [
    {
      title: "Stay Longer, Live Softer",
      subtitle: "4 nights with the 5th on us",
      description:
        "Settle into Lagos at your own pace with daily breakfast, airport assistance, and a late checkout request.",
      price: "From ₦620,000",
      image: image("photo-1551882547-ff40c63fe5fa", 1400),
      inclusions: ["Daily breakfast", "Welcome cocktails", "Late checkout request"],
    },
    {
      title: "Romance in Residence",
      subtitle: "Private dinner + spa ritual",
      description:
        "A candlelit suite arrival, chef-led dinner, couples massage, and champagne breakfast for two.",
      price: "From ₦390,000",
      image: image("photo-1520250497591-112f2f40a3f4", 1400),
      inclusions: ["Couples massage", "Private dinner", "Sparkling breakfast"],
    },
    {
      title: "Executive Ease",
      subtitle: "Designed for seamless work trips",
      description:
        "Priority Wi‑Fi, pressing service, boardroom credit, and quiet spaces for focused work and discreet meetings.",
      price: "From ₦285,000",
      image: image("photo-1497366754035-f200968a6e72", 1400),
      inclusions: ["Boardroom credit", "Daily laundry item", "Express check-in"],
    },
  ],
  testimonials: [
    {
      quote:
        "Austina feels like a private members’ hotel — serene, elegant, and unexpectedly refined. The staff anticipated everything.",
      guest: "Amara N.",
      origin: "Lagos, Nigeria",
    },
    {
      quote:
        "The suite was gorgeous, the cocktails were world-class, and our anniversary dinner felt like a Four Seasons moment.",
      guest: "Daniel & Ife",
      origin: "Abuja, Nigeria",
    },
    {
      quote:
        "I travel for work every month. Austina is now my Lagos base because it delivers calm, privacy, and genuine warmth.",
      guest: "Mr. K. Williams",
      origin: "London, UK",
    },
  ],
  awards: [
    "Condé Nast Traveler",
    "TripAdvisor Excellence",
    "Luxury Travel Guide",
    "Boutique Hotel Awards",
    "Lagos Lifestyle Press",
  ],
  treatments: [
    { name: "Austina Signature Massage", time: "90 min", price: "₦95,000" },
    { name: "Gold Radiance Facial", time: "60 min", price: "₦70,000" },
    { name: "Deep Rest Aromatherapy", time: "75 min", price: "₦82,000" },
    { name: "Couples Recovery Ritual", time: "120 min", price: "₦185,000" },
  ],
  socialLinks: [
    { label: "IG", href: "https://instagram.com/" },
    { label: "FB", href: "https://facebook.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "IN", href: "https://linkedin.com/" },
  ],
};
