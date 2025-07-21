import { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";

const DetalleProducto = ({buscarProducto}) => {

  const {id} = useParams()
  const [producto, setProducto] = useState({})

  useEffect(()=>{
    const productoBuscado = buscarProducto(id)
    setProducto(productoBuscado)
  }, [])
  
  
  return (
    <Container className="my-3 mainSection">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img
              variant="top"
              src={producto.imagen}
              alt={producto.nombreProducto}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="primary-font">{producto.nombreProducto}</Card.Title>
              <hr />
              <Card.Text>
                {producto.descripcion_amplia}
                <br />
                <br />
                <span className="primary-font fw-semibold ">
                  Categoria:
                </span>{producto.categoria}
                <br className="mb-3" />
                <span className="primary-font fw-semibold ">Precio: ${producto.precio}</span>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleProducto;
