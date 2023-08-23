import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CourseServices } from './course.services';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Created successfully',
    data: result,
  });
});

export const CourseController = {
  insertIntoDB,
};
