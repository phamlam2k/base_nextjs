declare interface IReponse<T> {
  status: number;
  message: string;
  data?: T;
}
