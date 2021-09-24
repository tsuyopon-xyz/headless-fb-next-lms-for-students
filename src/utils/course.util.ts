import type { Course } from 'src/types/coure';

export const getNumbersOfSections = (course: Course): number | undefined => {
  return course.sections?.length;
};

export const getNumbersOfAllLessons = (course: Course): number | undefined => {
  if (!course.sections) return undefined;

  const allLessonsInFlat = course.sections
    .map((section) => section.lessons)
    .flat();

  return allLessonsInFlat.length;
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
