// 📌 Al cargar la página, recuperar y mostrar comentarios guardados
window.onload = function() {
  const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
  comentariosGuardados.forEach(c => mostrarComentario(c));
};

// 📌 Función para agregar un nuevo comentario
function agregarComentario() {
  const nombreInput = document.getElementById('nombre');
  const mensajeInput = document.getElementById('mensaje');
  const imagenInput = document.getElementById('imagen');

  const nombre = nombreInput.value.trim();
  const mensaje = mensajeInput.value.trim();

  if (!nombre || !mensaje) {
    alert('Por favor escribe tu nombre y comentario.');
    return;
  }

  const fechaTexto = new Date().toLocaleString();
  let imagenData = null;

  // 📎 Si se seleccionó una imagen, leerla
  if (imagenInput.files && imagenInput.files[0]) {
    const lector = new FileReader();
    lector.onload = function(e) {
      imagenData = e.target.result;
      guardarYMostrar({ nombre, mensaje, fechaTexto, imagenData });
    };
    lector.readAsDataURL(imagenInput.files[0]);
  } else {
    guardarYMostrar({ nombre, mensaje, fechaTexto, imagenData });
  }

  // ✨ Limpiar campos después de publicar
  nombreInput.value = '';
  mensajeInput.value = '';
  imagenInput.value = '';
}

// 📌 Guardar comentario en localStorage y mostrarlo
function guardarYMostrar(comentario) {
  const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
  comentariosGuardados.push(comentario);
  localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));
  mostrarComentario(comentario);
}

// 📌 Crear y mostrar visualmente el comentario
function mostrarComentario({ nombre, mensaje, fechaTexto, imagenData }) {
  const comentariosDiv = document.getElementById('comentarios');

  // 🧱 Contenedor del comentario
  const comentarioDiv = document.createElement('div');
  comentarioDiv.classList.add('comment');

  // 👤 Nombre
  const nombreEl = document.createElement('strong');
  nombreEl.textContent = nombre;

  // 💬 Mensaje
  const mensajeEl = document.createElement('p');
  mensajeEl.textContent = mensaje;

  // ⏰ Fecha
  const fechaEl = document.createElement('small');
  fechaEl.textContent = fechaTexto;

  comentarioDiv.appendChild(nombreEl);
  comentarioDiv.appendChild(mensajeEl);
  comentarioDiv.appendChild(fechaEl);

  // 🖼 Imagen opcional
  if (imagenData) {
    const img = document.createElement('img');
    img.src = imagenData;
    img.alt = 'Imagen del comentario';
    img.style.maxWidth = '150px';
    img.style.display = 'block';
    img.style.marginTop = '8px';
    comentarioDiv.appendChild(img);
  }

  comentariosDiv.appendChild(comentarioDiv);

  // 📜 Desplazarse hacia el último comentario
  comentarioDiv.scrollIntoView({ behavior: 'smooth' });
}

// 🧹 Borrar todos los comentarios
function borrarComentarios() {
  if (confirm("¿Estás seguro de borrar todos los comentarios?")) {
    localStorage.removeItem('comentarios');
    document.getElementById('comentarios').innerHTML = '<h3>Comentarios</h3>';
  }
}
