import { Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { borrarProductoID, leerProductosPaginados } from "../../../helpers/queries.js";

const ItemProducto = ({ producto, fila, setListaProductos, limit, page }) => {
  const eliminarProducto = () => {
    Swal.fire({
      title: "Eliminar producto",
      text: "No puedes revertir este paso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#277a35ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarProductoID(producto._id);
        if (respuesta.status===200) {
          Swal.fire({
            title: "Producto eliminado!",
            text: `El producto ${producto.nombreProducto} fue eliminado correctamente`,
            icon: "success",
          });
          //Luego debo actualizar la tabla
          const respuestaProductos = await leerProductosPaginados(page, limit)
          const productosActualizados = await respuestaProductos.json()
          setListaProductos(productosActualizados.productos)
        } else {
          Swal.fire({
            title: "Producto eliminado!",
            text: `El producto ${producto.nombreProducto} no pudo ser eliminado`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      <td className="text-center">{fila}</td>
      <td>{producto.nombreProducto}</td>
      <td className="text-end">${producto.precio}</td>
      <td className="text-center">
        <img
          src={producto.imagen}
          className="img-thumbnail"
          alt={producto.nombreProducto}
        ></img>
      </td>
      <td>{producto.categoria}</td>
      <td className="text-center">
        <Link
          className="me-lg-2 btn btn-warning"
          to={`/administrador/editar/${producto._id}`}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Button variant="danger" onClick={eliminarProducto}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
