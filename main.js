// Comprobamos si hay datos de contacto previos
let contactos = JSON.parse(localStorage.getItem("contactos"));
if (contactos === null) {
  contactos = [];
}

// Crear contenido de la ventana modal
const modal = document.createElement("div");
modal.setAttribute("data-closable", "");
modal.classList.add("modal");
modal.style.display = "none";
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-button">&times;</span>
    <p>Por favor, completa el siguiente formulario para adoptar a este gato:</p>
    <form class="adoption-form">
      <label for="nombre">Nombre:</label><br>
      <input type="text" id="nombre" name="nombre"><br>
      <label for="apellido">Apellido:</label><br>
      <input type="text" id="apellido" name="apellido"><br>
      <label for="correo">Correo electrónico:</label><br>
      <input type="email" id="correo" name="correo"><br>
      <label for="telefono">Teléfono:</label><br>
      <input type="tel" id="telefono" name="telefono"><br>
      <label for="gato">Gato:</label><br>
      <input type="gato" id="gato" name="gato"><br>
      <input type="submit" value="Enviar">
    </form>
  </div>
`;

// Añadir ventana modal a la página
document.body.appendChild(modal);

const pintarGatos = () => {
  const contenedor = document.getElementById("gatos-contenedor");
  gatos.forEach(gato => {
    // Crear elemento div para el gato
    const div = document.createElement("div");
    div.classList.add("caja");
    div.innerHTML += `
        <div class="card-image">
          <img src=${gato.imagen} alt=${gato.nombre}>
          <p class="titulos">${gato.nombre}</p>
        </div>
        <div class="card-content">
          <p>Sexo: ${gato.sexo}</p>
          <p>Color: ${gato.color}</p>
          <p>Personalidad: ${gato.personalidad}</p>
          <p>Edad: ${gato.edad}</p>
          <p>Pasatiempo: ${gato.pasatiempo}</p>
        </div>
      `;

    // Crear botón de adopción
    const button = document.createElement("button");
    button.innerHTML = "Adoptar";
    button.classList.add("adopt-button");
    div.appendChild(button);

    // Añadir evento de clic al botón de adopción para mostrar la ventana modal
    button.addEventListener("click", () => {
      modal.style.display = "block";
    });

    // Añadir evento de clic al botón de cierre para ocultar la ventana modal
    const closeButton = modal.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Añadir elemento div del gato al contenedor
    contenedor.appendChild(div);
  });
};


const adoptionForm = modal.querySelector(".adoption-form");
adoptionForm.addEventListener("submit", event => {
  // Prevenir el envío del formulario
  event.preventDefault();

  // Obtener valores de los campos del formulario
  const nombre = adoptionForm.nombre.value;
  const apellido = adoptionForm.apellido.value;
  const correo = adoptionForm.correo.value;
  const telefono = adoptionForm.telefono.value;
  const gato = adoptionForm.gato.value;

  // Validar que el nombre y el apellido sean mayúsculas
  if (nombre !== nombre.toUpperCase()) {
    alert("El nombre debe estar en mayúsculas.");
    return;
  }
  if (apellido !== apellido.toUpperCase()) {
    alert("El apellido debe estar en mayúsculas.");
    return;
  }

  // Validar que el correo y el teléfono sean válidos
  if (!correo.includes("@")) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return;
  }
  if (telefono.length !== 10) {
    alert("Por favor, ingrese un teléfono válido de 10 dígitos.");
    return;
  }

  // Crear un nuevo objeto con la información de contacto
  const contactoNuevo = {
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    telefono: telefono,
    gato: gato,
  };

  contactos.push(contactoNuevo); // hacemos un push para tener todos los pretendientes anotados
  localStorage.setItem("contactos", JSON.stringify(contactos)); // almacenamos en memoria local los datos del formulario

  // Si todos los campos son válidos, mostrar mensaje de éxito y recargar la página
  alert("¡Gracias por adoptar a un gatito! En breve nos contactaremos para finalizar el proceso. Esperamos que tengan una buena vida juntos.");

  window.location.reload();
});

// Añadir evento de clic al botón de cierre para ocultar la ventana modal y mostrar el mensaje de incentivo
const closeButton = modal.querySelector(".close-button");
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
  alert("¡Esperamos que pronto puedas adoptar un gatito y darle un hogar!");
});

document.addEventListener('DOMContentLoaded', () => {
  pintarGatos();
});