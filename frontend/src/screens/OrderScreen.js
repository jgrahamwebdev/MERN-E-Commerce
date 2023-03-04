
import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, deliverOrder } from '../actions/orderActions';


const OrderScreen = ({match}) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const { id } = useParams();

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    //Price Calculations:
    if(!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
        order.taxPrice = addDecimals(Number((0.15 * order.itemsPrice).toFixed(2)))
        order.totalPrice = (Number(order.itemsPrice) + Number(order.shippingPrice) + Number(order.taxPrice)).toFixed(2)
    }

    useEffect(() => {
        if(!userInfo) {
            history('/login')
        }
        if(!order || successDeliver || order._id !== id) {
            dispatch({ type: 'ORDER_DELIVER_RESET' })
            dispatch(getOrderDetails(id))
        }
    }, [dispatch, order, id, successDeliver])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
            <h1>Order: {order._id}</h1>
            <Row>
                {/* ORDER DETAILS */}
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping Details:</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mail to: ${order.user.email}`}> {order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address},{' '}
                                {order.shippingAddress.city},{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p> 
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method: </h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod} 
                            </p>      
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Your Order: </h2>
                            {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                       
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                {/* ORDER SUMMARY */}
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Order Summary: </h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            
                            {/* {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Order has not been delivered</Message>}  */}

                            {/* {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Order has not been paid</Message>}   */}

                           <PayPalScriptProvider options={{ "client-id": "Aa5UVt3sU5hkBc0Uj0OuNwwedkJMbOsJYFCCNXyssyWQYTWfE90QC_1t2EgtpMoOdAvWX4GLEkNrx89_" }}>
                                <PayPalButtons createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: `${order.totalPrice}`,
                                                },
                                            },
                                        ],
                                    });
                                }}                            
                                onApprove={async (data, actions) => {
                                    const details = await actions.order.capture();
                                    alert("Thank you " + `${order.user.name}` + " your order has been placed! 🎉 We will send an email with a copy of your invoice and tracking number when your order ships out.");
                                }}
                                />                             
                           </PayPalScriptProvider> 
                      
                            {loadingDeliver && <Loader />}   
                            {userInfo && userInfo.isAdmin && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button' variant='success' className='btn btn-block' onClick={deliverHandler}>
                                            Mark As Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>                          
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen


