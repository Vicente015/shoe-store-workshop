import { render, screen } from '@testing-library/react';
import { calculateTotal, Product } from '../src/products';
import { CartPartSummary } from '../src/components/CartPartSummary';
import {
  calculateTotalWithDiscount,
  getDiscount,
} from '../src/services/getDiscount';
import { UserType } from '../src/models/UserType';

describe('CartPartSummary', () => {
  it('Should render discount text', () => {
    const product: Product = {
      name: 'Test product',
      quantity: 1,
      image: 'https://blablabla',
      price: 15.55,
    };
    const products = [product];
    const discount = getDiscount(products, UserType.GUEST);

    render(<CartPartSummary products={products} discount={discount} />);

    expect(screen.getByText('Discount')).toBeVisible();
  });

  it('Should render discount percent', () => {
    const product: Product = {
      name: 'Test product',
      quantity: 1,
      image: 'https://blablabla',
      price: 15.55,
    };
    const products = [product];
    const discount = getDiscount(products, UserType.REGISTER);

    render(<CartPartSummary products={products} discount={discount} />);

    expect(screen.getByText(`${discount} %`)).toBeVisible();
  });

  it('Should calculate total with discount applied', () => {
    const product: Product = {
      name: 'Test product',
      quantity: 1,
      image: 'https://blablabla',
      price: 15.55,
    };
    const products = [product];
    const discount = getDiscount(products, UserType.REGISTER);
    const total = calculateTotal(products);
    const totalWithDiscount = calculateTotalWithDiscount(discount, total);

    render(<CartPartSummary products={products} discount={discount} />);

    expect(screen.getByText(`${totalWithDiscount.toFixed(2)} €`)).toBeVisible();
  });
});
