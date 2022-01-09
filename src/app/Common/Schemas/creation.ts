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
  return {
    _id: null,
    annonces: [undefined],
    email: null,
    password: null,
    pseudo: null
  }
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

export function createUser(): User {
  return {
    playlists: [undefined],
    tags: [undefined],
    _id: null,
    email: null,
    age: null,
    password: null,
    pseudo: null
  }
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
