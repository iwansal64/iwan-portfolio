import { create } from "zustand";

type useHoverCounterType = {
  counter: number,
  addCounter: () => void,
  resetCounter: () => void
};

export const useHoverCounterHook = create<useHoverCounterType>((set) => {
  return {
    counter: 0,
    addCounter() {
        set((state) => ({
          counter: state.counter + 1
        }))
    },
    resetCounter() {
        set(() => ({
          counter: 0
        }))
    },
  }
})

