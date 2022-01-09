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
