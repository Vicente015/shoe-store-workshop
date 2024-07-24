import { useUser } from '../context/user.tsx';
import { useCart } from '../context/cart.tsx';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { email, logOut } = useUser();
  const { numOfProducts } = useCart();

  return (
    <nav className='bg-white shadow-lg'>
      <div className='flex items-center justify-between py-2 px-8 md:px-12'>
        <div className='container mx-auto mt-2 flex justify-between items-center'>
          <div>
            <a href='/'>
              <img
                alt={'Codium logo'}
                width={120}
                src={'/images/codium-brand-rectangle-black.png'}
              />
            </a>
          </div>
        </div>
        <div className='flex flex-row -mx-2'>
          <Link
            id={'cart-link'}
            to='/cart'
            className='min-w-16 text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100  py-2 px-2 md:mx-2 relative'
          >
            <span>Cart</span>
            <span
              id={'cart-link-count'}
              className='inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-red-800 bg-red-200 rounded-full'
              style={{
                position: 'relative',
                top: '-10px',
              }}
            >
              {numOfProducts}
            </span>
          </Link>
          {!email && (
            <Link
              to='/login'
              className='min-w-16 text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100  py-2 px-2 md:mx-2'
            >
              Log in
            </Link>
          )}
          {email && (
            <span
              onClick={() => {
                logOut();
                window.location.reload();
              }}
              className='text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:cursor-pointer  py-2 px-2 md:mx-2'
            >
              Exit
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
