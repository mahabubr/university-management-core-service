import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RoomServices } from './room.services';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Created!!',
    data: result,
  });
});

export const RoomController = {
  insertIntoDB,
};