import { Container, Row, Form } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { useState } from "react";

const Inicio = ({productos}) => {

  const [terminoBusqueda, setTerminoBusqueda] = useState('')

  const handleChange = (e) => {
    setTerminoBusqueda(e.target.value)
  }

  return (
    <section className="mainSection">
      <img
        className="banner"
        src="https://images.pexels.com/photos/13591748/pexels-photo-13591748.jpeg"
        alt="fondo cafe"
      />
      <Container className="mt-5">
        <h1 className="display-4">Nuestros Productos</h1>
        <hr />
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Buscar producto</Form.Label>
        <Form.Control type="text" placeholder="Ingresa nombre del producto" onChange={handleChange} value={terminoBusqueda}/>
      </Form.Group>
    </Form>
        <Row>
          {
            productos.map((producto)=> <CardProducto key={producto.id} producto={producto}></CardProducto>)
          }
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;
