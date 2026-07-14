"use client";

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  displayPrice,
  type Plant,
} from "@/lib/plants";

export type CartLine = {
  plant: Plant;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  checkoutMessage: string | null;
};

type CartActions = {
  add: (plant: Plant) => void;
  remove: (plantId: string) => void;
  setQuantity: (plantId: string, quantity: number) => void;
  open: () => void;
  close: () => void;
  checkout: () => void;
  clearCheckoutMessage: () => void;
};

type CartMeta = {
  itemCount: number;
  subtotal: number;
};

type CartContextValue = {
  state: CartState;
  actions: CartActions;
  meta: CartMeta;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const value = use(CartContext);
  if (!value) {
    throw new Error("useCart must be used within Cart.Provider");
  }
  return value;
}

function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  const add = useCallback((plant: Plant) => {
    setLines((current) => {
      const existing = current.find((line) => line.plant.id === plant.id);
      if (existing) {
        return current.map((line) =>
          line.plant.id === plant.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }
      return [...current, { plant, quantity: 1 }];
    });
    setIsOpen(true);
    setCheckoutMessage(null);
  }, []);

  const remove = useCallback((plantId: string) => {
    setLines((current) => current.filter((line) => line.plant.id !== plantId));
  }, []);

  const setQuantity = useCallback((plantId: string, quantity: number) => {
    if (quantity <= 0) {
      setLines((current) => current.filter((line) => line.plant.id !== plantId));
      return;
    }
    setLines((current) =>
      current.map((line) =>
        // Type error: quantity must be number, not string
        line.plant.id === plantId ? { ...line, quantity: String(quantity) } : line,
      ),
    );
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const checkout = useCallback(() => {
    if (lines.length === 0) return;
    setCheckoutMessage("Order reserved — payment coming soon");
    setLines([]);
  }, [lines.length]);

  const clearCheckoutMessage = useCallback(() => {
    setCheckoutMessage(null);
  }, []);

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () =>
      lines.reduce(
        (sum, line) => sum + displayPrice(line.plant) * line.quantity,
        0,
      ),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      state: { lines, isOpen, checkoutMessage },
      actions: {
        add,
        remove,
        setQuantity,
        open,
        close,
        checkout,
        clearCheckoutMessage,
      },
      meta: { itemCount, subtotal },
    }),
    [
      lines,
      isOpen,
      checkoutMessage,
      add,
      remove,
      setQuantity,
      open,
      close,
      checkout,
      clearCheckoutMessage,
      itemCount,
      subtotal,
    ],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export { CartProvider, CartContext };
