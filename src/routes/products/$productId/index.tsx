import ProductDetail from "@/components/productDetail";
import { stripe } from "@/lib/stripe";
import { createFileRoute } from "@tanstack/react-router";

const fetchProduct = async (productId: string) => {
  const data = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });
  return data;
};

export const Route = createFileRoute("/products/$productId/")({
  component: RouteComponent,
  loader: ({ params }) => fetchProduct(params.productId),
});

function RouteComponent() {
  const productDetails = Route.useLoaderData();

  return <ProductDetail product={productDetails} />;
}
