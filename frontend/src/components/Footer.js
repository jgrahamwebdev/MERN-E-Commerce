
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; E-Commerce
                    </Col>
                </Row>
                <Row>
                    <h5 className="text-center">Visit us:</h5>
                    <Col className="text-center py-3">
                        <i class="fa-brands fa-twitter footerIcons"></i>
                        <i class="fa-brands fa-instagram footerIcons"></i>
                        <i class="fa-brands fa-pinterest footerIcons"></i>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
