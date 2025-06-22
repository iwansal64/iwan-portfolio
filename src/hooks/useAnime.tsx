import type { Scope } from "animejs";
import type { RefObject } from "react";
import { create } from "zustand";

type useAnimeHookType = {
  animeScopeRoot: HTMLDivElement|null,
  setAnimeScopeRoot: (newAnimeScopeRoot: HTMLDivElement) => void
};

export const useAnimeHook = create<useAnimeHookType>((set) => {

  return {
    animeScopeRoot: null,
    setAnimeScopeRoot(newAnimeScope) {
        set(() => ({ animeScopeRoot: newAnimeScope }))
    },
  }
})


export default function useAnimeHookEffect() {
  return <></>;
}