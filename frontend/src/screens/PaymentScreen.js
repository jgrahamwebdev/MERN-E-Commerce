
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';


const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const history = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder')
    }

    if(!shippingAddress) {
        history('/shipping')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method:</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group>
                    <Form.Label>
                        <h5>Select Method:</h5>
                    </Form.Label>

                    <Col>
                        <Form.Check type='radio' label='PayPal' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                       
                        {/* <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check> */}
                    </Col>  

                    <Button type='submit' variant='primary' className='my-3'>
                        Continue &rarr;
                    </Button>

                </Form.Group>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen














