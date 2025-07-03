import { Link } from "@tanstack/react-router";
import { memo } from "react";
import type Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <li>
      <div className='block h-full'>
        <Card className='group hover:shadow-2xl transition flex justify-end duration-300 py-0 h-full border-gray-300 gap-0'>
          {product.images && product.images[0] && (
            <div className='relative h-60 w-full flex justify-center items-center overflow-clip'>
              <img
                src={product.images[0]}
                alt={product.name}
                className='group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg object-cover'
              />
            </div>
          )}

          <div className='p-4 flex flex-col justify-center'>
            <CardHeader>
              <CardTitle className='text-xl font-bold text-gray-800'>{product.name}</CardTitle>
            </CardHeader>

            <CardContent>
              {price && price.unit_amount && (
                <p className='text-lg font-semibold text-gray-900'>
                  ${(price.unit_amount / 100).toFixed(2)}
                </p>
              )}

              <Button asChild>
                <Link
                  to={`/products/$productId`}
                  params={{ productId: product.id }}
                  className='mt-4 w-full bg-black text-white pointer'
                >
                  View Details
                </Link>
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </li>
  );
};

ProductCard.displayName = "ProductCard";

export default memo(ProductCard);
