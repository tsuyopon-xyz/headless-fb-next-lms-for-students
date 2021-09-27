import type { Course, CourseLesson } from 'src/types/coure';

export const getNumbersOfSections = (course: Course): number | undefined => {
  return course.sections?.length;
};

export const getAllLessonsInCourse = (
  course: Course
): CourseLesson[] | undefined => {
  if (!course.sections || course.sections.length === 0) {
    return;
  }

  const allLessonsInFlat = course.sections
    .map((section) => section.lessons)
    .flat();

  return allLessonsInFlat;
};

export const getNumbersOfAllLessons = (course: Course): number | undefined => {
  const allLessons = getAllLessonsInCourse(course);
  if (!allLessons) return undefined;

  return allLessons.length;
};

export const calculateTotalCompletionMinutes = (
  course: Course
): number | undefined => {
  if (!course.sections) return undefined;

  const allLessonsInFlat = course.sections
    .map((section) => section.lessons)
    .flat();

  return allLessonsInFlat.reduce((sum, currentLesson) => {
    return sum + currentLesson.completionMinutes;
  }, 0);
};
