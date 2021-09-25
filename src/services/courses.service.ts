import { DUMMY_COURSES } from 'src/data/courses';
import type { Course, CourseLesson, CourseSection } from 'src/types/coure';
import { createClient } from 'src/libs/microcmsClient';

const client = createClient(
  process.env.MICROCMS_DOMAIN!,
  process.env.MICROCMS_API_KEY!
);

// MicroCMSのAPIのレスポンスタイプ（講座一覧）
type ResponseCourseListType = {
  contents: ResponseCourseType[];
  totalCount: number;
  offset: number;
  limit: number;
};

// MicroCMSのAPIのレスポンスタイプ（講座1件）
type ResponseCourseType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  slug: string;
  excerpt: string;
  difficulty: string[];
  learningOverview: string;
  prerequisite: string;
  description: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  price: number;
  isPublic: boolean;
  sections?: {
    fieldId: string;
    title: string;
    lessons: ResponseLessonType[];
  }[];
};

// MicroCMSのAPIのレスポンスタイプ（レッスン1件）
type ResponseLessonType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  slug: string;
  completionMinutes: number;
  embeddedHTML?: string | null;
  description?: string | null;
  canPreview: boolean;
};

// TODO: API経由のデータ取得に切り替えたら、ここのコメントを削除する
//
// 最終的にAPI経由で実データを取得するため
// はじめからasyncを使う想定で実装をすすめる。

export const fetchAllCourses = async (): Promise<Course[]> => {
  const response = await client.get<ResponseCourseListType>({
    endpoint: 'courses',
    queries: {
      // 全てのデータを一気に取得するために、limitに大きな値をセットしている
      // 1000件以上の講座データがある場合は、1001以上の値をセットする
      limit: 1000,
    },
  });
  const courses: Course[] = response.contents.map((content) => {
    const sections: CourseSection[] =
      content.sections?.map((section) => {
        return {
          title: section.title,
          lessons: section.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            slug: lesson.slug,
            completionMinutes: lesson.completionMinutes,

            // デフォルト値として `null` を設定している理由は、以下のエラーメッセージが表示されたため
            // SerializableError: Error serializing `.courses[0].sections[1].lessons[1].description` returned from `getStaticProps` in "/courses".
            // Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.
            embeddedHTML: lesson.embeddedHTML ?? null,
            description: lesson.description ?? null,
            canPreview: lesson.canPreview,
          })),
        };
      }) ?? [];

    const course: Course = {
      id: content.id,
      slug: content.slug,
      title: content.title,
      excerpt: content.excerpt,
      difficulty: content.difficulty[0],
      learningOverview: content.learningOverview,
      prerequisite: content.prerequisite,
      description: content.description,
      imageUrl: content.image.url,
      publishedAt: content.publishedAt,
      updatedAt: content.updatedAt,
      price: content.price,
      isPublic: content.isPublic,
      sections: sections,
    };

    return course;
  });

  return courses;
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
