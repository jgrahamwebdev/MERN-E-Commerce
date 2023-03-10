
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers } from '../actions/userActions';


const UserListScreen = () => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history('/login')
        }
    }, [dispatch, history])

    const deleteHandler = (id) => {
        console.log('deleted')
    }

    return (
        <>
         <h1>Users:</h1>
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        {/* <th></th> */}
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mail to: ${user.email}`}>{user.email}</a></td>
                            <td>
                                {user.isAdmin ? (<i class="fas fa-thumbs-up" style={{ color: '#2ecc71', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}></i>) : (<i className='fas fa-times' style={{ color: 'red', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}></i>)}
                            </td>
                            {/* <td>
                                <LinkContainer to={`/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
         )}
            
        </>
    )
}

export default UserListScreen
