import React, {useEffect, useState} from 'react';
import axios from "axios";


function AddNewProduct() {
    const [product, setProduct] = useState({
        productName: '',
        price: '',
        image : '',
        category: '',
        description : '',
        stocks : [],
        productType: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const addtoMap = (e) => {
            sizes.set(e.target.name,e.target.value)
            let stock = [];
            for(let [size,qty] of sizes.entries()) {
                stock.push({'size': size, 'stock' : parseInt(qty)})
            }
            console.log(stock)
            setProduct({...product, stocks: stock})
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(product)
        try {
            const user = await JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('token');
            console.log(token);

            const response = await axios.post(`/api/products/admin/${user._id}/addproduct`,
                product, {
                    headers : {
                        "Content-Type" : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            setMessage('Product added successfully!');
            setProduct({
                productName: '',
                price: '',
                image : '',
                category: '',
                stocks : [],
                description : '',
                productType: '',
            });
            sizes = new Map()
        } catch (error) {
            console.log(error.message)
            console.log('Failed to post')
            setError(true);
            setMessage('Failed to add product.');
        }
    };

    const activateCategory = (e) => {
        e.preventDefault();
        setProduct({...product, category: e.target.value});
    }

    return (
        <>
            <div className="min-h-screen p-14 w-1/2">
                <h1 className="text-2xl font-bold mb-6">Admin - Add Product</h1>
                <form onSubmit={handleSubmit} className="bg-gray-100 p-6 px-14">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-black font-bold mb-2">
                            Product Name
                        </label>
                        <input
                            placeholder="Product Name" type="text" id="productName" name="productName"
                            value={product.productName} onChange={handleChange}
                            className="border-2 border-gray-400 p-2 w-1/2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="block text-black font-bold mb-2">
                            Select Category
                        </label>
                        {categoriesList.map((category) =>
                            <button key={category} onClick={activateCategory} name={category} value={category}
                                    className={`font-bold  border-2 px-4 p-2 m-2 hover:border-black hover:text-black
                                        ${product.category === category ? "bg-black text-white border-black hover:text-white hover:border-black"
                                        : "bg-white text-gray-400 border-gray-400"}
                                    `}
                            >
                                {category}
                            </button>
                        )}
                    </div>
                    {/*Size Charts here */}
                    <label htmlFor="category" className="block text-black font-bold mb-2">
                        Size and Stock
                    </label>
                    <div className="mx-8">
                        {product.category &&
                        (product.category === 'Shoes' || product.category === 'Sliders') ?
                            ShoeSizes.map((size) => (
                                <div key={size} className="flex justify-between my-2 w-1/2">
                                    <label className="py-2">{size}</label>
                                    <input
                                        type="number" placeholder="Stock" name={size} id={size}
                                        className="px-4 p-1 w-3/4 border-2 border-gray-400"
                                        value={sizes.get(size)}
                                        onChange={addtoMap}
                                    />
                                </div>
                            ))
                            : product.category === 'Tops' ?
                                ClothingSizes.map((size) => (
                                    <div key={size} className="flex justify-between my-2 w-1/2">
                                        <label className="py-2">{size}</label>
                                        <input
                                            type="number" placeholder="Stock" name={size} id={size}
                                            className="px-4 p-1 w-3/4 border-2 border-gray-400"
                                            value={sizes.get(size)}
                                            onChange={addtoMap}
                                        />
                                    </div>
                                ))
                                : Regular.map((size) => (
                                    <div key={size} className="flex justify-between my-2 w-1/2">
                                        <label className="py-2">{size}</label>
                                        <input
                                            type="number" placeholder="Stock" name={size} id={size}
                                            className="px-4 p-1 w-3/4 border-2 border-gray-400"
                                            value={sizes.get(size)}
                                            onChange={addtoMap}
                                        />
                                    </div>
                                ))
                        }
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-black font-bold mb-2">
                            Product Type
                        </label>
                        <input
                            placeholder="Product Type" type="text" id="productType" name="productType"
                            value={product.productType}
                            onChange={handleChange}
                            className="border-2 border-gray-400 p-2 w-1/2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="sizes" className="block text-gray-700 font-bold mb-2">
                            Image Link
                        </label>
                        <input
                            type="text" id="image" name="image" placeholder="Paste Image Link"
                            value={product.image}
                            onChange={handleChange}
                            className="border-2 border-gray-400 p-2 w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="sizes" className="block text-gray-700 font-bold mb-2">
                            Product Description
                        </label>
                        <input
                            type="text" id="description" name="description" placeholder="Product Description"
                            value={product.description}
                            onChange={handleChange}
                            className="border-2 border-gray-400 p-2 w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="sizes" className="block text-gray-700 font-bold mb-2">
                            Product Price
                        </label>
                        <input
                            type="text" id="price" name="price" placeholder="Product Price"
                            value={product.price}
                            onChange={handleChange}
                            className="border-2 border-gray-400 p-2 w-1/2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 w-full"
                    >
                        Add Product
                    </button>
                </form>

                {message && (
                    <div className={`mt-4 p-3 text-center font-medium 
                     ${error === true ? "text-red-700" : "text-green-900"}`}>
                        {message}
                    </div>
                )}
            </div>
        </>
    );
}

let sizes = new Map();
const ShoeSizes = ['UK 7','UK 8','UK 9','UK 10','UK 11','UK 12','UK 13'];
const ClothingSizes = ['XS','S','M','L','XL','XXL','XXXL']
const Regular = ['Regular']

const categoriesList = ["Shoes", "Sliders", "Tops", "Accessories", "Air Force", "Sports"]

export default AddNewProduct;