import React, { Component } from 'react'
import logo from "./shopping-cart.jpg"
import { CurrencyConsumer } from '../context/CurrencyContext'
import { CartConsumer } from '../context/CartContext'
import { Link } from 'react-router-dom'
import bag from "./shopping-bag.png"

export default class Header extends Component {

  render() {
    return (
      <CartConsumer>
        {cart=>{
          const {cartItems} = cart
          let quantity = 0
          cartItems.forEach(item => {
            const id = Object.keys(item)[0]
            quantity+=item[id].count
          });
          return(
          <CurrencyConsumer>
            {props=>{
              const {currencies, selectedCurrency, chooseCurrency} = props;
              const categoryTags = this.props.categories.map((category, index)=>{
                return <button className={category.name===this.props.selectedCategory ? "selected-category" : 'category'} onClick={(event)=>this.props.categorySelect(event)} value={category.name}key={index}>{category.name.toUpperCase()}</button>
              })
        
            const currencyOptions = currencies.map(currency=>(
                <option value={currency.label}>{currency.symbol} {currency.label}</option>
            ))

              return (
                <div className='header-box'> 
                    <Link to="/" className='link-text'>
                      <div className='category-box'>
                          {categoryTags}
                      </div>
                    </Link> 
                      <img className="bag-logo"src={bag} width="41" height="41"/>
                      <div className={`${cartItems.length>0?"cart-currency": "cart-currency-zero"}`}>
                          <select
                          className='currency-select'
                          value={selectedCurrency}
                          name="currencies"
                          onChange={(event)=>chooseCurrency(event)}> 
                          {currencyOptions}
                          </select>
                          <div className='mini-cart-button'>
                              {cartItems.length>0 ? <div className='item-quantity'>{quantity}</div> : <></>}
                              <button onClick={()=>this.props.toogleMiniCart()} className='cart-icon-button'>
                                  <img className='cart-icon' src={logo}/>
                              </button>
                          </div>
                      </div>
                </div>
            )}}
          </CurrencyConsumer>
        )}}
      </CartConsumer>
    )
  }
}
