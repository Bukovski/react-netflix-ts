export interface IFaqsJson {
  id: number;
  header: string;
  body: string;
}

export interface IJumboJson {
  id: number;
  title: string;
  subTitle: string;
  image: string;
  alt: string;
  direction: string;
}

export interface IFirebaseCollection {
  id: string,
  title: string,
  description: string,
  genre: string,
  maturity: string,
  slug: string,
}

export interface ISelectFilterData extends IFirebaseCollection {
  docId: string;
}

export interface ISlideRows {
  title: string;
  data: ISelectFilterData[];
}

export interface IProfileState {
  displayName: string,
  photoURL: string
}




