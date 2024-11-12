'use client'
import { useReducer, createContext, useEffect } from "react";

export const Context = createContext();

export const reducer = (state, action) => {
    if (action.type === 'set user') {
        return { ...state, user: action.payload };
    }

    return state;
};

const ContextProvider = ({ children }) => {
    const [ clientDB, dispatch ] = useReducer( reducer, { user: undefined } );

    const onloadCheckCookie = async () => {
        const res = await fetch('/api/users/check-cookie');
        const data = await res.json();

        console.log(data);

        data.success && dispatch({ type: 'set user', payload: data.user });
    };

    useEffect(() => {
        console.log(clientDB);
    });

    useEffect(() => {
        !clientDB.user && onloadCheckCookie();
    }, []);

    return (
        <Context.Provider value={{ clientDB, dispatch }}>
            { children }
        </Context.Provider>
    );
};

export default ContextProvider;