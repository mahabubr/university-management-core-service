const getAvailableCourses = (
  offeredCourses: any,
  studentCompletedCourse: any,
  studentCurrentlyTakenCourses: any
) => {
  const completedCoursesId = studentCompletedCourse.map(
    (course: any) => course.courseId
  );

  const availableCoursesList = offeredCourses
    .filter(
      (offeredCourse: any) =>
        !completedCoursesId.includes(offeredCourse.courseId)
    )
    .filter((course: any) => {
      const preRequisites = course.course.preRequisite;
      if (preRequisites.length === 0) {
        return true;
      } else {
        const preRequisiteIds = preRequisites.map(
          (preRequisite: any) => preRequisite.preRequsiteId
        );
        console.log(preRequisiteIds);
      }
    });

  console.log({ availableCoursesList });
};

export const SemesterRegistrationUtils = {
  getAvailableCourses,
};
