import { memo } from "react";
import type Stripe from "stripe";
import ProductCard from "./productCard";

interface Props {
  products: Stripe.Product[];
}

const ProductsList = ({ products }: Props) => {
  return (
    <>
      {products.length === 0 ? (
        <p>No products to display.</p>
      ) : (
        <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {products?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </ul>
      )}
    </>
  );
};

ProductsList.displayName = "ProductsList";

export default memo(ProductsList);
