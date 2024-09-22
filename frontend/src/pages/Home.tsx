import { Footer } from '../components/Footer.tsx';
import { ProductComponent } from '../components/ProductComponent.tsx';
import { useEffect, useState } from 'react';
import { getProducts, Product } from '../products.ts';
import { useCart } from '../context/cart.tsx';
import { Loading } from '../components/Loading.tsx';
import { Navbar } from '../components/Navbar.tsx';

export function HomePage() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const { addProduct, isLoading } = useCart();
  useEffect(() => {
    getProducts().then((products) => setProducts(products));
  }, []);
  return (
    <>
      {isLoading && <Loading />}
      <div className='w-full'>
        <Navbar />
        <div className='py-16 bg-white'>
          <div className='container m-auto px-6 space-y-8 text-gray-500 md:px-12 lg:px-20'>
            <div className='justify-center text-center gap-6 md:text-left md:flex lg:items-center  lg:gap-16'>
              <div className='order-last mb-6 space-y-6 md:mb-0 md:w-6/12 lg:w-6/12'>
                <h1 className='text-4xl text-gray-700 font-bold md:text-5xl'>
                  Buy now and benefit up to{' '}
                  <span className='text-blue-500' style={{ color: '#b4e040' }}>
                    25% off
                  </span>
                </h1>
                <p className='text-lg'>
                  Be part of millions people around the world using our page.
                </p>
                <div className='flex flex-row-reverse flex-wrap justify-center gap-4 md:gap-6 md:justify-end'>
                  <button
                    type='button'
                    title='Start buying'
                    className='w-full py-3 px-6 text-center rounded-xl transition bg-gray-700 shadow-xl hover:bg-gray-600 active:bg-gray-700 focus:bg-gray-600 sm:w-max'
                  >
                    <span className='block text-white font-semibold'>
                      Start buying
                    </span>
                  </button>
                  <button
                    type='button'
                    title='more about'
                    className='w-full order-first py-3 px-6 text-center rounded-xl bg-gray-100 transition hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200 sm:w-max'
                  >
                    <span className='block text-gray-600 font-semibold'>
                      More about
                    </span>
                  </button>
                </div>
              </div>
              <div className='grid grid-cols-5 grid-rows-4 gap-4 md:w-5/12 lg:w-6/12'>
                <div className='col-span-2 row-span-4'>
                  <img
                    src='/images/kushagra.webp'
                    className='rounded-full'
                    width='640'
                    height='960'
                    alt='shoes'
                    loading='lazy'
                  />
                </div>
                <div className='col-span-2 row-span-2'>
                  <img
                    src='/images/iman.webp'
                    className='w-full h-full object-cover object-top rounded-xl'
                    width='640'
                    height='640'
                    alt='shoe'
                    loading='lazy'
                  />
                </div>
                <div className='col-span-3 row-span-3'>
                  <img
                    src='/images/daniel.webp'
                    className='w-full h-full object-cover object-top rounded-xl'
                    width='640'
                    height='427'
                    alt='shoes'
                    loading='lazy'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='focus:outline-none'>
        <div className='mx-auto container' id='list'>
          <h2 className='text-4xl font-semibold my-8'>Products</h2>
          <div className='flex flex-wrap items-center w-full'>
            {products.map((p) => {
              return (
                <div className='px-4 pt-4 pb-4 max-w-96 min-w-96' key={p.name}>
                  <ProductComponent
                    product={p}
                    addProduct={() => {
                      addProduct(p, 1);
                    }}
                  ></ProductComponent>
                </div>
              );
            })}
          </div>
          <div className={'text-center mt-16'}>
            <a href={'#'} className={'underline'}>
              {' '}
              View more
            </a>
          </div>
        </div>
      </div>

      <div
        className='mt-24 min-w-screen min-h-screen flex items-center p-5 lg:p-10 overflow-hidden relative'
        style={{ backgroundColor: '#b4e040' }}
      >
        <div className='w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left'>
          <div className='md:flex items-center -mx-10'>
            <div className='w-full md:w-1/2 px-10 mb-10 md:mb-0'>
              <h3 className='text-3xl font-bold mb-8'>TOP Product</h3>
              <div className='relative'>
                <img
                  src='/images/photo-1606107557195-0e29a4b5b4aa.avif'
                  className='w-full relative z-10'
                  alt=''
                />
                <div className='border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0'></div>
              </div>
            </div>
            <div className='w-full md:w-1/2 px-10'>
              <div className='mb-10'>
                <h1 className='font-bold uppercase text-2xl mb-5'>
                  Ragged <br />
                  Waterproof shoes
                </h1>
                <p className='text-sm'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing, elit.
                  Eos, voluptatum dolorum! Laborum blanditiis consequatur,
                  voluptates, sint enim fugiat saepe, dolor fugit, magnam
                  explicabo eaque quas id quo porro dolorum facilis...{' '}
                  <a
                    href='#'
                    className='opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900'
                  >
                    MORE <i className='mdi mdi-arrow-right'></i>
                  </a>
                </p>
              </div>
              <div>
                <div className='inline-block align-bottom mr-5'>
                  <span className='text-2xl leading-none align-baseline'>
                    $
                  </span>
                  <span className='font-bold text-5xl leading-none align-baseline'>
                    59
                  </span>
                  <span className='text-2xl leading-none align-baseline'>
                    .99
                  </span>
                </div>
                <div className='inline-block align-bottom'>
                  <button
                    className='bg-yellow-300 opacity-75 hover:opacity-100 text-gray-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold'
                    style={{ backgroundColor: '#b4e040' }}
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
