import React, { useEffect, useState } from 'react'

const Right = ({ item }) => {

  const [price, setPrice] = useState(0);

  useEffect(() => {
    totalAmouunt();
  }, [item])

  const totalAmouunt = () => {
    let newPrice = 0;
    item.map(e => {
      newPrice += e.price.cost;
    })
    setPrice(newPrice);
  }

  return (
    <div className='right_buy'>
      <img src='https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png' alt='banner' />
      <div className='cost_right'>
        <p>Your order is eligible for free delivery.</p>
        <br />
        <span style={{ color: '#565959' }}>Select this option at checkout. Details</span>
        <h3>Subtotal ({item.length} items): <strong style={{ fontWeight: 700 }}>₹{price} </strong></h3>
        <button className='rightbuy_btn'>Process to Buy</button>
        <div className='emi'>
          Emi available
        </div>
      </div>
    </div>
  )
}

export default Right