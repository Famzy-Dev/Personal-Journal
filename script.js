let users;
let currentUser;
let userData;

fetch("users.json")
  .then(response => response.json())
  .then(data => users = data);

function checkPassword() {
  const password = document.getElementById('password').value;
  const user = Object.keys(users).find(user => users[user] === password);

  if (user) {
    currentUser = user;
    document.getElementById('welcome-msg').innerText = `Welcome, ${capitalize(user)}!`;
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('dashboard-container').classList.remove('hidden');
    document.getElementById('dashboard-container').classList.add('flex');
    loadUserData();
  } else {
    document.getElementById('error').innerText = 'Wrong password dumbass.';
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function addNewSection() {
  const sectionName = prompt("Enter section name:");
  if (!sectionName) return;

  const icon = prompt("Enter emoji/icon for this section:");

  const newSection = {
    name: sectionName,
    icon: icon || "📌",
    subsections: []
  };

  userData.sections.push(newSection);
  saveUserData();
  renderSections();
}

function renderSections() {
  const container = document.getElementById('sections-container');
  container.innerHTML = "";

  userData.sections.forEach((section, index) => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'card w-64 bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 cursor-pointer transition-all duration-300';
    sectionDiv.innerHTML = `
      <div class="card-body text-center">
        <span class="text-4xl">${section.icon}</span>
        <h3 class="text-xl font-semibold">${section.name}</h3>
      </div>
    `;
    sectionDiv.onclick = () => manageSubsections(index);
    container.appendChild(sectionDiv);
  });
}

function manageSubsections(sectionIndex) {
  const subsectionName = prompt("Enter subsection name:");
  if (!subsectionName) return;

  userData.sections[sectionIndex].subsections.push(subsectionName);
  saveUserData();
  alert(`Added "${subsectionName}" to ${userData.sections[sectionIndex].name}`);
}

function saveUserData() {
  localStorage.setItem(`data_${currentUser}`, JSON.stringify(userData));
}

function loadUserData() {
  const storedData = localStorage.getItem(`data_${currentUser}`);
  userData = storedData ? JSON.parse(storedData) : { sections: [] };
  renderSections();
}
