import { createFileRoute, Link } from "@tanstack/react-router";
import { stripe } from "@/lib/stripe";

import Carousel from "@/components/carousel";
import { Button } from "@/components/ui/button";

const fetchProducts = async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return await products.data;
};

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: fetchProducts,
});

function HomePage() {
  const products = Route.useLoaderData();
  console.log(products);

  return (
    <div className='flex-grow container mx-auto px-4 py-8'>
      <section className='rounded-lg bg-neutral-100 py-8 sm:py-12'>
        <div className='mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2'>
          <div className='max-w-md space-y-4'>
            <h2 className='text-3xl tracking-tight md:text-4xl'>
              Welcome to <br />
              <span className='font-bold text-red-700'>Threaded Tales</span>
            </h2>

            <p className='text-neutral-600'>Discover the latest products at the best prices.</p>

            <Button
              asChild
              className='inline-flex items-center justify-center px-6 py-3 bg-black text-white'
            >
              <Link to='/products'>Browse Products</Link>
            </Button>
          </div>

          <img
            src={products[3].images[0]}
            alt='Banner Image'
            width={450}
            height={450}
            className='rounded'
          />
        </div>
      </section>

      <section className='py-8'>
        <Carousel products={products} />
      </section>
    </div>
  );
}

