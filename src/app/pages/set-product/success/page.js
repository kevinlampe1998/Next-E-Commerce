'use client';
import { useRouter } from "next/navigation";

const SetProductSuccess = () => {
    const router = useRouter();

    return (
        <main>
            <h4>You have successful saved your Product</h4>
            <button onClick={() => router.push('/pages/set-product')}>Set a product again</button>
            <button onClick={() => router.push('/')}>Back to Home</button>
        </main>
    );
};

export default SetProductSuccess;