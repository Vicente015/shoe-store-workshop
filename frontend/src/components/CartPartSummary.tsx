import { calculateTotal, Product } from '../products';
import { calculateTotalWithDiscount } from '../services/getDiscount';

type Props = {
  products: Product[];
  discount: number;
};

export function CartPartSummary({ products, discount }: Props) {
  const total = calculateTotal(products);

  return (
    <section>
      <div className='mt-6 border-t py-2'>
        <div className='flex items-center justify-between'>
          <p className='text-sm font-medium text-gray-900'>Subtotal</p>
          <p className='font-semibold text-gray-900' id='subtotal'>
            {total.toFixed(2)} €
          </p>
        </div>
      </div>
      <div className='border-t border-b py-2'>
        <div className='flex items-center justify-between'>
          <p className='text-sm font-medium text-gray-900'>Discount</p>
          <p className='font-semibold text-gray-900' id='discount'>
            {discount} %
          </p>
        </div>
      </div>
      <div className='mt-6 flex items-center justify-between'>
        <p className='text-sm font-medium text-gray-900'>Total</p>
        <p className='text-2xl font-semibold text-gray-900' id='total'>
          {calculateTotalWithDiscount(discount, total).toFixed(2)} €
        </p>
      </div>
    </section>
  );
}
