import { create } from "zustand";
import { setCookie, deleteCookie } from "cookies-next/client";

type Store = {
  open: boolean;
  setOpen: (newOpen: boolean) => void;

  token: string | null;
  setToken: (newToken: string | null) => void;
};

export const useAuth = create<Store>()((set) => ({
  token: null,
  open: false,
  setOpen: (newOpen) => set((state) => ({ ...state, open: newOpen })),
  setToken: (newToken) =>
    set((state) => {
      if (newToken) {
        setCookie("token", newToken);
      } else {
        deleteCookie("token");
      }

      return { ...state, token: newToken };
    }),
}));
