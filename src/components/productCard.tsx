import { Link } from "@tanstack/react-router";
import { memo } from "react";
import type Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
  product: Stripe.Product;
}

const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <li>
      <Link to='/products/$productName' params={{ productName: "1" }}>
        <Card>
          {product.images && product.images[0] && (
            <div className='relative w-full h-[400px] flex justify-center items-center aspect-[4/5]'>
              <img
                src={product.images[0]}
                alt={product.name}
                className='w-full h-full object-contain transition-opacity duration-500 ease-in-out'
              />
            </div>
          )}

          <CardHeader>
            <CardContent>
              <CardTitle className='font-bold text-lg text-gray-700'>{product.name}</CardTitle>
              <p>
                {price && price.unit_amount && (
                  <p className='text-xl text-gray-700'>${price.unit_amount / 100}</p>
                )}
              </p>
              <p className='text-sm text-gray-600'>{product.description}</p>
            </CardContent>
          </CardHeader>
        </Card>
      </Link>
    </li>
  );
};

ProductCard.displayName = "ProductCard";

export default memo(ProductCard);
