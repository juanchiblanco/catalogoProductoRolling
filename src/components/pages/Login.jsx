import { Col, Form, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { login } from "../../helpers/queries.js";
import Swal from "sweetalert2";

const Login = ({ setUsuarioAdmin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navegacion = useNavigate();

  const inciarSesion = async (usuario) => {
    const respuesta = await login(usuario);

    if (respuesta.status === 200) {
      const datosUsuario = await respuesta.json();
      console.log(datosUsuario);
      //actualizar el state de usaurioAdmin
      //guardar token en sessionStorage
      Swal.fire({
        title: "Login existoso",
        text: `Bienvenido ${datosUsuario.nombreUsuario}`,
        icon: "success",
      })
      }else{
        Swal.fire({
        title: "Ocurrio un error",
        text: `Credenciales incorrectas`,
        icon: "error",
      })
      }

    console.log(usuario);
    if (
      usuario.email === import.meta.env.VITE_API_EMAIL &&
      usuario.password === import.meta.env.VITE_API_PASSWORD
    ) {
      //soy el administrador
      console.log("Soy el admin");
      setUsuarioAdmin(true);
      sessionStorage.setItem("userKey", true);
      navegacion("/administrador");
    } else {
      console.log("Email o password incorrectos");
    }
  };

  return (
    <section className="container">
      <h1 className="my-3 text-center">Login</h1>
      <Row xs={1} md={2}>
        <Col>
          <Form onSubmit={handleSubmit(inciarSesion)}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ej: juanperez@mail.com"
                {...register("email", {
                  required: "El email es un dato obligatorio",
                  pattern: {
                    value:
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    message:
                      "El email debe tener un formato valido, por ejempl juanperez@mail.com",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: "La contraseña es un dato obligatorio",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                    message:
                      "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>
            <Button variant="success" type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
        <Col>
          <img
            src="https://images.pexels.com/photos/885021/pexels-photo-885021.jpeg"
            alt="cafe"
            className="w-100"
          />
        </Col>
      </Row>
    </section>
  );
};

export default Login;
