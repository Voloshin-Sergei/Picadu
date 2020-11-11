let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

menuToggle.addEventListener('click', function (event) {
  event.preventDefault();
  menu.classList.toggle('visible');
});

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const listUsers = [
  {
    id: '01',
    email: 'admin@mail.ru',
    password: 'admin',
    displayName: 'Admin'
  },
  {
    id: '02',
    email: 'user@mail.ru',
    password: 'user',
    displayName: 'User'
  }
];

const setUsers = {
  user: null,
  logIn(email, password) {
  
  },
  logOut() {
    console.log('выход')
  },
  signUp(email, password) {
    if (!this.getUser(email)) {
      listUsers.push({email, password, displayName: email})
    } else {
      alert ('пользователь с таким email уже зарегистрирован')
    }
  },
  getUser(email) {
    return listUsers.find(item => item.email === email)
  }
};

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  setUsers.logIn(emailInput.value, passwordInput.value);
});

loginSignup.addEventListener('click', event => {
  event.preventDefault();
  setUsers.signUp(emailInput.value, passwordInput.value);
});