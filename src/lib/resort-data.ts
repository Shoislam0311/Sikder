// Central content source for Sikder Resort & Villas
// All copy & imagery sourced from sikderresort.com

export const RESORT = {
  name: "Sikder Resort & Villas",
  shortName: "Sikder Resort",
  location: "Kuakata, Patuakhali",
  tagline: "Sagorkonna — the daughter of the sea",
  establishedYear: 2025,
  address: {
    line1: "Opposite of Eco Park,",
    line2: "Kuakata, Patuakhali – 8652",
    corporate: "Red Crescent House (Level-6), 61 Motijheel C/A, Dhaka-1000",
  },
  phones: ["+88 01870704025", "+88 01870704029"],
  corporatePhones: ["+88 01700802726", "+88 01793777733"],
  emails: ["sales@sikderresort.com", "sikderresort@gmail.com"],
  socials: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
  },
};

export const HERO_SLIDES = [
  {
    image: "https://sikderresort.com/wp-content/uploads/2025/02/sikder.jpg",
    kicker: "Welcome to",
    title: "Sikder Resort & Villas",
    subtitle: "Kuakata",
  },
  {
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Wall-photo-8-scaled.jpg",
    kicker: "Where the Bay meets",
    title: "Refined Tranquility",
    subtitle: "By the Sea",
  },
  {
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Wall-photo-6-scaled.jpg",
    kicker: "Nature, reimagined as",
    title: "A Luxuries Escape",
    subtitle: "Sagorkonna",
  },
  {
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Wall-photo-3-scaled.jpg",
    kicker: "Sunrise to sunset,",
    title: "Your Private Paradise",
    subtitle: "On the Bay of Bengal",
  },
  {
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Wall-photo-9-scaled.jpg",
    kicker: "Designed for the",
    title: "Modern Traveler",
    subtitle: "Kuakata, Bangladesh",
  },
];

export const ABOUT = {
  kicker: "About Us",
  title: "A Luxuries Resort & Villas with Nature",
  paragraphs: [
    "Sikder Resort & Villas, Kuakata — with its sophisticated contemporary design — sits beautifully alongside the chic shopping strips and eclectic mixture of urban dining and party venues.",
    "Being only a short distance from the beach, where we have our very own exclusive nearby beach, this resort is made for the modern traveler coming to Kuakata, the SAGORKONNA.",
  ],
  images: [
    "https://sikderresort.com/wp-content/uploads/2025/02/Wall-photo-8-1-683x1024.jpg",
    "https://sikderresort.com/wp-content/uploads/2025/02/Wall-photo-4-689x1024.jpg",
    "https://sikderresort.com/wp-content/uploads/2025/02/Gallery-14-1024x1024.jpg",
  ],
  highlights: [
    { label: "Beachfront", value: "Exclusive nearby beach" },
    { label: "Designed", value: "Contemporary luxury" },
    { label: "Located", value: "Opposite Eco Park, Kuakata" },
  ],
};

export const RESTAURANT = {
  kicker: "Delicious Food",
  title: "Restaurants & Juice Bar",
  description:
    "Sikder Resort & Villas is designed with the most up-to-date hygienic kitchen, maintained and operated by our highly trained team of Food & Beverage specialists. Our service staff are professionally trained and knowledgeable in the local area, and aim to assist in making your stay pleasurable and an unforgettable experience.",
  images: [
    "https://sikderresort.com/wp-content/uploads/2025/02/Sikder-01-133-691x1024.jpg",
    "https://sikderresort.com/wp-content/uploads/2025/02/Juice-Bar-683x1024.jpg",
  ],
  cuisines: ["Bangla", "Indian", "Thai", "Chinese"],
  features: [
    "Hygienic modern kitchen",
    "Trained F&B specialists",
    "All-day dining restaurant",
    "Poolside juice bar",
  ],
};

export type Room = {
  slug: string;
  name: string;
  price: number;
  size: string;
  capacity: string;
  description: string;
  image: string;
  amenities: string[];
  featured: boolean;
  category: "Rooms" | "Suites" | "Villas";
};

const SHARED_AMENITIES = [
  "Complimentary buffet breakfast",
  "Welcome drinks on arrival",
  "Fruit basket & mineral water",
  "Unlimited Swimming Pool & Jacuzzi",
  "Unlimited Gym access",
  "Free Wi-Fi & LED satellite TV",
  "Tea / coffee making facilities",
  "Boating in lake & Billiards",
];

export const ROOMS: Room[] = [
  {
    slug: "deluxe-room-with-view",
    name: "Deluxe Room with View",
    price: 12650,
    size: "410 sq ft",
    capacity: "2 adults · 1 Queen bed",
    description:
      "An elegant room with a queen-size bed, comfortable sofa, and a private balcony opening to sweeping views of the resort and beyond.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Deluxe-Room-With-View-scaled.jpg",
    amenities: SHARED_AMENITIES,
    featured: true,
    category: "Rooms",
  },
  {
    slug: "deluxe-room-without-view",
    name: "Deluxe Room without View",
    price: 16445,
    size: "410 sq ft",
    capacity: "4 adults · 2 Queen beds",
    description:
      "A spacious no-balcony room appointed with two queen beds — refined comfort without compromise for families and friends.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Deluxe-Without-View-scaled.jpg",
    amenities: SHARED_AMENITIES,
    featured: true,
    category: "Rooms",
  },
  {
    slug: "superior-room",
    name: "Superior Room",
    price: 17710,
    size: "510 sq ft",
    capacity: "4 adults · 2 Queen beds",
    description:
      "Generously proportioned with two queen beds, the Superior Room blends contemporary design with relaxed coastal elegance.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Superior-Room-scaled.jpg",
    amenities: SHARED_AMENITIES,
    featured: true,
    category: "Rooms",
  },
  {
    slug: "premier-room",
    name: "Premier Room",
    price: 20240,
    size: "610 sq ft",
    capacity: "4 adults · 2 Queen beds",
    description:
      "Our premier room category — a sweeping 610 sq ft sanctuary of light, space and uninterrupted resort ambiance.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Premier-Room-scaled.jpg",
    amenities: SHARED_AMENITIES,
    featured: true,
    category: "Rooms",
  },
  {
    slug: "deluxe-connecting",
    name: "Deluxe Connecting",
    price: 25300,
    size: "700 sq ft",
    capacity: "4 adults · 2 interconnecting",
    description:
      "Two interconnecting bedrooms designed for families — privacy and togetherness in equal, elegant measure.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Deluxe-Connecting-scaled.jpg",
    amenities: SHARED_AMENITIES,
    featured: false,
    category: "Rooms",
  },
  {
    slug: "executive-twin-without-balcony",
    name: "Executive Twin",
    price: 25300,
    size: "650 sq ft",
    capacity: "4 adults · 2 Queen beds",
    description:
      "A refined executive twin layout — sleek, calm and tailored for the modern business or leisure traveler.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Executive-Twin-scaled.jpg",
    amenities: SHARED_AMENITIES,
    featured: false,
    category: "Rooms",
  },
  {
    slug: "classy-twin",
    name: "Classy Twin",
    price: 27830,
    size: "650 sq ft",
    capacity: "4 adults · 2 Queen beds",
    description:
      "The Classy Twin elevates the executive experience with considered details and a graceful, residential feel.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Classy-Twin-scaled.jpg",
    amenities: SHARED_AMENITIES,
    featured: false,
    category: "Rooms",
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    price: 40480,
    size: "1000 sq ft",
    capacity: "2 adults · King bed + Living",
    description:
      "A one-bedroom suite with a separate living room — a king bed, plush sofa, and the space to truly unwind.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Executive-Suite-scaled.jpg",
    amenities: SHARED_AMENITIES,
    featured: true,
    category: "Suites",
  },
  {
    slug: "royal-suite",
    name: "Royal Suite",
    price: 56925,
    size: "2500 sq ft",
    capacity: "6 adults · King + Twin + Living",
    description:
      "Our signature suite — a couple bedroom, a twin bedroom and a grand living room across 2,500 sq ft of pure indulgence.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Royal-Suite-scaled.jpg",
    amenities: SHARED_AMENITIES,
    featured: true,
    category: "Suites",
  },
  {
    slug: "premier-villa-with-private-pool",
    name: "Premier Villa with Private Pool",
    price: 63250,
    size: "2500 sq ft",
    capacity: "6 adults · 3 bedrooms + Pool",
    description:
      "A duplex villa with three bedrooms, a dining living room and your very own private pool — the pinnacle of the Sikder experience.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Premier-Villa-With-Pool-scaled.jpg",
    amenities: SHARED_AMENITIES,
    featured: true,
    category: "Villas",
  },
  {
    slug: "premier-villa-without-pool",
    name: "Premier Villa without Pool",
    price: 56925,
    size: "2500 sq ft",
    capacity: "6 adults · 3 bedrooms",
    description:
      "The same exquisite duplex villa — three couple bedrooms and a dining living room — for those who prefer the shared pools.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Premier-Villa-Without-Pool-scaled.jpg",
    amenities: SHARED_AMENITIES,
    featured: false,
    category: "Villas",
  },
  {
    slug: "superior-villa",
    name: "Superior Villa",
    price: 50600,
    size: "2200 sq ft",
    capacity: "5 adults · 2 Couple + Single",
    description:
      "A duplex villa with two couple bedrooms, a single bedroom and a dining living room — space and serenity for the whole family.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Superior-Villa-scaled.jpg",
    amenities: SHARED_AMENITIES,
    featured: false,
    category: "Villas",
  },
];

export const WELLNESS = [
  {
    name: "Swimming Pool",
    hours: "08:00 AM – 10:00 PM",
    description:
      "Our swimming pool offers the best of modern amenities — a swim is bound to take the stress off your body and relax your mind and soul. A fresh juice at our Pool Juice Bar is the ideal recommendation to re-spark your youthfulness.",
    image: "https://sikderresort.com/wp-content/uploads/2025/02/363-1024x683.jpg",
  },
  {
    name: "Gymnasium",
    hours: "07:00 AM – 10:00 PM",
    description:
      "A fully-equipped modern gymnasium to keep your routine intact while you travel. Step in, breathe out, and move at your own pace.",
    image: "https://sikderresort.com/wp-content/uploads/2025/02/Gy-1024x478.jpeg",
  },
  {
    name: "Billiards",
    hours: "08:00 AM – 10:00 PM",
    description:
      "Enjoy your stay with the cozy sport of billiards — a refined way to wind down the evening at Sikder Resort & Villas, Kuakata.",
    image: "https://sikderresort.com/wp-content/uploads/2025/02/Game-2-1024x576.jpg",
  },
];

export const MEETING_VENUES = [
  {
    name: "Conference Hall – 1",
    size: "4,000 sq ft",
    capacity: "Theatre 300 · Round 120 · Classroom 280",
    description:
      "Sikder Resort & Villas Conference Hall is equipped with all modern state-of-the-art amenities and facilities for your ultimate requirements.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Conference-Hall-1-1024x683.jpg",
  },
  {
    name: "Conference Hall – 2",
    size: "4,000 sq ft",
    capacity: "Theatre 300 · Round 120 · Classroom 280",
    description:
      "A second grand conference hall with the same modern amenities — ideal for concurrent sessions and large corporate gatherings.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Conference-Hall-2-1024x683.jpg",
  },
  {
    name: "Amphitheatre",
    size: "12,000 sq ft",
    capacity: "Open-air · Live events · Weddings",
    description:
      "The open-air amphitheatre is the ideal venue for live events, parties and destination weddings — with a smart pre-function area, modern equipment and high-speed internet.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Amphitheatre-1024x683.jpg",
  },
  {
    name: "Meeting Room – 1",
    size: "1,200 sq ft",
    capacity: "Up to 25 guests · Square style",
    description:
      "A well-appointed meeting room offering 1,200 sq ft of flexible space for up to 25 guests, with a smart pre-function area and high-speed internet.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Meeting-Room-1024x683.jpg",
  },
  {
    name: "Meeting Room – 2",
    size: "1,200 sq ft",
    capacity: "Up to 25 guests · Square style",
    description:
      "Meeting Room 2 mirrors the same refined flexibility — ideal for intimate boardroom sessions and breakout discussions.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Meeting-Room-2-1024x683.jpg",
  },
  {
    name: "Meeting Room – 3",
    size: "1,200 sq ft",
    capacity: "Up to 25 guests · Square style",
    description:
      "Meeting Room 3 completes the trio of intimate spaces — perfect for focused, productive gatherings of up to 25.",
    image:
      "https://sikderresort.com/wp-content/uploads/2025/02/Meeting-Room-3-1024x683.jpg",
  },
];

export const ATTRACTIONS = [
  {
    name: "Kuakata Sea Beach",
    image: "https://sikderresort.com/wp-content/uploads/2025/02/1-768x432.png",
    description:
      "Kuakata beach, in the Latachapali union, is a panoramic stretch where you can watch both sunrise and sunset over the Bay of Bengal from the same shore.",
  },
  {
    name: "Sunrise & Sunset",
    image: "https://sikderresort.com/wp-content/uploads/2025/02/4-768x432.png",
    description:
      "Kuakata is one of the rarest places on earth where the full rising and setting of the sun can be witnessed — a daily spectacle of golden light.",
  },
  {
    name: "Fatra Forest",
    image: "https://sikderresort.com/wp-content/uploads/2025/02/3-768x432.png",
    description:
      "The Fatra Forest begins on the far side of the estuary — a wild mangrove haven of birds, trails and untouched greenery reached by a short boat ride.",
  },
  {
    name: "Red Crab Island",
    image: "https://sikderresort.com/wp-content/uploads/2025/02/7-768x432.png",
    description:
      "Crab Island, or Kakra Dwip, is a famous sandbar carpeted with thousands of red crabs — a photographer's dream at low tide.",
  },
  {
    name: "Kuakata Rakhine Village",
    image: "https://sikderresort.com/wp-content/uploads/2025/02/8-768x432.png",
    description:
      "Rakhain Palli, a few kilometres away, is home to the indigenous Rakhine community — a living window into their weaving, culture and coastal life.",
  },
  {
    name: "Misripara Buddhist Temple",
    image: "https://sikderresort.com/wp-content/uploads/2025/02/9-768x432.png",
    description:
      "Misripara is a village crowned by a serene Buddhist temple and the region's largest Buddha statue — a place of calm and contemplation.",
  },
  {
    name: "Lebur Chor",
    image: "https://sikderresort.com/wp-content/uploads/2025/02/10-768x432.png",
    description:
      "Lebur Chor lies five kilometres east of Kuakata — a quiet grove and forested coast where the river meets the sea.",
  },
  {
    name: "Shutki Palli",
    image: "https://sikderresort.com/wp-content/uploads/2025/02/5-768x432.png",
    description:
      "Shutki Palli is Kuakata's famous dried-fish village — an essential glimpse into the local fishing economy and age-old preserving craft.",
  },
  {
    name: "Kuakata Well (Kua)",
    image: "https://sikderresort.com/wp-content/uploads/2025/02/11-768x432.png",
    description:
      "The well that bears witness to the origin of Kuakata's name — dug by the first Rakhine settlers who arrived here centuries ago.",
  },
];

// Gallery images (55 total from sikderresort.com)
export const GALLERY = Array.from({ length: 55 }, (_, i) => {
  const n = i + 1;
  const name = n === 1 ? "1-1" : n === 3 ? "3-1" : n === 4 ? "4-1" : n === 5 ? "5-1" : n === 7 ? "7-1" : n === 8 ? "8-1" : n === 9 ? "9-1" : n === 10 ? "10-1" : n === 11 ? "11-1" : `${n}`;
  return `https://sikderresort.com/wp-content/uploads/2025/02/${name}.png`;
});

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "Dining", href: "#dining" },
  { label: "Wellness", href: "#wellness" },
  { label: "Events", href: "#events" },
  { label: "Discover", href: "#discover" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function formatBDT(n: number) {
  return "৳ " + n.toLocaleString("en-BD");
}
