const BASE_URL = 'https://fsa-puppy-bowl.herokuapp.com/api/2503-FTB-ET-WEB-AM/players';
const puppyListEl = document.getElementById('list');
const form = document.getElementById('form');
const detailsEl = document.getElementById('details');

// Fetch all puppies and render them
async function fetchAllPuppies() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  renderPuppyList(data.data.players);
}

// Show list of puppies
function renderPuppyList(puppies) {
  puppyListEl.innerHTML = '';
  puppies.forEach(puppy => {
    const div = document.createElement('div');
    div.className = 'puppy-card';
    div.innerHTML = `
      <h3>${puppy.name}</h3>
      <img src="${puppy.imageUrl}" alt="${puppy.name}">
      <p><strong>Breed:</strong> ${puppy.breed}</p>
      <p><strong>Status:</strong> ${puppy.status}</p>
      <button onclick="showDetails(${puppy.id})">View Details</button>
      <button onclick="deletePuppy(${puppy.id})">Delete</button>
    `;
    puppyListEl.appendChild(div);
  });
}

// Fetch one puppy by ID
async function showDetails(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data = await res.json();
  const puppy = data.data.player;

  detailsEl.innerHTML = `
    <h3>${puppy.name}</h3>
    <img src="${puppy.imageUrl}" alt="${puppy.name}" style="width: 200px">
    <p><strong>Breed:</strong> ${puppy.breed}</p>
    <p><strong>Status:</strong> ${puppy.status}</p>
    <p><strong>ID:</strong> ${puppy.id}</p>
  `;
}

// Submit form to add a new puppy
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const breed = document.getElementById('breed').value;
  const imageUrl = document.getElementById('imageUrl').value;
  const status = document.getElementById('status').value;

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, breed, imageUrl, status })
  });

  form.reset();
  fetchAllPuppies(); // refresh list
});

// Delete a puppy
async function deletePuppy(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  fetchAllPuppies();
}

fetchAllPuppies(); // Initial load
