import React, { useContext } from 'react'
import '../styles/components/Checkout.css'
import { Link } from 'react-router-dom'
import AppContext from '../context/AppContext'

const Checkout = () => {
    const { state, removeFromCart } = useContext(AppContext);
    const { cart } = state

    const handleRemove = product => {
        removeFromCart(product);
    }

    const handleSumTotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
        const sum = cart.reduce(reducer, 0)
        return sum;
    }
    return (
        <div className="Checkout">
            <div className="Checkout-content">
                <h3>
                   {cart.length>0?"Lista de pedidos":"Sin pedidos"}
                </h3>
                {cart.map(item => (
                    <div key={item.id} className="Checkout-item">
                        <div className="Checkout-element">
                            <h4>{item.title}</h4>
                            <span>{item.price}</span>
                            <button type="button" onClick={() => {
                                handleRemove(item)
                            }}>
                                <i className='fas fa-trash-alt' />
                                Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
            {cart.length > 0 && (
                <div className="Checkout-sidebar">
                    <h3>
                        {`Precio total: $ ${handleSumTotal()}`}
                    </h3>
                    <button type="button">
                        <Link to="/checkout/information">
                            Continuar pedido
                        </Link>
                    </button>
                </div>
            )}

        </div>
    );
}

export default Checkout;