'use client';
import { useEffect, useState, useContext } from 'react';
import { Context } from '@/app/context-provider';

export default function ImageUploader() {
  const [ image, setImage ] = useState(null);
  const [ product, setProduct ] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    primary_image: null
  });
  const { clientDB, dispatch } = useContext(Context);

  useEffect(() => {
    !clientDB.user && (window.location.href = '/');
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    const response = await fetch('/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: image, fileName }),
    });
    const data = await response.json();
    console.log(data);
    return data.image._id;
  };

  const postProduct = async (event) => {
    event.preventDefault();

    const image_id = await handleUpload();
    console.log(image_id);

    setProduct(prev => ({ ...prev, primary_image: image_id }));

    const res = await fetch('/api/set-product', {
      method: 'POST', body: JSON.stringify(product)
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <form onSubmit={postProduct}>

      <label>Product Name</label>
      <input type='text' onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))} value={product.name} required/>

      <label>Image</label>
      <input type="file" onChange={handleFileChange} />

      <label>Description</label>
      <input type='text' onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))} value={product.description} required/>

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
      <input type='text' onChange={(e) => setProduct(prev => ({ ...prev, price: e.target.value }))} value={product.price} required/>

      <div></div>
      <div></div>

      <button type='submit'>Submit</button>

    </form>
  );
}
