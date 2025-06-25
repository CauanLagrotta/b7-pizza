import { CartItem } from "@/types/cart-item";
import { create } from "zustand";

type Store = {
  open: boolean;
  setOpen: (open: boolean) => void;

  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
};

export const useCart = create<Store>()((set) => ({
  open: false,
  setOpen: (open) => set((state) => ({ ...state, open })),
  items: [],
  addItem: (item) =>
    set((state) => {
      let cloneItems = [...state.items];
      const existing = cloneItems.find((i) => i.productId === item.productId);

      if (existing) {
				for(let key in cloneItems){
					if(cloneItems[key].productId === item.productId){
						cloneItems[key].quantity += item.quantity; // Atualiza a quantidade do item existente
					}
				}

      } else {
        cloneItems.push({
          productId: item.productId,
          quantity: item.quantity,
        }); // Adiciona o novo item
      }

      return { ...state, items: cloneItems };
    }),

  removeItem: (productId) =>
    set((state) => ({
      ...state,
      items: state.items.filter((item) => item.productId !== productId), // Atualizando a lista sem o item deletado
    })),
}));
