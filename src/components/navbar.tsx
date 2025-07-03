import { memo, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import NavLink from "./navLink";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className='sticky top-0 z-50 bg-white shadow mb-5'>
      <div className='container mx-auto flex items-center justify-between px-4 py-4'>
        <Link to='/' className='text-red-700 font-bold text-xl'>
          Threaded Tales
        </Link>

        <div className='hidden md:flex space-x-6'>
          <NavLink to='/'>Home</NavLink>

          <NavLink to='/products'>Products</NavLink>

          <NavLink to='/checkout'>Checkout</NavLink>
        </div>
        <div className='flex items-center space-x-4'>
          <Link
            to='/checkout'
            activeProps={{ className: "text-red-300" }}
            className='hover:text-red-300 relative'
          >
            <ShoppingCart className='h-6 w-6' strokeWidth={1} />
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant='ghost'
            className='md:hidden'
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav className='md:hidden bg-white shadow-md'>
          <ul className='flex flex-col p-4 space-y-2'>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/products'>Products</NavLink>
            </li>
            <li>
              <NavLink to='/checkout'>Checkout</NavLink>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};

export default memo(Navbar);
