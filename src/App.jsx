import { Routes, BrowserRouter } from "react-router";
import Administrador from "./components/pages/Administrador";
import DetalleProducto from "./components/pages/DetalleProducto";
import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import CardProducto from "./components/pages/producto/CardProducto";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import { Route } from "react-router";
import Login from "./components/pages/Login";
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/ProtectorAdmin";
import { v4 as uuidv4 } from 'uuid';
uuidv4();

function App() {
  const usuarioLogueado = sessionStorage.getItem("userKey") || {};
  const productosLocalStorage = JSON.parse(localStorage.getItem('catalogoProductos')) || []
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);
  const [productos, setProductos] = useState(productosLocalStorage)

  useEffect(()=>{
    localStorage.setItem('catalogoProductos', JSON.stringify(productos))
  }, [productos])

  useEffect(()=>{
    sessionStorage.setItem('userKey', JSON.stringify(usuarioAdmin))
  }, [usuarioAdmin])

  const crearProducto = (productoNuevo) => {
    //agregar id unico al producto
    productoNuevo.id = uuidv4()
    //agregar el producto al state producto
    setProductos([...productos,productoNuevo])
    return true
  }

  const borrarProducto = (idProducto) => {
    const productosFiltrados = productos.filter((itemProducto)=> itemProducto.id!==idProducto)
    setProductos(productosFiltrados)
    return true
  }

  const buscarProducto = (idProducto) => {
    const productoBuscado = productos.find((itemProducto)=> itemProducto.id === idProducto)
    return productoBuscado
  }

  const editarProducto = (idProducto, productoActualizado) => {
    const productosEditados = productos.map((itemProducto)=>{
      if(itemProducto.id===idProducto){
        return {
          ...itemProducto, 
          ...productoActualizado
        }
      }else{
        return itemProducto
      }
    })

    console.log(productosEditados)
    setProductos(productosEditados)
    return true
  }

  return (
    <>
      <BrowserRouter>
        <Menu
          usuarioAdmin={usuarioAdmin}
          setUsuarioAdmin={setUsuarioAdmin}
        ></Menu>
        <main>
          <Routes>
            <Route path="/" element={<Inicio productos={productos}></Inicio>}></Route>
            <Route
              path="/detalle/:id"
              element={<DetalleProducto buscarProducto={buscarProducto}></DetalleProducto>}
            ></Route>
            <Route
              path="/login"
              element={<Login setUsuarioAdmin={setUsuarioAdmin}></Login>}
            ></Route>
            <Route
              path="/administrador"
              element={<ProtectorAdmin isAdmin={usuarioAdmin}></ProtectorAdmin>}
            >
              <Route index element={<Administrador setProductos={setProductos} productos={productos} borrarProducto={borrarProducto}></Administrador>}></Route>

              <Route
                path="crear"
                element={<FormularioProducto crearProducto={crearProducto} titulo={'Crear producto'}></FormularioProducto>}
              ></Route>
              <Route
                path="editar/:id"
                element={<FormularioProducto buscarProducto={buscarProducto} titulo={'Editar producto'} editarProducto={editarProducto}></FormularioProducto>}
              ></Route>
            </Route>
            <Route path="*" element={<Error404></Error404>}></Route>
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
