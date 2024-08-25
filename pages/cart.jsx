import React, { useEffect, useState, useRef } from 'react'
import { getCartbyUser, getProductbyId, deleteCartItem } from '@/Api'
import axios from 'axios';
import ProductCard from '../Component/Home/productCard';
import Swal from 'sweetalert2';



const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [userCartIds, setUserCartIds] = useState([]);
    const [userId, setUserId] = useState('');
    const ref = useRef(false);

    

    useEffect(()=>{
        ref.current= true;
        if(typeof window !== 'undefined' && ref.current){
            const userid = localStorage?.getItem('user') ? localStorage.getItem('user') : '';
            if(userid!==''){
                const user = JSON.parse(userid);
                setUserId(user.user._id)
                getCartData(user.user._id,);
            }
        }
        return () => {
            ref.current = false;
        };
    }, []);

    const getCartData = async(id)=>{
        try{
            const res = await axios.get(`${getCartbyUser}/${id}`);
            if(res.status===200){
                const productIds = res.data.map(item=>item.productId);
                setUserCartIds(res.data);
                getProductsfromId(productIds);

            }
        }catch(e){
            console.error(e);
        }
    }
    console.log(cartData);


    const getProductsfromId = async(productIds)=>{
        try{
            const productDetails = await Promise.all(
                productIds.map(async (id)=>{
                    const res = await axios.get(`${getProductbyId}/${id}`);
                    return res.data
                })
            )
            setCartData(productDetails);
        }catch(e){
            console.error(e);
        }
    }


    const deleteCart = async(productId)=>{
        const cartId = userCartIds.find(item=>item.productId===productId);
        const id = cartId._id;
        try{
            const res = await axios.delete(`${deleteCartItem}/${id}`)
            if(res.status===200){
                Swal.fire({
                    title : 'Deleted', 
                    icon : 'success', 
                    text : res.data.message, 
                })
                getCartData(userId)
            }
        }catch(e){
            Swal.fire({
                title : 'Failed',
                icon : 'error',
                text : e.message
            })
            console.error(e);
        }
    }

  return (
    <>
        <div>
            {userId==='' &&
            <div className='w-[100vw] h-[100vh] flex justify-center items-center text-2xl font-semibold'>
            <p>Log in to see your cart details</p>
        </div>
            
            }
            {userId!=='' && cartData.length==0 &&
                <div className='w-[100vw] h-[100vh] flex justify-center items-center text-2xl font-semibold'>
                    <p>No Cart Item Found</p>
                </div>    
            }
            <div className='flex flex-row gap-4 flex-wrap justify-between mt-2 px-4'>
            {cartData.map((item, index)=>(
                <ProductCard item={item} key={index} isCart={true} deleteCartItem = {deleteCart}/>    
            ))}
            </div>
        </div>
    </>
  )
}

export default Cart