import { Link } from "@tanstack/react-router";
import { memo } from "react";

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 shadow-gray-500'>
      <div className='container mx-auto flex items-center justify-between px-4 py-4'>
        <Link to='/' className='text-red-700 font-bold text-2xl'>
          Threaded Tales
        </Link>

        <div className='hidden md:flex space-x-6'>
          <Link to='/' className='hover:text-red-300'>
            Home
          </Link>
          <Link to='/products' className='hover:text-red-300'>
            Products
          </Link>
          <Link to='/checkout' className='hover:text-red-300'>
            Checkout
          </Link>
        </div>
      </div>

      <div className='flex items-center space-x-4'></div>
    </nav>
  );
};

Navbar.displayName = "Navbar";

export default memo(Navbar);
