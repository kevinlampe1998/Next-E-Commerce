'use client';
import { useRouter } from "next/navigation";
import { Context } from "@/app/pages/set-product/context-provider";
import { useEffect, useState, useRef, useContext } from "react";
import './page.css';

const RegisterLogin = () => {
    const [ decision, setDecision ] = useState();
    const [ user, setUser ] = useState({
        role: '',
        firstName: '',
        lastName: '',
        birthDay: '',
        street: '',
        postalCode: '',
        city: '',
        email: '',
        password: ''
    });
    const [ message, setMessage ] = useState('');
    const messageRef = useRef();
    const { clientDB, dispatch } = useContext(Context);
    const router = useRouter();

    const post = async (event, route) => {
        event.preventDefault();

        const res = await fetch(`/api/users/${ route }`, {
            method: 'POST',
            body: JSON.stringify(user)
        });
        const data = await res.json();

        data.success && (messageRef.current.style.color = 'green');
        data.error && (messageRef.current.style.color = 'red');

        setMessage(data.message);

        data.success && dispatch({ type: 'set user', payload: data.user });

        data.success && router.push('/');
    };

    const select = (option) => {
        setDecision(option);
        setMessage('');
    };

    useEffect(() => {
        clientDB && clientDB.user && console.log('clientDB.user', clientDB.user);
    });

    return (
        <section className="register-login">
            <h2>Do you have an account or do you want to register?</h2>
            <div>
                <button onClick={() => select('register')} type="button">Register</button>
                <button onClick={() => select('login')} type="button">Login</button>
            </div>
            {
                decision === 'register' ?
                    <form onSubmit={(e) => post(e, 'register')}>
                        <div>
                            <button onClick={() => setUser(prev => ({ ...prev, role: 'buy' }))} type="button">Buy</button>
                            <button onClick={() => setUser(prev => ({ ...prev, role: 'sell' }))} type="button">Sell</button>
                        </div>

                        <label>First Name</label>
                        <input type="text" onChange={(e) => setUser(prev => ({ ...prev, firstName: e.target.value }))} value={user.firstName} required/>

                        <label>LastName</label>
                        <input type="text" onChange={(e) => setUser(prev => ({ ...prev, lastName: e.target.value }))} value={user.lastName} required/>

                        <label>Birthday</label>
                        <input type="date" onChange={(e) => setUser(prev => ({ ...prev, birthDay: e.target.value }))} value={user.birthDay} required/>

                        <label>Street</label>
                        <input type="text" onChange={(e) => setUser(prev => ({ ...prev, street: e.target.value }))} value={user.street} required/>

                        <label>Postal Code</label>
                        <input type="text" onChange={(e) => setUser(prev => ({ ...prev, postalCode: e.target.value }))} value={user.postalCode} required/>

                        <label>City</label>
                        <input type="text" onChange={(e) => setUser(prev => ({ ...prev, city: e.target.value }))} value={user.city} required/>

                        <label>Email</label>
                        <input type="email" onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))} value={user.email} required/>

                        <label>Password</label>
                        <input type="password" onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))} value={user.password} required/>

                        <div ref={messageRef}>{ message && message }</div>

                        <button type="submit">Submit</button>
                    </form>
                : decision === 'login' ?
                    <form onSubmit={(e) => post(e, 'login')}>
                        <label>Email</label>
                        <input type="email" onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))} value={user.email} required/>

                        <label>Password</label>
                        <input type="password" onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))} value={user.password} required/>

                        <div ref={messageRef}>{ message && message }</div>

                        <button type="submit">Submit</button>
                    </form>
                :
                    <></>                 
            }
        </section>
    );
};

export default RegisterLogin;