import React, {useState, useEffect, useContext} from 'react'
import { getOrdersByUser } from '@/Api'
import axios from 'axios'
import UserContext from '@/userContext'


const Orders = () => {
    const {user} = useContext(UserContext);

    const [orders, setOrders] = useState([]);
    const [orderIds, setOrdersIds] = useState([]);

    useEffect(()=>{
        if(user && user.user){
            getOrders(user.user._id);
        }
    }, [user])

    const getOrders = async(id)=>{
        try{
            const res = await axios.get(`${getOrdersByUser}/${id}`);
            if(res.status===200){
                setOrdersIds(res.data);
                const productIds = res.data.map(item=>item.productId);
                getProductsfromId(productIds);
            }
        }catch(e){
            console.error(e);
        }
    }

    const getProductsfromId = async(productIds)=>{
        try{
            const productDetails = await Promise.all(
                productIds.map(async (id)=>{
                    const res = await axios.get(`${getProductbyId}/${id}`);
                    return res.data
                })
            )
            setOrders(productDetails);
        }catch(e){
            console.error(e);
        }
    }

    console.log('products', orders, orderIds, orderIds);

   console.log('orders', orders); 

  return (
    <>
        <div>
            {orderIds.map((item, index)=>(
                <div key={index}>
                    <img
                        src={orders[index]?.image}
                        alt='Grow Food'
                    />
                </div>
            ))}
        </div>
    </>
  )
}

export default Orders;