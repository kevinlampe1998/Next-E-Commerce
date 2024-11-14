'use client';
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context-provider";

const MyProducts = () => {
    const { clientDB, dispatch } = useContext(Context);
    const [ currentProducts, setCurrent ] = useState();

    const fetchProducts = async () => {
        const res = await fetch(`/api/products/my-products/${clientDB.user._id}/hello`);
        const data = await res.json();
        console.log(data);
    };

    useEffect(() => {
        clientDB.user?._id && fetchProducts();
    }, [clientDB.user]);

    return (
        <>MyProducts</>
    );
};

export default MyProducts;