export interface Annonce {
  tmp_vue: number;
  _id: number,
  title: string,
  text: string,
  tags: [string],
  nb_vues: number,
  total_tmp_vue: [number]
}

export interface Annonceur {
  _id: number,
  pseudo: string,
  email: string,
  password: string,
  annonces: [Annonce]
}

export interface Admin {
  _id: number,
  pseudo: string,
  age: number,
  email: string,
  password: string,
}

export interface User {
  _id: number,
  pseudo: string,
  age: number,
  email: string,
  password: string,
  tags: [{
    tag: string,
    occurrence: number
  }],
  playlists: [Playlist]
}

export interface Playlist {
  name: string,
  videos: [Video]
}

export interface Video {
  link: string
}
