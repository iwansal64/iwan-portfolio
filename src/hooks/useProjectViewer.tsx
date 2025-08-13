import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type useProjectViewerType = {
  isOpen: boolean,
  setOpen: (newState: boolean) => void
};

export const useProjectViewerHook = create<useProjectViewerType>()(
  persist(
    (set) => ({
      isOpen: false,
      setOpen(newState) {
        set(() => ({ isOpen: newState }));
      },
    }), {
      name: "project-viewer-state",
      storage: createJSONStorage(() => localStorage)
    }
  )
)