import { Product } from '../products.ts';
import { slugify } from '../slugify.ts';

export function ProductComponent({
  product,
  addProduct,
}: {
  product: Product;
  addProduct: () => void;
}) {
  return (
    <div className='flex items-center justify-center'>
      <article className='max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden'>
        <div>
          <img
            className='object-cover h-64 w-full'
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className='flex flex-col gap-1 mt-4 px-4'>
          <h2 className='text-lg font-semibold text-gray-800'>
            {product.name}
          </h2>
          <span className='font-normal text-gray-600'>
            Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos,
            voluptatum dolorum...
          </span>
          <span className='mr-2 text-2xl font-extrabold mt-2'>
            {product.price} €
          </span>
          <a
            type='button'
            href={`/product/${slugify(product.name)}`}
            className='text-gray-900 bg-white hover:opacity-85 focus:ring-4 font-medium rounded-lg text-sm py-2.5 text-right inline-flex items-center justify-end me-2 mb-2'
          >
            <span className={'mr-2'}>View</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
              />
            </svg>
          </a>
        </div>

        <div className='mt-4 p-4 border-t flex items-center justify-center content-center border-gray-200'>
          <button
            onClick={addProduct}
            type='button'
            className='inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='shrink-0 mr-3 h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
              />
            </svg>
            Add to cart
          </button>
        </div>
      </article>
    </div>
  );
}
