import { createJSONStorage, type StateStorage } from "zustand/middleware";

const firebaseUrl = 'https://zustand-storage-cf8ef-default-rtdb.firebaseio.com/zustand'

const storageAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((response) => response.json());
      return JSON.stringify(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value
    }).then((response) => response.json());

    return;
  },
  removeItem: function (name: string): void | Promise<void> {
    sessionStorage.removeItem(name);
  }
}
export const firebaseSessionStorare = createJSONStorage(() => storageAPI)