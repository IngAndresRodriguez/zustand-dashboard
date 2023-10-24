import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseSessionStorare } from "../storages/firebase.storage";
import { useWeddingBoundStore } from "..";
// import { logger } from "../middlewares/logger.middleware";
// import { customSessionStorare } from "../storages/session.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',
  setFirstName: (value: string) => set(({ firstName: value }), false, 'setFirstName'),
  setLastName: (value: string) => set(({ lastName: value }), false, 'setLastName'),
})

export const usePersonStore = create<PersonState & Actions>()(
  // logger(
  devtools(
    persist(storeAPI, {
      name: 'personStore',
      // storage: customSessionStorare
      storage: firebaseSessionStorare
    })
  )
  // )
)

usePersonStore.subscribe((newState, /*prevState*/) => {
  const { firstName, lastName } = newState;
  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastName(lastName);
});