export interface ILoginResponse {
  user: User;
  token: string;
}

export interface User {
  displayPicture: DisplayPicture;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface DisplayPicture {
  imgurDeleteHash: string;
  imgurId: string;
  url: string;
}
