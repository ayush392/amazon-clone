import React, { useEffect, useState } from 'react'

const Subtotal = ({ item }) => {

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
    <div className='sub_item'>
      <h3>Subtotal ({item.length} items): <strong style={{ fontWeight: 700, color: '#111' }}>₹{price} </strong>
      </h3>
    </div>
  )
}

export default Subtotal