import { Routes, BrowserRouter } from "react-router";
import Administrador from "./components/pages/Administrador";
import DetalleProducto from "./components/pages/DetalleProducto";
import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import { Route } from "react-router";
import Login from "./components/pages/Login";
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/ProtectorAdmin";

function App() {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("userKey")) || {};

  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);

  useEffect(() => {
    sessionStorage.setItem("userKey", JSON.stringify(usuarioAdmin));
  }, [usuarioAdmin]);

  return (
    <>
      <BrowserRouter>
        <Menu
          usuarioAdmin={usuarioAdmin}
          setUsuarioAdmin={setUsuarioAdmin}
        ></Menu>
        <main>
          <Routes>
            <Route path="/" element={<Inicio></Inicio>}></Route>
            <Route
              path="/detalle/:id"
              element={<DetalleProducto></DetalleProducto>}
            ></Route>
            <Route
              path="/login"
              element={<Login setUsuarioAdmin={setUsuarioAdmin}></Login>}
            ></Route>
            <Route
              path="/administrador"
              element={<ProtectorAdmin isAdmin={usuarioAdmin}></ProtectorAdmin>}
            >
              <Route index element={<Administrador></Administrador>}></Route>

              <Route
                path="crear"
                element={
                  <FormularioProducto
                    titulo={"Crear producto"}
                  ></FormularioProducto>
                }
              ></Route>
              <Route
                path="editar/:id"
                element={
                  <FormularioProducto
                    titulo={"Editar producto"}
                  ></FormularioProducto>
                }
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
