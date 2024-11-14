'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext, useRef } from 'react';
import { Context } from '@/app/context-provider';

export default function ImageUploader() {
  const [ image, setImage ] = useState(null);
  const [ product, setProduct ] = useState({
    seller: '',
    product_name: '',
    price: '0,00',
    category: '',
    description: '',
    primary_image: null
  });
  const { clientDB, dispatch } = useContext(Context);
  const router = useRouter();
  const imageMessage = useRef();
  const productMessage = useRef();
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    setProduct(prev => ({ ...prev, seller: clientDB.user._id }));

    const response = await fetch('/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: image }),
    });
    const data = await response.json();

    data.success && setProduct(prev => ({ ...prev, primary_image: data.image._id }));
    data.success && setImageUploadSuccess(true);

    data.error && (imageMessage.current.style.color = 'red');
    data.error && (imageMessage.current.innerHTML = data.message);

  };

  const postProduct = async () => {

    const res = await fetch('/api/products', {
      method: 'POST', body: JSON.stringify(product)
    });
    const data = await res.json();

    data.error && (productMessage.current.style.color = 'red');
    data.error && (productMessage.current.innerHTML = data.message);

    data.success && router.push('/pages/set-product/success');

    data.error && setImageUploadSuccess(false);

  };

  const correctPrice = (event) => {
    const value = event.target.value;

    if (value.length < 4) {
        const removedComma = value.replace(',', '');
        const unshiftZeroComma = removedComma.split('');
        unshiftZeroComma.unshift('0,');
        setProduct((prev) => ({ ...prev, price: unshiftZeroComma.join('')}));
        return;
    }

    
    const numbers = '0123456789'.split('');
    
    const lastChar = value.slice(-1);
    
    if (!numbers.includes(lastChar)) {
        setProduct((prev) => ({ ...prev, price: value.slice(0, -1)}));
        return;
    }
    
    const removedComma = value.replace(',', '');
    
    const numberArray = removedComma.split('');
    numberArray.splice(numberArray.length - 2, 0, ',');
    
    const under2Digits = numberArray.length < 4 && numberArray.join('').replace(',', '');
    
    const prePrice = under2Digits ? under2Digits : numberArray.join('');
    
    if (prePrice.length > 4 && prePrice[0] === '0') {
        const removedZero = prePrice.split('');
        removedZero.shift();
        setProduct((prev) => ({ ...prev, price: removedZero.join('')}));

        return;
    }

    setProduct(prev => ({ ...prev, price: prePrice }));
  };

  useEffect(() => {
    product.primary_image && imageUploadSuccess && postProduct();
  }, [imageUploadSuccess]);

  return (
    <form onSubmit={handleUpload}>

      <label>Product Name</label>
      <input type='text' onChange={(e) => setProduct(prev => ({ ...prev, product_name: e.target.value }))} value={product.product_name} required/>

      <label>Image</label>
      <input type="file" onChange={handleFileChange} />

      <label>Description</label>
      <textarea type='text' onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))} value={product.description} required>
      </textarea>

      <label>Category</label>
      <select id="category" name="category" value={product.category} onChange={(e) => setProduct((prev) => ({ ...prev, category: e.target.value }))} required>
                <option value='' disabled>Choose a category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="gifts">Gifts</option>
                <option value="beauty">Beauty</option>
                <option value="living">Living</option>
                <option value="cars">Cars</option>
                <option value="office">Office</option>
                <option value="jewelry">Jewelry</option>
                <option value="food">Food</option>
                <option value="health">Health</option>
                <option value="sports">Sports</option>
                <option value="books">Books</option>
                <option value="pet">Pet</option>
                <option value="other">Other</option>
      </select>

      <label>Price</label>
      <input type='text' onChange={correctPrice} value={product.price} required/>

      <div ref={imageMessage}></div>
      <div ref={productMessage}></div>

      <button type='submit'>Submit</button>

    </form>
  );
}
