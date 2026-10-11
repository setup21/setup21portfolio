import { Response } from 'express';

export const successresponse = (res: Response, data?: unknown): void => {
  res.status(200).json(data === undefined ? { result: true } : { result: true, data });
};

export const failresponse = (res: Response, statusCode: number, message: string): void => {
  res.status(statusCode).json({ result: false, data: message });
};
