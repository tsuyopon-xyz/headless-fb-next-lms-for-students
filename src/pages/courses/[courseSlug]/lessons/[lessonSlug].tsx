import React, { useContext } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { AccordionListForLesson } from 'src/components/pages/courses/lessons/AccordionListForLesson';
import { PageHeader } from 'src/components/common/PageHeader';
import { PageTextHTMLSection } from 'src/components/common/PageTextHTMLSection';
import { Button } from 'src/components/common/Button';
import {
  fetchCourseBySlug,
  fetchLessonBySlugs,
} from 'src/services/courses.service';
import { LessonPageProvider } from 'src/contexts/pages/LessonPageContext';
import type { Course, CourseLesson } from 'src/types/coure';

type QueryParams = {
  courseSlug: string;
  lessonSlug: string;
};

type PageProps = QueryParams & {
  course: Course;
  lesson: CourseLesson;
};

const LessonPage: React.VFC<PageProps> = ({
  course,
  lesson,
  courseSlug,
  lessonSlug,
}) => {
  return (
    <LessonPageProvider courseId={course.id}>
      <main className="lg:relative max-w-7xl mx-auto px-4 py-6">
        <Head>
          <title>{lesson.title}</title>
        </Head>
        <PageHeader title={lesson.title} />

        <div className="mt-8 w-full mx-auto grid grid-cols-1 gap-6 px-0 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="lg:col-start-1 lg:col-span-2">
            {lesson.embeddedHTML ? (
              <div
                className="aspect-w-16 aspect-h-9 mb-10"
                dangerouslySetInnerHTML={{ __html: lesson.embeddedHTML }}
              ></div>
            ) : null}

            <PageTextHTMLSection title="" html={lesson.description ?? ''} />
          </div>

          <div className="lg:relative lg:col-start-3 lg:col-span-1">
            <div className="lg:sticky lg:top-3">
              <AccordionListForLesson
                course={course}
                currentLessonSlug={lessonSlug}
              />
              <div className="mt-8 lg:mt-3">
                <Link href={`/courses/${course.slug}`}>
                  <a>
                    <Button size="full">講座詳細ページに移動する</Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LessonPageProvider>
  );
};

/**
 * レッスン詳細は将来的にログインユーザーしか見れないようにしたい。
 * そのため、レッスン詳細のデータを静的ファイルとして生成すると、
 * ログインしていない人でもHTMLのURLをしっていれば取得できてしまうため、
 * getServerSidePropsで「サーバーレンダリング」で対応する
 * @param context
 */
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { params } = context;
  const { courseSlug, lessonSlug } = params as QueryParams;

  const course = await fetchCourseBySlug(courseSlug);
  const lesson = await fetchLessonBySlugs(courseSlug, lessonSlug);

  if (!courseSlug || !lessonSlug || !course || !lesson) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      course,
      lesson,
      courseSlug,
      lessonSlug,
    },
  };
};

export default LessonPage;
