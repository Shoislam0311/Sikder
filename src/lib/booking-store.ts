"use client";

import { create } from "zustand";

export type BookingDraft = {
  roomSlug: string;
  roomName: string;
  price: number;
  image: string;
} | null;

type BookingState = {
  open: boolean;
  draft: BookingDraft;
  openBooking: (draft: BookingDraft) => void;
  closeBooking: () => void;
};

export const useBooking = create<BookingState>((set) => ({
  open: false,
  draft: null,
  openBooking: (draft) => set({ open: true, draft }),
  closeBooking: () => set({ open: false, draft: null }),
}));
