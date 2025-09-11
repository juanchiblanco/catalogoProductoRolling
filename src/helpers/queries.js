const urlProductos = import.meta.env.VITE_API_PRODUCTOS;
const urlUsuarios = import.meta.env.VITE_API_USUARIOS;
// get post delete put
console.log(urlProductos);

//get
export const leerProuctos = async () => {
  try {
    const respuesta = await fetch(urlProductos);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//get por id
export const obtenerProuctoID = async (id) => {
  try {
    const respuesta = await fetch(urlProductos + `/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//post
export const crearProducto = async (productoNuevo) => {
  try {
    const respuesta = await fetch(urlProductos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem('userKey')).token,
      },
      body: JSON.stringify(productoNuevo),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//put
export const editarProducto = async (productoEditado, id) => {
  try {
    const respuesta = await fetch(urlProductos + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem('userKey')).token,
      },
      body: JSON.stringify(productoEditado),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//delete
export const borrarProductoID = async (id) => {
  try {
    const respuesta = await fetch(urlProductos + `/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem('userKey')).token,
      },
    });

    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//login

export const login = async (usuario) => {
  try {
    const respuesta = await fetch(urlUsuarios + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};
