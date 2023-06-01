import { create } from "zustand";

type GlobalState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const initialGlobalState = {
  isLoading: false,
};

export const useGlobalStore = create<GlobalState>((set) => {
  return {
    ...initialGlobalState,
    setIsLoading(isLoading: boolean) {
      set((state) => {
        return {
          isLoading,
        };
      });
    },
  };
});
