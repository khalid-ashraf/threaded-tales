import { loadStripe } from "@stripe/stripe-js";
import type { CartItem } from "@/store/cart-store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY!);

export async function checkoutClient(items: CartItem[]) {
  const stripe = await stripePromise;
  const lineItems = items.map((item) => ({
    price: String(item.price), // must be a Stripe Price ID (string)
    quantity: item.quantity,
  }));

  const { error } = await stripe!.redirectToCheckout({
    lineItems,
    mode: "payment",
    successUrl: window.location.origin + "/success",
    cancelUrl: window.location.origin + "/checkout",
  });

  if (error) throw new Error(error.message);
}
