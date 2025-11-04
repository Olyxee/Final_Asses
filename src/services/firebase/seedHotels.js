import { db } from "./config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const sampleHotels = [
  {
    id: "h1",
    name: "Luxury Resort & Spa",
    location: "Cape Town",
    price: 250,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1501117716987-c8e3b2cfb2e6",
    description: "Beautiful resort with ocean views",
  },
  {
    id: "h2",
    name: "Mountain View Hotel",
    location: "Queenstown",
    price: 180,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1542317854-9b8f6f0b1d1f",
    description: "Cozy hotel near the mountains",
  },
  {
    id: "h3",
    name: "City Center Inn",
    location: "New York",
    price: 150,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
    description: "Conveniently located in the heart of the city",
  },
  {
    id: "h4",
    name: "Beachside Bungalows",
    location: "Miami",
    price: 220,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1501117716987-c8e3b2cfb2e6",
    description: "Relaxed bungalows right on the beach",
  },
  {
    id: "h5",
    name: "Historic Boutique",
    location: "London",
    price: 200,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba",
    description: "Charming boutique hotel with historic character",
  },
];

export const seedSampleHotels = async () => {
  try {
    for (const h of sampleHotels) {
      const ref = doc(db, "hotels", h.id);
      await setDoc(ref, { ...h, createdAt: serverTimestamp() });
    }
    return { success: true, count: sampleHotels.length };
  } catch (e) {
    console.error("seedSampleHotels error", e);
    throw e;
  }
};

export default { seedSampleHotels };
