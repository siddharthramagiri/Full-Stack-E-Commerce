import React, {useEffect, useState} from 'react';
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons'


function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProducts(response.data));
        console.log(products)
    }, []);


    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Popular Products </h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products && products.map((product) => (
                            <div key={product._id} className="group relative">
                                <img
                                    alt={product.image}
                                    src={product.image}
                                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                />
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={`/product/${product._id}`}>
                                                <span aria-hidden="true" className="absolute inset-0"/>
                                                {product.productName}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.productType}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">
                                        <FontAwesomeIcon icon={faIndianRupeeSign} /> {product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;