import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constants';
import { StudentService } from './student.services';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await StudentService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await StudentService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched successfully',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await StudentService.updateIntoDB(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await StudentService.deleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

const myCourses = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const filers = pick(req.query, ['courseId', 'academicSemesterId']);

  const result = await StudentService.myCourses(user.userId, filers);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student courses data fetch successfully',
    data: result,
  });
});

const getMyCourseSchedule = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const filers = pick(req.query, ['courseId', 'academicSemesterId']);

  const result = await StudentService.getMyCourseSchedule(user.userId, filers);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course schedule data fetch successfully',
    data: result,
  });
});

const myAcademicInfo = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await StudentService.myAcademicInfo(user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My academic info data fetch successfully',
    data: result,
  });
});

export const StudentController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  myCourses,
  getMyCourseSchedule,
  myAcademicInfo,
};
