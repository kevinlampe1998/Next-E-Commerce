'use client';
import Link from "next/link";
import { useContext } from "react";
import { Context } from "./pages/set-product/context-provider";
import './header.css';

const Header = () => {
    const { clientDB, dispatch } = useContext(Context);

    return (
      <header>
        <h1>E Commerce</h1>
        <nav>
          <Link href='/'>Home</Link>
          <Link href='/pages/products'>All Products</Link>
            
            {
              clientDB?.user?.role === 'sell' &&
              <Link href='/pages/set-product'>Set Product</Link>                
            }

            {
              !clientDB.user &&
              <Link href='/pages/register-login'>Register/Login</Link>
            }
          <Link href='/pages/profile'>{ clientDB?.user?.firstName }</Link>

        </nav>

      </header>
    );
};

export default Header;