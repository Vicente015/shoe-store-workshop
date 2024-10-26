import { useUser } from '../context/user.tsx';
import { DiscountBanner } from '../components/DiscountBanner.tsx';
import { useCart } from '../context/cart.tsx';
import { reserveProducts } from '../products.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar.tsx';
import { CartStepper } from '../components/CartStepper.tsx';
import { CartShippingSelector } from '../components/CartShippingSelector.tsx';
import { CartProductSummary } from '../components/CartProductSummary.tsx';
import { CartPartSummary } from '../components/CartPartSummary.tsx';
import { getDiscount } from '../services/getDiscount.ts';

export function Cart() {
  const { type: userType } = useUser();
  const { products } = useCart();
  const navigate = useNavigate();
  const discount = getDiscount(products, userType);

  useEffect(() => {
    if (products.length === 0) {
      navigate('/');
    }
  }, []);

  async function handleConfirm() {
    await reserveProducts();
    window.location.assign('/payment');
  }

  return (
    <div className='w-full'>
      <Navbar />
      <CartStepper />

      <div className='grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32'>
        <div className='px-4 pt-8'>
          <p className='text-xl font-medium'>Order Summary</p>
          <p className='text-gray-400'>
            Check your items. And select a suitable shipping method.
          </p>
          <div className='mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6'>
            {products.map((product) => {
              return (
                <CartProductSummary key={product.name} product={product} />
              );
            })}
          </div>

          <p className='mt-8 text-lg font-medium'>Shipping Methods</p>
          <CartShippingSelector />
        </div>
        <div className='mt-10 bg-gray-50 px-4 pt-8 lg:mt-0'>
          <DiscountBanner discount={discount} userType={userType} />
          <p className='text-xl font-medium'>Payment Details</p>
          <p className='text-gray-400'>
            Complete your order by providing your payment details.
          </p>
          <CartPartSummary products={products} discount={discount} />
          <button
            className='mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white'
            onClick={handleConfirm}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
