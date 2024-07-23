import { createContext, ReactNode, useContext, useState } from 'react';
import { addProductsToCart, Product } from '../products.ts';

interface CartContextType {
  products: Array<Product>;
}

interface CartContextValue extends CartContextType {
  addProduct: (
    product: Product,
    quantity: number,
    isFromProductDetailPage?: boolean
  ) => void;
  numOfProducts: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextValue>({
  products: [],
  addProduct: () => {},
  numOfProducts: 0,
  isLoading: false,
});

function countProductsWithQuantity(newProducts: Product[]) {
  return newProducts.reduce((count, p) => {
    return count + p.quantity;
  }, 0);
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initProducts = JSON.parse(
    sessionStorage.getItem('products') || '[]'
  ) as Array<Product>;
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Array<Product>>(initProducts);
  const [numOfProducts, setNumOfProducts] = useState<number>(
    countProductsWithQuantity(initProducts)
  );
  const addProduct = async (
    product: Product,
    quantity: number,
    isFromProductDetailPage = false
  ) => {
    setIsLoading(true);
    const newProducts = [...products];
    const index = newProducts.findIndex((p) => p.name === product.name);
    if (index === -1) {
      newProducts.push({ ...product, quantity });
    } else {
      const foundProduct = products.find(
        (p) => p.name === product.name
      ) as Product;
      const quantity1 = isFromProductDetailPage
        ? quantity
        : foundProduct.quantity + quantity;
      const MAX_PRODUCT_PER_PERSON = 4;
      newProducts[index] = {
        ...product,
        quantity:
          quantity1 >= MAX_PRODUCT_PER_PERSON
            ? MAX_PRODUCT_PER_PERSON
            : quantity1,
      };
    }

    await addProductsToCart(newProducts);
    sessionStorage.setItem('products', JSON.stringify(newProducts));
    setProducts(newProducts);
    setNumOfProducts(countProductsWithQuantity(newProducts));
    setIsLoading(false);
  };

  return (
    <CartContext.Provider
      value={{ products, addProduct, numOfProducts, isLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  return useContext(CartContext);
};
