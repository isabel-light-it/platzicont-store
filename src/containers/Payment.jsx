import React, { useContext } from 'react';
import '../styles/components/Payment.css'
import AppContext from '../context/AppContext';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const { state, addNewOrder } = useContext(AppContext)
    const { cart, buyer } = state
    const navigate = useNavigate();

    const paypalOptions = {
        'client-id': 'ATM1IZb-PGL9_AZAqnS7hUAC42bYdMrpyq50CfeLnvRHZGVMciqlShYJC93HHkKBXvauJ7_DrFqThJjL',
        currency: "USD",
        intent: "capture",
    }

    const handlePaymentSuccess = data => {
        const newOrder = {
            buyer,
            product: cart,
            payment: data
        }
        addNewOrder(newOrder);
        navigate('/checkout/success')
    }


    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect',
        label: 'paypal'
    }

    const handleSumTotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
        const sum = cart.reduce(reducer, 0)
        return sum;
    }
    handleSumTotal();

    return (
        <div>
            <div className="Payment-content">
                <h3>Resumen del pedido:</h3>
                {cart.map(item => (
                    <div key={item.id} className="Payment-item">
                        <div className="Payment-element">
                            <h4>{item.title}</h4>
                            <span>$ {item.price}</span>
                        </div>
                    </div>
                ))}

                <PayPalScriptProvider options={paypalOptions}>
                    <PayPalButtons
                        style={buttonStyles}
                        onError={(error) => console.log(error)}
                        createOrder={(data, actions) =>
                            actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: `${handleSumTotal()}`,
                                    },
                                },
                                ],
                            })
                                .then((orderId) => {
                                    return orderId;
                                })
                        }
                        onApprove={(data, actions) => {
                            return actions.order
                                .capture()
                                .then((data) => {
                                    handlePaymentSuccess(data);
                                })
                                .catch((error) => console.log(error));
                        }} />
                </PayPalScriptProvider>

                {/*  <PayPalButton
                    paypalOptions={paypalOptions}
                    buttonStyles={buttonStyles}
                    amount={handleSumTotal()}
                    onPaymentStart={() => console.log('Start Payment')}
                    onPaymentSuccess={data => console.log(data)}
                    onPaymentError={error => console.log(error)}
                /> */}

            </div>

        </div>
    );
}

export default Payment;