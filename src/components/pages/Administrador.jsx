import { Table, Button } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { leerProductosPaginados } from "../../helpers/queries.js";

const Administrador = () => {
  const [listaProductos, setListaProductos] = useState([]);

    const [page, setPage] = useState(1); //número de página actual
  const [limit] = useState(10); //cantidad de productos por página (fijo en 10).
  const [totalPages, setTotalPages] = useState(1); //total de páginas disponibles (lo devuelve el backend).

  useEffect(() => {
    obtenerproductos();
  }, [page]);

  const obtenerproductos = async () => {
    const respuesta = await leerProductosPaginados(page, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaProductos(datos.productos);
      setTotalPages(datos.totalPages)
    } else {
      console.info("Ocurrio un error al buscar los productos");
    }
  };

  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">Productos disponibles</h1>
        <div>
          <Link className="btn btn-primary" to={"/administrador/crear"}>
            <i className="bi bi-file-earmark-plus"></i>
          </Link>
        </div>
      </div>
      <hr />
      <Table responsive striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Cod</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>URL de Imagen</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {listaProductos.map((producto, indice) => (
            <ItemProducto
              key={producto._id}
              producto={producto}
              fila={(page - 1) * limit + indice + 1}
              setListaProductos={setListaProductos}
              limit={limit}
              page={page}
            ></ItemProducto>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center align-items-center my-3">
        <Button
          variant="secondary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </Button>
        <span className="mx-3">
          Página {page} de {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Siguiente
        </Button>
      </div>
    </section>
  );
};

export default Administrador;
