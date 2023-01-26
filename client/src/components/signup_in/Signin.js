import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signinup.css'
import { LoginContext } from '../context/ContextProvider';

const Signin = () => {

    const [logdata, setData] = useState({ email: "", password: "" });
    // console.log(logdata)

    const { account, setAccount } = useContext(LoginContext)

    function addData(e) {
        const { name, value } = e.target;
        setData(prevValue => { return { ...prevValue, [name]: value } })
    }

    const senddata = async(e) =>{
        e.preventDefault();
        const { email, password } = logdata;
        const res = await fetch("http://localhost:4000/login", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                 email, password 
            })
        });
        const data = await res.json();
        // console.log(data);

        if(res.status === 400 || !data){
            toast.warn("invalid details", {
                position: 'top-center'
            })
        }else{
            setAccount(data)
            toast.success('user valid', {
                position: 'top-center',
                autoClose: 1200,
            })
            setData({...logdata, email: "", password: "" })
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

                        <h1>Sign In</h1>

                        <div className='form_data'>
                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' id='email'
                                value={logdata.email} onChange={addData}
                            />
                        </div>
                        <div className='form_data'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' id='password'
                                value={logdata.password} onChange={addData}
                                placeholder='At least 6 char' />
                        </div>
                        <button className='signin_btn' onClick={senddata}>Continue</button>
                    </form>
                </div>

                <div className='create_accountinfo'>
                    <p>New to Amazon?</p>
                    <button><NavLink to='/register'>Create Your amazon account</NavLink></button>
                </div>

            </div>
            <ToastContainer/>
        </section>
    )
}

export default Signin