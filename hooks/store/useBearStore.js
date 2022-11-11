import create from "zustand";
import { devtools } from "zustand/middleware";
//https://github.com/pmndrs/zustand   api 文档
const enabled = process.env.NEXT_PUBLIC_ENV === "development";
const usePlainStore = create(
  devtools(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    { enabled }
  )
);
export default usePlainStore;
