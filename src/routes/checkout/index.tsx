import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout/")({
  component: CheckoutPage,
});

// Todo: Create a cart page with all the functionality.

function CheckoutPage() {
  return <div>Hello "/checkout/"!</div>;
}

