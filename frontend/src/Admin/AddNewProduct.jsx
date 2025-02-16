import React, {useEffect, useState} from 'react';


function AddProduct() {
    const [product, setProduct] = useState({
        productName: '',
        price: '',
        image : '',
        category: '',
        stocks : {}, // =>
        description : '',
        productType: '',
    });
    const [message, setMessage] = useState('');

    let sizes = new Map();
    let [sizeShoes, setSizeShoes] = useState({'7': '', '8':'', '9':'', '10':'', '11':'', '12':'', '13':''})
    const [clothSizes, setClothSizes] = useState({ 'XS':'', 'S':'', 'M':'','L':'','XL':'','XXL':''})
    const [otherSize, setOtherSize] = useState('')

    useEffect(() => {
        sizes = new Map();
        Object.entries(sizeShoes).map(([size,qty]) => {
            if(qty) {
                sizes.set(size,qty);
            }
        })

        let stock = {};
        for (let [size, qty] of sizes.entries()) {
            stock = {...stock,[size] : qty}
        }
        console.log(stock)
        setProduct({...product, stocks : stock});
        // console.log(sizes)
    },[sizeShoes])

    useEffect(() => {
        sizes = new Map();
        Object.entries(clothSizes).map(([size,qty]) => {
            if(qty) {
                sizes.set(size,qty);
            }
        })
        let stock = {};
        for (let [size, qty] of sizes.entries()) {
            stock = {...stock,[size] : qty}
        }
        console.log(stock)
        setProduct({...product, stocks : stock});
        // console.log(sizes)
    }, [clothSizes]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sizes Stock")
        console.log(product)
        // try {
        //     // Replace with your API endpoint
        //     const response = await axios.post('/api/products', product);
        //     setMessage('Product added successfully!');
        //     setProduct({ name: '', category: '', type: '', sizes: '', price: '' , stocks: {}});
        // } catch (error) {
        //     setMessage('Failed to add product.');
        // }
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
                                    className={`font-bold border-gray-400 border-2 px-4 p-2 m-2 hover:border-black hover:text-black
                                        ${product.category === category ? "bg-black text-white border-black hover:text-white hover:border-black" : "bg-white text-gray-400"}
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
                            Object.entries(sizeShoes).map(([size, qty]) =>
                                <div key={size} className="flex justify-between my-2 w-1/2">
                                    <label className="py-2">{size}</label>
                                    <input
                                        type="number" placeholder="Stock"
                                        className="px-4 p-1 w-3/4 border-2 border-gray-400"
                                        value={qty} min={0}
                                        onChange={(e) =>
                                            setSizeShoes({...sizeShoes, [size]: e.currentTarget.value})
                                        }
                                    />
                                </div>
                            )
                            : product.category === 'Tops' ?
                                Object.entries(clothSizes).map(([size, qty]) =>
                                    <div key={size} className="flex justify-between my-2 w-1/2">
                                        <label className="py-2">{size}</label>
                                        <input
                                            type="number" placeholder="Stock"
                                            className="px-4 p-1 w-3/4 border-2 border-gray-400"
                                            value={qty} min={0}
                                            onChange={(e) =>
                                                setClothSizes({...clothSizes, [size]: e.currentTarget.value})
                                            }
                                        />
                                    </div>
                                )
                                : <div className="flex justify-between my-2">
                                    <label className="">Regular Size </label>
                                    <input
                                        type="number" placeholder="Stock"
                                        className="px-4 p-1 w-1/2 border-2 border-gray-400"
                                        value={otherSize}
                                        onChange={(e) => setOtherSize(e.currentTarget.value)}/>
                                </div>
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
                    <div className="mt-4 p-3 text-center font-medium">
                        {message}
                    </div>
                )}
            </div>
        </>
    );
}


const categoriesList = ["Shoes", "Sliders", "Tops", "Accessories", "Air Force", "Sports"]

export default AddProduct;