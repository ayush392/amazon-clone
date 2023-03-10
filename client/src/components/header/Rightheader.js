import React, { useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider'
// import { makeStyles } from '@material-ui/core';
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './rightheader.css';



// const usestyle = makeStyles({
//     component: {
//         marginTop: 10,
//         marginRight: "-50px",
//         width: "300px",
//         padding: 50,
//         height: "300px"
//     },
// })


// const Rightheader = ({ userlog, logclose }) => {
const Rightheader = ({ logclose }) => {

    const imgd = "/india.png"

    const { account, setAccount } = useContext(LoginContext)


    //  this is left drawer bt name is right header

    return (
        <div className="rightheader">
            <div className="right_nav">
                {
                    account ?
                        <Avatar className="avtar2"
                            title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}
                        </Avatar>
                        : <Avatar className="avtar"
                        />
                }
                {
                    account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""
                }
            </div>
            <div className="nav_btn" onClick={() => logclose()}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">Shop By Category</NavLink>

                <Divider style={{ width: "100%", marginLeft: '-20px' }} />

                <NavLink to="/" style={{ marginTop: 10 }}>Today's Deal</NavLink>
                {
                    account ? <NavLink to="/buynow">Your Order</NavLink> : <NavLink to="/login">Your Order</NavLink>
                }

                <Divider style={{ width: "100%", marginLeft: '-20px' }} />

                <div className="flag">
                    <NavLink to="" style={{ marginTop: 14 }}>Settings</NavLink>
                    <img src={imgd} alt="india flag" style={{ width: 35, marginLeft: 10 }} />
                </div>

                {/* {
                    account ?
                        <div className="flag">
                            <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                            <h3 onClick={() => userlog()} style={{ cursor: "pointer", fontWeight: 500 }}>Log Out</h3>
                        </div>
                        : <NavLink to="/login">Sign in</NavLink>
                } */}


            </div>
        </div>
    )
}

export default Rightheader