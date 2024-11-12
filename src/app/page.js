'use client';
import { useContext, useEffect, useState } from "react";
import { Context } from "./pages/set-product/context-provider";

const Home = () => {
    const { clientDB, dispatch } = useContext(Context);

    const [ randomProducts, setRandomProducts ] = useState([]);

    const fetchRandomProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        console.log('data', data);
        console.log(data.products);
        setRandomProducts(data.products);
    };

    useEffect(() => {
        fetchRandomProducts();
    }, []);

    return (
        <>
            {
                randomProducts?.map(product => (
                    <div className='product' key={product._id}>
                        <h4>Name: {product.product_name}</h4>
                        <img src={product?.primary_image?.url} />
                        <div>
                            <span>Category: {product.category}</span>
                            <span>Description: {product.description}</span>
                            <span>Price: {product.price}</span>
                            <span>Seller: {product?.seller?.firstName} {product?.seller?.lastName}</span>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default Home;