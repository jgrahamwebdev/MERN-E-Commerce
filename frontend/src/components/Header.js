
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
    const dispatch = useDispatch()

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
                    {/* ms-auto pushes links to far right of container */}
                    <Nav className="ms-auto">

                            <LinkContainer to="/cart">
                                <Nav.Link >
                                    <i className='fas fa-shopping-cart'></i> Cart
                                </Nav.Link>
                            </LinkContainer>

                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) :
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className='fas fa-user'></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
    )
}

export default Header




