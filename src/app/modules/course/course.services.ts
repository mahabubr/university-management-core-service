import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: any): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const result = await prisma.course.create({
    data: courseData,
  });

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    for (let i = 0; i < preRequisiteCourses.length; i++) {
      const createPrerequisite = await prisma.courseToPrerequsite.create({
        data: {
          courseId: result.id,
          preRequsiteId: preRequisiteCourses[i].courseId,
        },
      });
      console.log(createPrerequisite);
    }
  }

  return result;
};

export const CourseServices = {
  insertIntoDB,
};
