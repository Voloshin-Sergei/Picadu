let menuToggle = document.querySelector("#menu-toggle");
let menu = document.querySelector(".sidebar");

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
const postsWrapper = document.querySelector('.posts');

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

const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста',
      text:'Далеко-далеко за словесными горами в стране гласных, и согласных живут рыбные тексты. Дороге, снова парадигматическая возвращайся языком, дорогу строчка что сих коварных курсивных семантика, которое живет букв ручеек буквоград имеет свой буквенных над пустился. Своего рот ведущими семь залетают буквенных, дорогу своих пор рыбными взобравшись журчит. Свой однажды всеми пор выйти единственное языком большого мир, дал то алфавит предупредила щеке журчит продолжил сих путь заголовок своих использовало первую рыбного текстов.',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: {displayName: 'admin', photo: 'https://d2npcyp2owaeo8.cloudfront.net/images/resume/5a357edc509c6-people.png'},
      date: '12.11.2020, 20:00:00',
      like: 15,
      comments: 20
    },
    {
      title: 'Заголовок поста',
      text:'Далеко-далеко за словесными горами в стране гласных, и согласных живут рыбные тексты. Дороге, снова парадигматическая возвращайся языком, дорогу строчка что сих коварных курсивных семантика, которое живет букв ручеек буквоград имеет свой буквенных над пустился. Своего рот ведущими семь залетают буквенных, дорогу своих пор рыбными взобравшись журчит. Свой однажды всеми пор выйти единственное языком большого мир, дал то алфавит предупредила щеке журчит продолжил сих путь заголовок своих использовало первую рыбного текстов.',
      tags: ['свежее', 'новое', 'мое', 'случайность'],
      author: {displayName: 'user', photo: 'https://particulier-employeur.fr/wp-content/themes/fepem/img/general/avatar.png'},
      date: '11.11.2020, 15:30:00',
      like: 40,
      comments: 10
    },
    {
      title: 'Заголовок поста3',
      text:'Далеко-далеко за словесными горами в стране гласных, и согласных живут рыбные тексты. Дороге, снова парадигматическая возвращайся языком, дорогу строчка что сих коварных курсивных семантика, которое живет букв ручеек буквоград имеет свой буквенных над пустился. Своего рот ведущими семь залетают буквенных, дорогу своих пор рыбными взобравшись журчит. Свой однажды всеми пор выйти единственное языком большого мир, дал то алфавит предупредила щеке журчит продолжил сих путь заголовок своих использовало первую рыбного текстов.',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: {displayName: 'admin', photo: 'https://d2npcyp2owaeo8.cloudfront.net/images/resume/5a357edc509c6-people.png'},
      date: '12.11.2020, 20:00:00',
      like: 15,
      comments: 20
    },
  ]

  
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

const showAllPosts = () => {
  let postsHTML = '';
  setPosts.allPosts.forEach(({ title, text, tags, author, date, like, comments }) => {
    postsHTML += `
    <section class="post">
    <div class="post-body">
        <h2 class="post-title">${title}</h2>
        <p class="post-text">${text}</p>
        <div class="tags">${tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}
        </div>
    </div>
    <div class="post-footer">
        <div class="post-buttons">
            <button class="post-button likes">
                <svg width="19" height="20" class="icon icon-like">
                    <use xlink:href="img/icons.svg#like"></use>
                </svg>
                <span class="likes-counter">${like}</span>
            </button>
            <button class="post-button comments">
                <svg width="21" height="21" class="icon icon-comment">
                    <use xlink:href="img/icons.svg#comment"></use>
                </svg>
                <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
                <svg width="19" height="19" class="icon icon-save">
                    <use xlink:href="img/icons.svg#save"></use>
                </svg>
            </button>
            <button class="post-button share">
                <svg width="17" height="19" class="icon icon-share">
                    <use xlink:href="img/icons.svg#share"></use>
                </svg>
            </button>
        </div>
        <div class="post-author">
            <div class="author-about">
                <a href="#" class="author-username">${author.displayName}</a>
                <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpg"} alt="avatar" class="author-avatar"></a>
        </div>
    </div>
</section>
    `;
  })
  postsWrapper.innerHTML = postsHTML
};

const init = () => {

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

  menuToggle.addEventListener("click", function (event) {
    event.preventDefault();
    menu.classList.toggle("visible");
  });

  showAllPosts();
  toggleAuthDom();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})



