import { Response } from 'express';

interface CustomResponse {
  ok: boolean;
  result?: {} | [];
  message?: string
}


export default class ApiResponse {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  success(data: object | string | undefined = undefined, statusCode = 200) {
    const response: CustomResponse = {
      ok: true
    } 

    if (typeof data === 'object'){
      response.result = data;
    } else if (data) {
      response.message = data
    }

    this.res.status(statusCode).json({
      ok: true,
      result: data
    });
  }
}