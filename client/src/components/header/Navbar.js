import React, { useContext, useEffect, useState } from 'react'
import './navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider'
import { Drawer, IconButton, List, ListItem, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Rightheader from './Rightheader'
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Navbar = () => {

    const history = useNavigate();

    const { account, setAccount } = useContext(LoginContext)

    const [dropen, setDropen] = useState(false);

    const [text, setText] = useState("");
    const [liopen, setLiopen] = useState(true);
    // import data using redux


    const getdetailvaliduser = async () => {
        const res = await fetch("http://localhost:4000/validuser", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await res.json();

        if (res.status !== 201) {
            console.log('error');
        } else {
            // console.log(data);
            setAccount(data);
        }

    };

    const handleopen = () => {
        setDropen(true)
    }

    const handledeclose = () => {
        setDropen(false);
    }

    const logoutuser = async () => {
        const res2 = await fetch("http://localhost:4000/logout", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data2 = await res2.json();

        if (res2.status !== 201) {
            console.log('error');
        } else {
            // console.log(data);
            // alert('logout');
            toast.success('Logout successful', {
                position: 'top-center',
                autoClose: 1200,
            })
            history('/');
            setAccount(false);
        }

    };

    const getText = (items)=>{
        setText(items);
        setLiopen(false);
    }

    useEffect(() => {
        getdetailvaliduser();
    }, []);

    return (
        <header>
            <nav>
                <div className='left'>

                    <IconButton className='hamburgur' onClick={handleopen}>
                        <MenuIcon style={{ color: '#fff' }} />
                    </IconButton>

                    <Drawer open={dropen} onClose={handledeclose}>
                        <Rightheader logclose={handledeclose} />
                    </Drawer>

                    <div className='navlogo'>
                        <NavLink to='/'>
                            <img src='./amazon_PNG25.png' alt='logo' />
                        </NavLink>
                    </div>
                    <div className='nav_searchbaar'>
                        <input type='text' name='' 
                        onChange={e => getText(e.target.value)}
                        placeholder='Search your products'
                        id='' />
                        <div className='search_icon'>
                            <SearchIcon id='search' />
                        </div>

                        {/* search filter */}
                        {
                            text &&
                            <List className='extrasearch' hidden={liopen}>

                            </List>
                        }

                    </div>
                </div>
                <div className='right'>
                    <div className='nav_btn'>
                        <NavLink to='/login'>Sign in</NavLink>
                    </div>
                    <div className='cart_btn'>

                        {
                            account
                                ? <NavLink to='/buynow'>
                                    <Badge badgeContent={account.carts.length} color='primary'>
                                        <ShoppingCartIcon id='icon' />
                                    </Badge>
                                </NavLink>
                                : <NavLink to='/login'>
                                    <Badge badgeContent={0} color='primary'>
                                        <ShoppingCartIcon id='icon' />
                                    </Badge>
                                </NavLink>
                        }
                        <ToastContainer />
                        <p> Cart </p>
                    </div>
                    {
                        account
                            ? <Avatar className='avtar2'>
                                {account.fname[0].toUpperCase()}
                            </Avatar>
                            : <Avatar className='avtar' />
                    }

                    <div className="menu_div">
                        <Menu
                            anchorEl={open}
                            open={Boolean(open)}
                            onClose={handleClose}
                            className={classes.component}
                        >
                            <MenuItem onClick={handleClose} style={{ margin: 10 }}>My account</MenuItem>
                            {
                                account ?
                                    <MenuItem onClick={logoutuser} style={{ margin: 10 }} >
                                        <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />
                                        Logout
                                    </MenuItem>
                                    : ""
                            }
                        </Menu>
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Navbar