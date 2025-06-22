import { create } from "zustand";
import { get_random_from_array } from "../others/util";

export const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

type useUniqueIDType = {
  count: number,
  getUniqueID: () => string
};

export const useUniqueIDHook = create<useUniqueIDType>((set) => {
  return {
    count: 0,
    getUniqueID() {
      let result = "";

      // Add bunch of letters
      for (let index = 0; index < 10; index++) {
        const choosen = get_random_from_array(alphabets);
        result += choosen;
      }

      
      // Counter the count value
      set((state) => {
        // Add unique count identifier
        result += state.count.toString();

        return {
          count: state.count + 1
        }
      });
      
      return result;
    },
  }
})

export default function useUniqueIDHookEffect() {
  return <></>;
}