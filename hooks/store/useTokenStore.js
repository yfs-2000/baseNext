import create from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
//https://github.com/pmndrs/zustand   api 文档
const enabled = process.env.NEXT_PUBLIC_ENV === "development";

const useTokenStore = create(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (token) => set({ token }),
      }),
      {
        name: "token",
      }
    ),
    { enabled }
  )
);

export default useTokenStore;
