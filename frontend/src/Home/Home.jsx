import React, {useEffect, useState} from 'react';
import axios from "axios";
import Product from "../Product/Product";

function Home() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        img: '',
        category: '',
        id: 0,
    })

    async function handleAdd(e) {
        e.preventDefault();
        try {
            newProduct.id = products.length + 1;
            const response = await fetch(`/api/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })
            const data = await response.json();
            // const response = await axios.post(`/api/products`, JSON.stringify(newProduct))
            setProducts(data)
            console.log(data)
        } catch (err) {
            console.log("ERROR WHILE POSTING",err)
        } finally {
            setNewProduct({
                name: '',
                img: '',
                category: '',
                id: 0,
            })
        }
    }

    useEffect(() => {
        const fetchProducts = () => {
            try {
                axios.get('/api/products')
                    .then((res) => setProducts(res.data))
            } catch (err) {
                console.log(err)
            }
        }
        fetchProducts();
    }, [products])

    return (
        <>
            <div>
                <form onSubmit={handleAdd}
                    className={"flex py-2 my-4"}
                >
                    <div className={"w-1/2 grid gap-4"}>
                        <div className={"flex gap-4"}>
                            <label>
                                Product Name :
                            </label>
                            <input className={"w-1/2 px-4 border rounded-md bg-gray-200"}
                                    value={newProduct.name}
                                   onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                   type="text" placeholder="New Product"
                            />
                        </div>
                        <div className={"flex gap-4"}>
                            <label>
                                Image Link :
                            </label>
                            <input className={"w-1/2 px-4 border rounded-md bg-gray-200"}
                                    value={newProduct.img}
                                   onChange={(e) => setNewProduct({...newProduct, img : e.target.value})}
                                   type="text" placeholder="Product Link"
                            />
                        </div>
                        <div className={"flex gap-4"}>
                            <label>
                                Product Category :
                            </label>
                            <input className={"w-1/2 px-4 border rounded-md bg-gray-200 "}
                                    value={newProduct.category}
                                   onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                   type="text" placeholder="Category"
                            />
                        </div>
                        <button className={"p-3 border rounded-md bg-gray-700 text-white w-2/3 hover:bg-gray-400 hover:scale-95 duration-150"}>Add</button>
                    </div>
                </form>
                <h1> Home Page </h1>
                <h1> No. of products : {products.length}</h1>
                <Product products={products}/>
            </div>
        </>
    );
}

export default Home;