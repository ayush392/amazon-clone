import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signinup.css'

const Signup = () => {
    const [uData, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    })

    const addData = (e) => {
        const { name, value } = e.target;
        setUdata(prev => { return { ...prev, [name]: value } })
    }

    const senddata = async (e) => {
        e.preventDefault();
        const { fname, email, mobile, password, cpassword } = uData;
        const res = await fetch("http://localhost:4000/register", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                 fname, email, mobile, password, cpassword 
            })
        });
        const data = await res.json();
        // console.log(data);

        if(res.status === 422 || !data){
            toast.warn("Please enter all data", {
                position: 'top-center'
            })
        }else{
            toast.success('data successfully added', {
                position: 'top-center',
                autoClose: 1200,
            })
            setUdata({...uData, fname: "", email: "", mobile: "", password: "", cpassword: ""})
        }
    }

    return (
        <section>
            <div className='sign_container'>

                <div className='sign_header'>
                    <img src='./blacklogoamazon.png' alt='amazon logo' />
                </div>

                <div className='sign_form'>
                    <form method='POST'>

                        <h1>Sign Up</h1>

                        <div className='form_data'>
                            <label htmlFor='fname'>Your name</label>
                            <input type='text' name='fname' id='fname'
                                value={uData.fname} onChange={addData} />
                        </div>
                        <div className='form_data'>
                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' id='email' value={uData.email} onChange={addData} />
                        </div>
                        <div className='form_data'>
                            <label htmlFor='number'>Mobile</label>
                            <input type='text' name='mobile' id='mobile' value={uData.mobile} onChange={addData} />
                        </div>
                        <div className='form_data'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' id='password' placeholder='At least 6 char' value={uData.password} onChange={addData} />
                        </div>
                        <div className='form_data'>
                            <label htmlFor='cpassword'>Confirm Password</label>
                            <input type='password' name='cpassword' id='cpassword' value={uData.cpassword} onChange={addData} />
                        </div>
                        <button className='signin_btn' onClick={senddata}>Continue</button>

                        <div className='signin_info'>
                            <p>Already have an account?</p>
                            <NavLink to='/login'>Signin</NavLink>
                        </div>

                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    )
}

export default Signup