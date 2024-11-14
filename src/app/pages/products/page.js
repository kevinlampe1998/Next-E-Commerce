'use client';
import './page.css';
import { useRouter } from 'next/navigation';

const Products = () => {
    const router = useRouter();

    return (
        <section className="products">
            {/* <nav>
                <a onClick={() => router.push('/pages/products/electronics')}>Electronics</a>
                <a onClick={() => router.push('/pages/products/clothing')}>Clothing</a>
                <a onClick={() => router.push('/pages/products/gifts')}>Gifts</a>
                <a onClick={() => router.push('/pages/products/beauty')}>Beauty</a>
                <a onClick={() => router.push('/pages/products/living')}>Living</a>
                <a onClick={() => router.push('/pages/products/cars')}>Cars</a>
                <a onClick={() => router.push('/pages/products/office')}>Office</a>
                <a onClick={() => router.push('/pages/products/jewelry')}>Jewelry</a>
                <a onClick={() => router.push('/pages/products/food')}>Food</a>
                <a onClick={() => router.push('/pages/products/health')}>Health</a>
                <a onClick={() => router.push('/pages/products/sports')}>Sports</a>
                <a onClick={() => router.push('/pages/products/books')}>Books</a>
                <a onClick={() => router.push('/pages/products/pet')}>Pet</a>
            </nav> */}

            <nav>
                {
                    [ 'electronics', 'clothing', 'gifts', 'beauty', 'living', 'cars',
                        'office', 'jewelry', 'food', 'health', 'sports', 'books', 'pet',
                    ].map((e, index) => <a key={index} onClick={() => router.push(`/pages/products/${e}`)}>
                                            {e[0].toUpperCase() + e.slice(1, e.length)}
                                        </a>)
                }
            </nav>
        </section>
    );
};

export default Products;