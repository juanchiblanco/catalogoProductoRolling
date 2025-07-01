import { Col, Form, Row, Button } from "react-bootstrap";

const Login = () => {
    return (
        <section className="container">
            <h1 className="my-3 text-center">Login</h1>
            <Row xs={1} md={2}>
                <Col>
                <Form>
                    <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ej: juanperez@mail.com" />
              <Form.Text className="text-danger">
                este es un mensaje de error
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
               <Form.Text className="text-danger">
                este es un mensaje de error
              </Form.Text>
            </Form.Group>
            <Button variant="success" type="submit">
              Enviar
            </Button>
                </Form>
                </Col>
                <Col>
                <img src="https://images.pexels.com/photos/885021/pexels-photo-885021.jpeg" alt="cafe" className="w-100"/>
                </Col>
            </Row>
        </section>
    );
};

export default Login;