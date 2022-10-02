import React, { Component } from 'react'
import { CartConsumer } from '../../context/CartContext'
import InCartItem from '../InCartItem';

export default class MiniCart extends Component {
  render() {
    return (
      <CartConsumer>
        {props=>{
          const {cartItems} = props;
          const cartItemElements = cartItems.map(cartItem=>{
            const id = Object.keys(cartItem)[0]
            return <InCartItem itemId={id} cartItem={cartItem[id]}/>
          })
          return (
            <div className='cart-box'>
              {cartItems.length>0 ? 
                <div>{cartItemElements}</div> : 
                <h1>Please add items to cart</h1>
              }
            </div>
          )
        }}
      </CartConsumer>
    )
  }
}
