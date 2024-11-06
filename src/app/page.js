'use client';
import { useContext } from "react";
import { Context } from "./context-provider";

const Home = () => {
    const { clientDB, dispatch } = useContext(Context);

    return (
        <>
            Home
        </>
    );
};

export default Home;