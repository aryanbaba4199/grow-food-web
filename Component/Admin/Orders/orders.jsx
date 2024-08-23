import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '@/Redux/actions/orderAction';
import OrderCard from './orderCard';

const Orders = () => {
    const [ordersData, setOrdersData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const { adminOrders } = useSelector(state => state.orders);

    console.log("Orders", adminOrders);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminOrders?.map(order => (
                    <OrderCard key={order._id} order={order} />
                ))}
            </div>
        </div>
    );
};

export default Orders;
