// Datos iniciales
const initialRestaurants = [

//let restaurants = [
  {
    name: "La Parrilla de Juan",
    description: "Especialidad en carnes asadas.",
    address: "Calle 123 #45-67",
    image: "https://images.ctfassets.net/5pyzqupsur8u/66iV3zqR8Iy6G8q0isuA2U/0b2e0d14e165af1a6bb1d851471998ef/Parrilla_de_Juan.jpg?h=750&q=75&fm=jpg "
  },
  {
    name: "Pasta Mía",
    description: "Auténtica comida italiana.",
    address: "Avenida Italia #89",
    image: "https://tse3.mm.bing.net/th?id=OIP.ROeGUGSLijCvIwtoasuHfwHaEK&pid=Api&P=0&h=180"
  },
  {
    name: "El Sabor Mexicano",
    description: "Tacos y burritos tradicionales.",
    address: "Carrera México #456",
    image: "https://tse3.mm.bing.net/th?id=OIP.BA_PAx825MxZOtU7ts4oVwHaEo&pid=Api&P=0&h=180"
  },
  {
    name:"Cielo y Sazòn",
    description:"Comida típica de la región",
    address:"calle 123,Ciudad Barranquilla",
    image:"https://img.freepik.com/foto-gratis/vista-superior-mesa-llena-comida_23-2149209253.jpg?semt=ais_hybrid&w=740"
  }
];

// Cargar restaurantes del localStorage o iniciar con los fijos SILVIA
let userRestaurants = JSON.parse(localStorage.getItem('userRestaurants')) || [];
let restaurants = [...initialRestaurants, ...userRestaurants].filter(
  (rest, index, self) =>
    index === self.findIndex((r) => r.name === rest.name)
)


// Mostrar sección
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');

  if (sectionId === 'home') {
    renderRestaurants();
  }
}

// Renderizar restaurantes
function renderRestaurants() {
  const list = document.getElementById('restaurants-list');
  list.innerHTML = '';

  restaurants.forEach(resto => {
    //// Determina si el restaurante es de usuario (está en userRestaurants) 
    const isUser = userRestaurants.some(r => r.name === resto.name);
    list.innerHTML += `
      <div class="restaurant-card">
        <img src="${resto.image}" alt="${resto.name}">
        <h3>${resto.name}</h3>
        <p>${resto.description}</p>
        <p><strong>Dirección:</strong> ${resto.address}</p>
        ${isUser ? `<button onclick="deleteRestaurant('${resto.name}')">Eliminar</button>` : ''}

      </div>
    `;
  });
}

// Eliminar restaurante-
function deleteRestaurant(name) {
  // Filtra el restaurante a eliminar
  userRestaurants = userRestaurants.filter(r => r.name !== name);
  localStorage.setItem('userRestaurants', JSON.stringify(userRestaurants));
  // Actualiza la lista combinada y renderiza
  restaurants = [...initialRestaurants, ...userRestaurants].filter(
    (rest, index, self) =>
      index === self.findIndex(r => r.name === rest.name)
  );
  renderRestaurants();
}


// Buscar restaurante
function searchRestaurant() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = '';

  const results = restaurants.filter(r => r.name.toLowerCase().includes(input));

  if (results.length === 0) {
    resultsDiv.innerHTML = '<p>No se encontraron restaurantes.</p>';
    return;
  }

  results.forEach(r => {
    resultsDiv.innerHTML += `
      <div class="restaurant-card">
        <img src="${r.image}" alt="${r.name}">
        <h3>${r.name}</h3>
        <p>${r.description}</p>
        <p><strong>Dirección:</strong> ${r.address}</p>
      </div>
    `;
  });
}

// Agregar nuevo restaurante
function addRestaurant(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const address = document.getElementById('address').value;
  const image = document.getElementById('image').value;


  const newRestaurant = { name, description, address, image };

  //ESTO ES PARA QUE AGREGAR LOS RESTAURANTES NO DUPLIQUE LOS NOMBRES SILVIA
  userRestaurants.push(newRestaurant);
  localStorage.setItem('userRestaurants', JSON.stringify(userRestaurants));
  restaurants = [...initialRestaurants, ...userRestaurants]; // Actualizar la lista de restaurantes
  renderRestaurants(); // Volver a renderizar la lista de restaurantes

  document.getElementById('newRestaurantForm').reset();
  alert('¡Restaurante agregado exitosamente!');
  showSection('home');
  
  
  
}
// Renderizar al cargar
renderRestaurants();