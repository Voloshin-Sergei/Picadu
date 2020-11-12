let menuToggle = document.querySelector("#menu-toggle");
let menu = document.querySelector(".sidebar");

menuToggle.addEventListener("click", function (event) {
  event.preventDefault();
  menu.classList.toggle("visible");
});

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;
const loginElem = document.querySelector(".login");
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector(".login-email");
const passwordInput = document.querySelector(".login-password");
const loginSignup = document.querySelector(".login-signup");
const userElem = document.querySelector(".user");
const userNameElem = document.querySelector(".user-name");
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer =document.querySelector('.edit-container');
const editUserName = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');

const listUsers = [
  {
    id: "01",
    email: "admin@mail.ru",
    password: "admin",
    displayName: "Admin",
  },
  {
    id: "02",
    email: "user@mail.ru",
    password: "user",
    displayName: "User",
  },
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    if (!regExpValidEmail.test(email)) return alert("email не валиден");
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert("пользователь с такими данными не найден");
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    if (!regExpValidEmail.test(email)) return alert("email не валиден");
    if (!email.trim() || !password.trim()) {
      alert('Введите данные')
      return;
    }

    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.substring(0, email.indexOf('@'))};
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert("пользователь с таким email уже зарегистрирован");
    }
  },
  editUser(userName, userPhoto, handler) {
    if (userName) {
      this.user.displayName = userName;
    }
    if (userPhoto) {
      this.user.photo = userPhoto;
    }
    handler();
  },
  getUser(email) {
    return listUsers.find((item) => item.email === email);
  },
  authorizedUser(user) {
    this.user = user;
  },
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log("user:", user);

  if (user) {
    loginElem.style.display = "none";
    userElem.style.display = "";
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;
  } else {
    loginElem.style.display = "";
    userElem.style.display = "none";
  }
};

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
  loginForm.reset();
});

loginSignup.addEventListener("click", (event) => {
  event.preventDefault();
  setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
  loginForm.reset();
});

exitElem.addEventListener('click', event => {
  event.preventDefault();
  setUsers.logOut(toggleAuthDom);
});

editElem.addEventListener('click', event => {
  event.preventDefault();
  editContainer.classList.toggle('visible');
  editUserName.value = setUsers.user.displayName;
});

editContainer.addEventListener('submit', event => {
  event.preventDefault();
  setUsers.editUser(editUserName.value, editPhotoURL.value, toggleAuthDom);
  editContainer.classList.remove('visible');
});

toggleAuthDom();
