import { memo } from "react";
import type Stripe from "stripe";
import ProductCard from "./productCard";

interface Props {
  products: Stripe.Product[];
}

const ProductsList = ({ products }: Props) => {
  return (
    <div>
      {products.length === 0 ? (
        <p>No products to display.</p>
      ) : (
        <ul>
          {products?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </ul>
      )}
    </div>
  );
};

ProductsList.displayName = "ProductsList";

export default ProductsList;
