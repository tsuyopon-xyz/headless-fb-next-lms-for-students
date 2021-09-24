import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { AccordionList } from 'src/components/pages/courses/AccordionList';
import { PageHeader } from 'src/components/common/PageHeader';
import { PageTextHTMLSection } from 'src/components/common/PageTextHTMLSection';
import { Button } from 'src/components/common/Button';
import {
  getNumbersOfSections,
  getNumbersOfAllLessons,
  calculateTotalCompletionMinutes,
} from 'src/utils/course.util';
import {
  fetchAllCourses,
  fetchCourseBySlug,
} from 'src/services/courses.service';
import type { Course } from 'src/types/coure';

type QueryParams = {
  courseSlug: string;
};

type PageProps = QueryParams & {
  course: Course;
};

const CourseDetailPage: React.VFC<PageProps> = ({ course, courseSlug }) => {
  const numberOfSections = getNumbersOfSections(course);
  const numberOfAllLessons = getNumbersOfAllLessons(course);
  const totalCompletionMinutes = calculateTotalCompletionMinutes(course);
  const briefNoteHTML = `
    <ul>
      <li>難易度: ${course.difficulty}</li>
      <li>セクションの数: ${numberOfSections}個</li>
      <li>レッスンの数: ${numberOfAllLessons}個</li>
      <li>合計時間: ${totalCompletionMinutes}分</li>
    </ul>
  `;
  const firstLessonSlug = course.sections![0].lessons[0].slug;

  return (
    <main className="lg:relative max-w-7xl mx-auto px-4 py-6">
      <Head>
        <title>{course.title}</title>
      </Head>
      <PageHeader title={course.title} />

      {/* 画面サイズが小さい1カラムのときは、右サイドバーの要素を一番上に持ってくる */}
      <div className="block lg:hidden">
        <BriefNoteSection html={briefNoteHTML} course={course} />
      </div>
      <div className="mt-8 w-full mx-auto grid grid-cols-1 gap-6 px-0 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="lg:col-start-1 lg:col-span-2">
          <PageTextHTMLSection
            title="学習内容"
            html={course.learningOverview}
          />
          <div className="mt-8">
            <PageTextHTMLSection
              title="レッスン一覧"
              html={`セクションの数 ${numberOfSections}個・レッスンの数 ${numberOfAllLessons}個・合計時間 ${totalCompletionMinutes}分`}
            />
          </div>
          <AccordionList course={course} />
          <div className="mt-14">
            <PageTextHTMLSection
              title="前提知識"
              html={course.prerequisite}
              className="mt-11"
            />
          </div>
          <div className="mt-8">
            <PageTextHTMLSection
              title="講座の詳細"
              html={course.description}
              className="mt-11"
            />
          </div>
          <div className="mt-8">
            <Link href={`/courses/${course.slug}/lessons/${firstLessonSlug}`}>
              <a>
                <Button size="full">このコースをはじめる</Button>
              </a>
            </Link>
          </div>
        </div>

        {/* 画面サイズが小さい1カラムのときは、右サイドバーの要素を一番上に持ってくる */}
        <div className="lg:relative lg:col-start-3 lg:col-span-1">
          <div className="hidden lg:block lg:sticky lg:top-3">
            <BriefNoteSection html={briefNoteHTML} course={course} />
          </div>
        </div>
      </div>
    </main>
  );
};

const SimpleCard: React.FC = ({ children }) => {
  return <div className="rounded-lg shadow-lg border p-6 ">{children}</div>;
};

type BriefNoteProps = {
  html: string;
  course: Course;
};
const BriefNoteSection: React.VFC<BriefNoteProps> = ({ html, course }) => {
  const firstLessonSlug = course.sections![0].lessons[0].slug;

  return (
    <SimpleCard>
      <PageTextHTMLSection
        title="このコースの内容"
        html={html}
        className="mt-11"
      />
      <div className="mt-8 lg:mt-3">
        <Link href={`/courses/${course.slug}/lessons/${firstLessonSlug}`}>
          <a>
            <Button size="full">このコースをはじめる</Button>
          </a>
        </Link>
      </div>
    </SimpleCard>
  );
};

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const courses = await fetchAllCourses();
  const paths = courses.map((course) => {
    return {
      params: {
        courseSlug: course.slug,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const { params } = context;
  const { courseSlug } = params as QueryParams;
  const course = await fetchCourseBySlug(courseSlug);

  if (!course) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      courseSlug,
      course,
    },
  };
};

export default CourseDetailPage;
