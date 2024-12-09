import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';
import { assets } from "../../assets/assets"

const MyOrders = () => {
    const [data, setData] = new useState([]);
    const { backendUrl, token, setLoader } = useContext(StoreContext);

    const fetchOrders = async () => {
        try {
            // setLoader(true); // Start loader
            const response = await axios.post(
                `${backendUrl}/api/order/userorders`,
                {},
                { headers: { token } }
            );
            setData(response.data.data);
            console.log(data);
            
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoader(false); // Stop loader in both success and failure
        }
    }

    useEffect(() => {
        if (token) fetchOrders();
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My orders</h2>
            <div className="container">
                {   
                    data.length === 0 ?  <div className='default-order-text'>You have Not Ordered Anything !</div> :
                    data.reverse().map((order, idx) => {
                        return (
                            <div key={idx} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
                                <p>
                                    {
                                        order.items.map((item, index) => {
                                            if (index === order.items.length - 1) return item.name + " * " + item.quantity
                                            else return item.name + " * " + item.quantity + ","
                                        })
                                    }
                                </p>
                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Check Status</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyOrders
