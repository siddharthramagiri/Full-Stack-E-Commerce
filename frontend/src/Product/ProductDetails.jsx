import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetails() {
    const { id } = useParams(); // Fetch the product ID from the route
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null); // Track stock of the selected size

    useEffect(() => {
        axios.get(`/api/products/show/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to fetch product details.");
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }
        // Perform add-to-cart action, e.g., API call to add the product with selected size
        console.log(`Adding product ${product.productName} with size ${selectedSize} to cart.`);
    };

    const handleSizeSelect = (size, stock) => {
        setSelectedSize(size);
        setSelectedStock(stock); // Set stock information when a size is selected
    };

    if (loading) {
        return <div className="text-center p-4">Loading product details...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="bg-white min-h-screen p-6">
            {product && (
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <img
                            src={product.image}
                            alt={product.productName}
                            className="w-full shadow-md object-cover"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.productName}</h1>
                            <p className="text-gray-600 mb-2"><strong>Category:</strong> {product.category}</p>
                            <p className="text-gray-600 mb-2"><strong>Type:</strong> {product.productType}</p>
                            <p className="text-gray-600 mb-4"><strong>Description:</strong> {product.description}</p>
                            <p className="text-gray-800 text-2xl font-semibold mb-4">&#8377; {product.price}</p>
                            <div className="text-gray-600 mb-4">
                                <strong>Available Sizes and Stocks:</strong>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {product.stocks && product.stocks.length > 0 ? (
                                        product.stocks.map((stockItem) => (
                                            <button
                                                key={stockItem._id}
                                                onClick={() => handleSizeSelect(stockItem.size, stockItem.stock)}
                                                className={`font-bold border-2 p-2 m-2 hover:border-black 
                                                    ${selectedSize === stockItem.size ? "bg-black text-white border-black hover:text-white"
                                                    : "bg-white text-gray-400 border-gray-400 hover:text-black"}
                                                    ${stockItem.stock <= 0 ? "cursor-not-allowed bg-gray-300 border-gray-300 text-white hover:border-gray-300 hover:text-white" : ""}`}
                                                disabled={stockItem.stock <= 0}
                                            >
                                                {stockItem.size}<br/>
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-red-500">Out of stock</p>
                                    )}
                                </div>
                                {selectedSize && (
                                    <div className="mt-4 text-gray-800">
                                        {selectedStock} items in stock
                                    </div>
                                )}
                            </div>
                            {product.stocks && product.stocks.some(stock => stock.stock > 0) && (
                                <button
                                    className="bg-black text-white py-2 px-4 hover:bg-gray-600"
                                    onClick={handleAddToCart}
                                    disabled={!selectedSize}
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;
