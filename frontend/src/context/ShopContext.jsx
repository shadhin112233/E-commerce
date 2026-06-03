import React, { createContext, useEffect, useState } from "react";
// import { data } from "react-router-dom";

export const ShopContext = createContext(null)

const getdefaultcart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart
}

const ShopContextProvider = (props) => {

    // আপনার লাইভ ব্যাকএন্ড ইউআরএল ভেরিয়েবলে রেখে দেওয়া হলো যাতে সহজে মেইনটেইন করা যায়
    const backend_url = "https://e-commerce-backendd-zm8m.onrender.com";

    const [all_product, setAll_Product] = useState([])
    const [cartItems, setcartItems] = useState(getdefaultcart());

    useEffect(()=>{
        // লোকালহোস্ট পরিবর্তন করে লাইভ URL দেওয়া হলো
        fetch(`${backend_url}/allproducts`)
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            // লোকালহোস্ট পরিবর্তন করে লাইভ URL দেওয়া হলো
            fetch(`${backend_url}/getcart`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:""
            }).then((response)=>response.json())
            .then((data)=>setcartItems(data))
        }
    },[])

    const addTocart = (itemId) => {
        setcartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + 1
        }))
        if(localStorage.getItem('auth-token')){
            // লোকালহোস্ট পরিবর্তন করে লাইভ URL দেওয়া হলো
            fetch(`${backend_url}/addtocart`,{
                method:'POST',
                headers:{
                    Accept:'Application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

    const removeFromCart = (itemId) => {
        setcartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }))
        if(localStorage.getItem('auth-token')){
            // লোকালহোস্ট পরিবর্তন করে লাইভ URL দেওয়া হলো
            fetch(`${backend_url}/removefromcart`,{
                method:'POST',
                headers:{
                    Accept:'Application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find(
                    (product) => product.id === Number(item)
                )

                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item]
                }
            }
        }

        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0)
            {
                totalItem +=cartItems[item]
            }
        }
        return totalItem
    }

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addTocart,
        removeFromCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider