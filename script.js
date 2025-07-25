let users;

fetch("users.json")
  .then(response => response.json())
  .then(data => users = data);

function checkPassword() {
  const inputPassword = document.getElementById('password').value;
  const errorElem = document.getElementById('error');
  const dashboard = document.getElementById('dashboard-container');
  const loginContainer = document.getElementById('login-container');

  const user = Object.keys(users).find(user => users[user] === inputPassword);

  if (user) {
    document.getElementById('welcome-msg').innerText = `Welcome, ${capitalize(user)}!`;
    loginContainer.classList.add('hidden');
    dashboard.classList.remove('hidden');
    dashboard.classList.add('flex');
  } else {
    errorElem.innerText = 'Wrong password dumbass.';
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
