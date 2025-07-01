import ProductsList from "@/components/productsList";
import { stripe } from "@/lib/stripe";
import { createFileRoute } from "@tanstack/react-router";

const fetchProducts = async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  return await products.data;
};

export const Route = createFileRoute("/products/")({
  component: ProductsPage,
  loader: fetchProducts,
});

function ProductsPage() {
  const products = Route.useLoaderData();

  return (
    <div>
      <h1>All Products</h1>

      <div>
        <input type='text' placeholder='Search Products...' />
      </div>

      <ProductsList products={products} />
    </div>
  );
}

