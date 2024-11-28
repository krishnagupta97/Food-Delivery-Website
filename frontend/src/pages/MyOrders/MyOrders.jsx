import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';
import { assets } from "../../assets/assets"

const MyOrders = () => {
    const [data, setData] = new useState([]);
    const { url, token } = useContext(StoreContext);

    const fectchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, {headers: { token }});
        setData(response.data.data);
    }

    useEffect(() => {
        if(token) fectchOrders();
    }, [token]); 

    return (
        <div className='my-orders'>
            <h2>My orders</h2>
            <div className="container">
                {
                    data.map((order, idx) => {
                        return (
                            <div key={idx} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
                                <p>
                                    {
                                        order.items.map((item, index) => {
                                            if(index === order.items.length - 1) return item.name + " * " + item.quantity
                                            else return item.name + " * " + item.quantity + ","
                                        })
                                    }
                                </p>
                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button onClick={fectchOrders}>Check Status</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyOrders
