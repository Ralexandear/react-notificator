import { Response } from 'express';

export default class apiResponse {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  success(data: any, statusCode = 200) {
    this.res.status(statusCode).json(data);
  }
}