async function obtenerUsuario() {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await respuesta.json();
  console.log(data);
}

obtenerUsuario();