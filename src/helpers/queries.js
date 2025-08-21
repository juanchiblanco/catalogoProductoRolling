const urlProductos = import.meta.env.VITE_API_PRODUCTOS
// get post delete put
console.log(urlProductos)

//get
export const leerProuctos = async () => {
    try {
        const respuesta = await fetch(urlProductos)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

//get por id
export const obtenerProuctoID = async (id) => {
    try {
        const respuesta = await fetch(urlProductos+`/${id}`)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

//post
export const crearProducto = async (productoNuevo) => {
    try {
        const respuesta = await fetch(urlProductos,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(productoNuevo)
        })
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

//put
export const editarProducto = async (productoEditado,id) => {
    try {
        const respuesta = await fetch(urlProductos+`/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(productoEditado)
        })
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

//delete
export const borrarProductoID = async (id) => {
    try {
        const respuesta = await fetch(urlProductos+`/${id}`,{
            method: 'DELETE'
        })
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}