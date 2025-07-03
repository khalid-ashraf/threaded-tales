import ProductsList from "@/components/productsList";
import { stripe } from "@/lib/stripe";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

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
  const [searchInput, setSearchInput] = useState<string>("");

  const products = Route.useLoaderData();

  const filteredProducts = useMemo(() => {
    if (!searchInput || searchInput === "") return products;

    return products.filter((product) => product.name.toLowerCase().includes(searchInput));
  }, [products, searchInput]);

  return (
    <div className='mx-10 lg:mx-30 pb-8'>
      <h1 className='text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8'>
        All Products
      </h1>

      <form className='mb-6 flex justify-center'>
        <input
          type='text'
          placeholder='Search Products...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500'
        />
      </form>

      <ProductsList products={filteredProducts} />
    </div>
  );
}

