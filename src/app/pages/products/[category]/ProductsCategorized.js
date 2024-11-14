'use client';
import { useEffect, useState } from "react";


const ProductsCategorized = ({ category }) => {
    const [ products, setProducts ] = useState();

    const fetchProducts = async () => {
        const res = await fetch(`/api/products/${category}`);
        const data = await res.json();
        setProducts(data.products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <h2>{ category[0].toUpperCase() + category.slice(1, category.length) }</h2>

            {
                products?.map(product => (
                    <div className='product' key={product._id}>
                        <h4>{product.product_name}</h4>
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

export default ProductsCategorized;