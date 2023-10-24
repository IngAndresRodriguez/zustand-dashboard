import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ConfirmationSlice, createConfirmationSlice } from './confirmation.slice';
import { DateSlice, createDateSlice } from './date.slice';
import { GuestSlice, createGuestSlice } from './guest.slice';
import { PersonSlice, createPersonSlice } from './person.slice';

type ShareState =
  | PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<ShareState>()(
  devtools(
    (...a) => ({
      ...createConfirmationSlice(...a),
      ...createDateSlice(...a),
      ...createGuestSlice(...a),
      ...createPersonSlice(...a),
    })
  )
);