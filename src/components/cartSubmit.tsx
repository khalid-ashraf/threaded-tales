import { memo, useCallback, useState, type FormEvent } from "react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "./ui/button";
import { checkoutClient } from "@/lib/checkout";

const CartSubmit = () => {
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      await checkoutClient(items);
    } catch (error: any) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
      <Button variant='outline' onClick={clearCart} className='w-full mb-4'>
        Clear Cart
      </Button>

      <input type='hidden' name='items' value={JSON.stringify(items)} />
      <Button type='submit' variant='default' className='w-full'>
        {loading ? "Redirecting" : "Proceed to Payment"}
      </Button>
      {error && <p className='mt-2 text-red-600'>{error}</p>}
    </form>
  );
};

export default memo(CartSubmit);
