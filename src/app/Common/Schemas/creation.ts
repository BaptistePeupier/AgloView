import {Annonce, Annonceur, Admin, User, Video, Playlist} from './classes';

export function CreateAnnonce(): Annonce {
  let newAnnonce: Annonce = {
    _id: null,
    nb_vues: 0,
    tags: [null],
    text: null,
    title: null,
    total_tmp_vue: [null],
    tmp_vue: null
  };

  newAnnonce.total_tmp_vue.pop();
  newAnnonce.tags.pop();

  return newAnnonce;
}

// Clone the value of the Annonce1 to the Annonce2
export function cloneAnnonceValues(annonce1: Annonce, annonce2: Annonce) {
  annonce2._id            = annonce1._id;
  annonce2.nb_vues        = annonce1.nb_vues;
  annonce2.text           = annonce1.text;
  annonce2.tags           = Object.assign([],annonce1.tags);
  annonce2.title          = annonce1.title;
  annonce2.total_tmp_vue  = Object.assign([], annonce1.total_tmp_vue);
}

export function createAnnonceur(): Annonceur {
  const newAnnonceur: Annonceur = {
    _id: null,
    annonces: [null],
    email: null,
    password: null,
    pseudo: null
  }

  newAnnonceur.annonces.pop();

  return newAnnonceur;
}

// Clone the value of the Annonceur1 to the Annonceur2
export function cloneAnnonceurValues(Annonceur1: Annonceur, Annonceur2: Annonceur) {
  Annonceur2._id      = Annonceur1._id;
  Annonceur2.email    = Annonceur1.email;
  Annonceur2.password = Annonceur1.password;
  Annonceur2.pseudo   = Annonceur1.pseudo;
  Annonceur2.annonces = Object.assign([],Annonceur2.annonces);
}

export function createAdmin(): Admin {
  return {
    _id: null,
    email: null,
    age: null,
    password: null,
    pseudo: null
  }
}

// Clone the value of the Admin1 to the Admin2
export function cloneAdminValues(admin1: Admin, admin2: Admin) {
  admin2._id      = admin1._id;
  admin2.email    = admin1.email;
  admin2.age      = admin1.age;
  admin2.password = admin1.password;
  admin2.pseudo   = admin1.pseudo;
}

export function createUser(): User {
  const newUser: User = {
    playlists: [null],
    tags: [null],
    _id: null,
    email: null,
    age: null,
    password: null,
    pseudo: null
  }

  newUser.playlists.pop();
  newUser.tags.pop()

  return newUser;
}

// Clone the value of the User1 to the User2
export function cloneUserValues(user1: User, user2: User) {
  user2._id       = user1._id;
  user2.email     = user1.email;
  user2.age       = user1.age;
  user2.password  = user1.password;
  user2.pseudo    = user1.pseudo;
  user2.tags      = Object.assign([],user1.tags);
  user2.playlists = Object.assign([],user1.playlists);
}
