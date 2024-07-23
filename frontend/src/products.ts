import { slugify } from './slugify.ts';

export type Product = {
  name: string;
  quantity: number;
  price: number;
  image: string;
};

export async function getProducts(): Promise<Array<Product>> {
  return [
    {
      name: "Nike Air Force 1 '07 Next Nature",
      quantity: 0,
      price: 119.99,
      image:
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Nike SB Dunk PREMIUM Pro',
      quantity: 0,
      price: 109.99,
      image:
        'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Nike SB Dunk LOW',
      quantity: 0,
      price: 10.99,
      image:
        'https://plus.unsplash.com/premium_photo-1664457233884-d25eaa242627?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Nike SB Nyjah 3',
      quantity: 0,
      price: 201.99,
      image:
        'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Nike AIR',
      quantity: 0,
      price: 103.99,
      image:
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Nike AIR Brown Style',
      quantity: 0,
      price: 113.99,
      image:
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Nike Boat low',
      quantity: 0,
      price: 115.99,
      image:
        'https://images.unsplash.com/photo-1533681018184-68bd1d883b97?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Nike Blue and Teal',
      quantity: 0,
      price: 129.99,
      image:
        'https://images.unsplash.com/photo-1584735175097-719d848f8449?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((p) => {
    return slugify(p.name) === slug;
  });
}

export async function reserveProducts() {
  await sleep(250);
}

export async function addProductsToCart(products: Array<Product>) {
  await sleep(200);
  console.log('Products: ', products);
}

export async function payCart(products: Array<Product>) {
  await sleep(300);
  console.log('Payment Products: ', products);
}

export function calculateTotal(products: Array<Product>): number {
  let totalPrice = 0;
  for (const product of products) {
    totalPrice += product.quantity * product.price;
  }
  return totalPrice;
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
