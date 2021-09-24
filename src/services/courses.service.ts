import { DUMMY_COURSES } from 'src/data/courses';
import type { Course, CourseLesson, CourseSection } from 'src/types/coure';

// TODO: API経由のデータ取得に切り替えたら、ここのコメントを削除する
//
// 最終的にAPI経由で実データを取得するため
// はじめからasyncを使う想定で実装をすすめる。

export const fetchAllCourses = async (): Promise<Course[]> => {
  return DUMMY_COURSES;
};

export const fetchNew3Courses = async (): Promise<Course[]> => {
  return DUMMY_COURSES.slice(0, 3);
};

export const fetchCourseById = async (
  id: string
): Promise<Course | undefined> => {
  return DUMMY_COURSES.find((course) => course.id === id);
};

export const fetchCourseBySlug = async (
  slug: string
): Promise<Course | undefined> => {
  return DUMMY_COURSES.find((course) => course.slug === slug);
};

export const fetchLessonBySlugs = async (
  courseSlug: string,
  lessonSlug: string
): Promise<CourseLesson | undefined> => {
  const course = await fetchCourseBySlug(courseSlug);
  if (!course) return;

  const lessons = course.sections?.map((section) => section.lessons).flat();
  if (!lessons || lessons.length === 0) return;

  return lessons.find((lesson) => lesson.slug === lessonSlug);
};
