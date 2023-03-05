

import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
    const dispatch = useDispatch()

    // const cart = useSelector(state => state.cart)
    // const { cartItems } = cart

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
        {/*variant changes the font color to be opposite of dark making font light */}
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>   
                <LinkContainer to="/">
                    <Navbar.Brand>E-Commerce</Navbar.Brand>               
                </LinkContainer>  
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                   
                   <SearchBox  />
                    
                    {/* ms-auto pushes links to far right of container */}
                    <Nav className="ms-auto">
                                               
                            {/* <p className='cartCount'>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</p>       */}
                           
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'></i> Cart
                                </Nav.Link>
                            </LinkContainer>
                      
                            {userInfo ? (
                                <NavDropdown title={userInfo.isAdmin ? (`${userInfo.name}`) : (`Hi, ${userInfo.name}`)} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className='fas fa-user'></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>
                                            Users <i class="fa-solid fa-user"></i>
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>
                                            Products <i class="fa-solid fa-clipboard-list"></i>
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>
                                            Orders <i class="fas fa-shipping-fast"></i>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
    )
}

export default Header




