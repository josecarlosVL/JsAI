const https = require("https");

function obtenerUsuario(callback) {
  https.get("https://jsonplaceholder.typicode.com/users/1", (res) => {
    let data = "";

    // Se acumulan los chunks de datos
    res.on("data", (chunk) => {
      data += chunk;
    });

    // Cuando la respuesta termina:
    res.on("end", () => {
      try {
        const json = JSON.parse(data);
        callback(null, json);
      } catch (error) {
        callback("Error al parsear JSON");
      }
    });
  }).on("error", (err) => {
    callback("Error de red: " + err.message);
  });
}

// Uso:
obtenerUsuario((error, usuario) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Usuario obtenido:", usuario);
  }
});
