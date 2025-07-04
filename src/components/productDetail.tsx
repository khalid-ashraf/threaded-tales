import { memo } from "react";
import type Stripe from "stripe";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className='container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 items-center'>
      {product.images && product.images[0] && (
        <div className='relative h-96 w-full lg:w-1/2 rounded-lg overflow-hidden'>
          <img
            src={product.images[0]}
            alt={product.name}
            className='transition duration-300 hover:opacity-90 object-fill'
          />
        </div>
      )}
      <div className='lg:w-1/2'>
        <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
        {product.description && <p className='text-gray-700 mb-4'>{product.description}</p>}
        {price && price.unit_amount && (
          <p className='text-lg font-semibold text-gray-900'>
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
        <div className='flex items-center space-x-4'>
          <Button
            variant='outline'
            className='disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed'
            onClick={() => removeItem(product.id)}
            disabled={quantity === 0}
          >
            -
          </Button>
          <span className='text-lg font-semibold'>{quantity}</span>
          <Button variant='outline' className='cursor-pointer' onClick={onAddItem}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDetail);
