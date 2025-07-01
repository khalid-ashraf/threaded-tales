import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productName/")({
  component: RouteComponent,
});
// Todo: Finish this product page which displays each product in detail and add 'add to cart' functionality.
function RouteComponent() {
  return <div>Hello "/products/$productName/"!</div>;
}
