// Importamos el módulo nativo de Node.js para hacer peticiones HTTPS
const https = require("https");

// Definimos una función que recibirá un callback cuando los datos estén listos
function obtenerUsuario(callback) {
  
  // Realizamos una petición GET a la URL deseada
  https.get("https://jsonplaceholder.typicode.com/users/1", (res) => {

    // Aquí guardaremos los fragmentos ("chunks") de la respuesta
    let data = "";

    // Cada vez que llega un fragmento de datos, se añade a la variable "data"
    res.on("data", (chunk) => {
      data += chunk;
    });

    // Cuando la respuesta ha terminado de llegar
    res.on("end", () => {
      try {
        // Convertimos el texto recibido en un objeto JSON
        const json = JSON.parse(data);

        // Llamamos al callback indicando que NO hay error (primer parámetro null)
        // y enviamos los datos parseados
        callback(null, json);
      } catch (error) {
        // Si falla el parseo, reportamos un error al callback
        callback("Error al parsear JSON");
      }
    });

  // Si la petición falla (problema de red, DNS, etc.)
  }).on("error", (err) => {
    callback("Error de red: " + err.message);
  });
}

// Llamamos a nuestra función y proporcionamos un callback
obtenerUsuario((error, usuario) => {
  
  // Si hubo error, lo mostramos
  if (error) {
    console.log("Error:", error);
  
  } else {
    // Si no hubo error, mostramos el usuario obtenido
    console.log("Usuario obtenido:", usuario);
  }
});
