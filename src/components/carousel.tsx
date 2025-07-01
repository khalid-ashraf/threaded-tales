import { memo, useEffect, useState } from "react";
import type Stripe from "stripe";

import { Card, CardContent, CardTitle } from "./ui/card";

interface Props {
  products: Stripe.Product[];
}

const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [products.length]);

  const currentProduct = products[current];

  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className='relative overflow-hidden rounded-lg shadow-md border-gray-300'>
      {currentProduct.images && currentProduct.images[0] && (
        <div className='relative w-full h-[400px] flex justify-center items-center aspect-[4/5]'>
          <img
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            className='w-full h-full object-contain transition-opacity duration-500 ease-in-out'
          />
        </div>
      )}

      <CardContent className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50'></CardContent>
      <div className='w-full flex flex-col justify-center items-center'>
        <CardTitle className='text-3xl font-bold mb-2'>{currentProduct.name}</CardTitle>
        {price && price.unit_amount && <p className='text-xl'>${price.unit_amount / 100}</p>}
      </div>
    </Card>
  );
};

Carousel.displayName = "Carousel";

export default memo(Carousel);
