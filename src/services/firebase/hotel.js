import { db } from "./config";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// Get all hotels
export const getHotels = async (sortBy = "price", order = "asc") => {
  try {
    const hotelsRef = collection(db, "hotels");
    const q = query(hotelsRef, orderBy(sortBy, order));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

// Get hotel by ID
export const getHotelById = async (hotelId) => {
  try {
    const hotelRef = doc(db, "hotels", hotelId);
    const hotelSnap = await getDoc(hotelRef);

    if (hotelSnap.exists()) {
      return { id: hotelSnap.id, ...hotelSnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

// Create a booking
export const createBooking = async (bookingData) => {
  try {
    const bookingRef = collection(db, "bookings");
    const newBooking = {
      ...bookingData,
      createdAt: serverTimestamp(),
      status: "confirmed",
    };

    const docRef = await addDoc(bookingRef, newBooking);
    return { id: docRef.id, ...newBooking };
  } catch (error) {
    throw error;
  }
};

// Get user bookings
export const getUserBookings = async (userId) => {
  try {
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

// Add a review
export const addReview = async (reviewData) => {
  try {
    const reviewRef = collection(db, "reviews");
    const newReview = {
      ...reviewData,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(reviewRef, newReview);
    return { id: docRef.id, ...newReview };
  } catch (error) {
    throw error;
  }
};

// Get hotel reviews
export const getHotelReviews = async (hotelId) => {
  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef,
      where("hotelId", "==", hotelId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};
