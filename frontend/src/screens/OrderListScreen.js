
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';


const OrderListScreen = () => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <>
         <h1>Orders:</h1>
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>DELIVERED</th>
                        <th>DETAILS</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice.toFixed(2)}</td>
                            <td>
                                {order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (<i className='fas fa-times' style={{ color: 'red', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}></i>)}
                            </td>  
                            <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='info' className='btn-sm'>
                                        <i class="fa-solid fa-eye" style={{ fontSize: '1rem'}}></i>
                                    </Button>
                                </LinkContainer>
                            </td>                        
                        </tr>
                    ))}
                </tbody>
            </Table>
         )}
            
        </>
    )
}

export default OrderListScreen







