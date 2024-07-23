import { Product } from '../products.ts';
import { useCart } from '../context/cart.tsx';

export function CartProductSummary({ product }: { product: Product }) {
  const { addProduct, products, isLoading } = useCart();
  const quantity = (products.find((p) => p.name === product.name) as Product)
    .quantity;

  const handleQuantityChangeEvent = (
    ev: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const quantity = parseInt(ev.target.value, 10);
    addProduct(product, quantity, true);
  };

  if (isLoading) {
    return (
      <div
        role='status'
        className='space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center'
      >
        <div className='flex items-center justify-center w-full h-24 bg-gray-300 rounded sm:w-36 dark:bg-gray-700'>
          <svg
            className='w-6 h-6 text-gray-200 dark:text-gray-600'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 18'
          >
            <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
          </svg>
        </div>
        <div className='w-full'>
          <div className='h-2.5 bg-white rounded-full w-48 mb-4'></div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5'></div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[110px] mb-2.5'></div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[110px] mb-2.5'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col rounded-lg bg-white sm:flex-row'>
      <img
        className='m-2 h-24 w-28 rounded-md border object-cover object-center min-w-28'
        src={product.image}
        alt={product.name}
      />
      <div className='flex w-full flex-col px-4 py-4'>
        <span className='font-semibold'>{product.name}</span>
        <span className='float-right text-gray-400'>42EU - 8.5US</span>
        <p className='text-lg font-bold'>
          {(product.price * quantity).toFixed(2)} €
        </p>
      </div>
      <form className='max-w-sm mx-auto'>
        <label
          htmlFor='countries'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Quantity
        </label>
        <select
          defaultValue={quantity}
          onChange={handleQuantityChangeEvent}
          id='countries'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </form>
    </div>
  );
}
