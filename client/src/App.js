import './App.css';
import Navbar from './components/header/Navbar';
import Newnav from './components/newnavbar/Newnav';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import Signin from './components/signup_in/Signin';
import Signup from './components/signup_in/Signup';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Newnav />
      <Routes>
        <Route path='/' element={<Maincomp />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/getproductsone/:id' element={<Cart />} />
        <Route path='/buynow' element={<Buynow />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
