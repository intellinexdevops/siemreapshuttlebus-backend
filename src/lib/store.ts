import { create } from "zustand";

type StoreState = {
  pathname: string;
  setPathname: (newPathname: string) => void;
};

const usePathname = create<StoreState>((set) => ({
  pathname: "",
  setPathname: (newPathname: string) => set(() => ({ pathname: newPathname })),
}));

export { usePathname };
