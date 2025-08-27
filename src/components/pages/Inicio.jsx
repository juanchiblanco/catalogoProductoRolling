import { Container, Row, Form } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { useEffect, useState } from "react";
import { leerProuctos } from "../../helpers/queries";

const Inicio = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerproductos();
  }, []);

  const obtenerproductos = async () => {
    const respuesta = await leerProuctos();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setProductos(datos);
    } else {
      console.info("Ocurrio un error al buscar los productos");
    }
  };

    const [terminoBusqueda, setTerminoBusqueda] = useState("");

    const handleChange = (e) => {
      setTerminoBusqueda(e.target.value);
    };

    const productosFiltrados = productos.filter((producto) =>
      producto.nombreProducto
        .toLowerCase()
        .includes(terminoBusqueda.toLowerCase())
    );

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
              <Form.Control
                type="text"
                placeholder="Ingresa nombre del producto"
                onChange={handleChange}
                value={terminoBusqueda}
              />
            </Form.Group>
          </Form>
          <Row>
            {productosFiltrados.map((producto) => (
              <CardProducto
                key={producto._id}
                producto={producto}
              ></CardProducto>
            ))}
          </Row>
        </Container>
      </section>
    );
  };

export default Inicio;
