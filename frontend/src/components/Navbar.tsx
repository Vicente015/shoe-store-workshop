import { useUser } from '../context/user.tsx';
import { useCart } from '../context/cart.tsx';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { email, logOut } = useUser();
  const { numOfProducts } = useCart();

  return (
    <nav className='bg-white shadow-lg'>
      <div className='md:flex items-center justify-between py-2 px-8 md:px-12'>
        <div className='container mx-auto mt-2 flex justify-between items-center'>
          <div className='text-2xl font-bold text-gray-800 md:text-3xl'>
            <a href='/'>
              <img
                alt={'Codium logo'}
                width={120}
                src={
                  'https://www.codium.team/img/resources/codium-brand-rectangle-black.svg'
                }
              />
            </a>
          </div>
          <div className='md:hidden'>
            <button
              type='button'
              className='block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none'
            >
              <svg className='h-6 w-6 fill-current' viewBox='0 0 24 24'>
                <path
                  className='hidden'
                  d='M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z'
                />
                <path d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z' />
              </svg>
            </button>
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:block -mx-2'>
          <Link
            id={'cart-link'}
            to='/cart'
            className='text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100  py-2 px-2 md:mx-2 relative'
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
              className='text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100  py-2 px-2 md:mx-2'
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
