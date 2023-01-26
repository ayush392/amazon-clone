import { Divider } from '@mui/material'
import React, { useContext } from 'react'
import './cart.css'
import { LoginContext } from '../context/ContextProvider'
import { useNavigate } from 'react-router-dom'



const Cart = () => {

    const history = useNavigate('');

    const {account, setAccount} = useContext(LoginContext)

    const addToCart = async (id) => {
        const checkres = await fetch(`http://localhost:4000/addcart/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inddata }),
            credentials: 'include'
        });
    
        const data1 = await checkres.json();
        // console.log(data1);
    
        if (checkres.status === 401 || !data1) {
            console.log('invalid user');
            alert('user invalid')
        } else {
            // alert('data added in your cart');
            history('/buynow')
            setAccount(data1);
        }
    }


    return (
        <div className='cart_section'>
            <div className='cart_container'>
                <div className='left_cart'>
                    <img src='https://rukminim1.flixcart.com/image/416/416/kl6wx3k0/sandwich-maker/8/r/d/sandwich-01-flipkart-smartbuy-original-imagydds4zthxt8z.jpeg?q=70' alt='product_img' />
                    <div className='cart_btn'>
                        <button className='cart_btn1' onClick={() => addToCart(inddata.id)}>Add to cart</button>
                        <button className='cart_btn2'>Buy Now</button>
                    </div>
                </div>

                <div className='right_cart'>
                    <h3>Sandwich Makers</h3>
                    <h4>Flipkart SmartBuy Sandwich 01 Grill (Black)</h4>
                    <Divider />
                    <p className='mrp'> M.R.P. : ₹1499</p>
                    <p>Deal of the day: <span style={{ color: '#B12704' }}> ₹625.00</span> </p>
                    <p>You save: <span style={{ color: '#B12704' }}> ₹570 (26%)</span> </p>

                    <div className='discount_box'>
                        <h5>Discount: <span style={{ color: '#111' }}>Extra 10% off</span> </h5>
                        <h4> Free Delivery <span style={{ color: '#111', fontWeight: 600 }}> Nov 2 - 5 </span> Details</h4>
                        <p>Fastest delivery: <span style={{ color: '#111', fontWeight: 600 }}> Tomorrow 11 AM </span></p>
                    </div>

                    <p className='description'> About the Item:
                        <span style={{ color: '#565959', fontSize: 14, fontWeight: 500, letterSpacing: '0.4px' }}>
                            This non-stick sandwich toaster .easy to use and very handy. Directly hold over flame to make tasty toasts and toasted sandwiches. Specially designed by keeping your needs in mind, the sandwich maker makes whatever youre doing simpler, smarter and better'
                        </span>

                    </p>
                </div>
            </div>
        </div>
    )
}

export default Cart