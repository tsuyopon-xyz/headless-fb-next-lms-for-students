import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AccordionList } from 'src/components/pages/courses/AccordionList';
import { PageHeader } from 'src/components/common/PageHeader';
import { PageTextHTMLSection } from 'src/components/common/PageTextHTMLSection';
import { Button } from 'src/components/common/Button';
import { DUMMY_SINGLE_COURSE } from 'src/data/courses';
import type { Course } from 'src/types/coure';

type Props = {
  course: Course;
};

const CourseDetailPage: React.VFC<Props> = ({
  course = DUMMY_SINGLE_COURSE,
}) => {
  const numberOfSections = course.sections.length;
  const numberOfLessons = course.sections.reduce((sum, section) => {
    return sum + section.lessons.length;
  }, 0);
  const totalCompletionMinutes = course.sections.reduce((sum, section) => {
    return (
      sum +
      section.lessons.reduce((_sum, lesson) => {
        return _sum + lesson.completionMinutes;
      }, 0)
    );
  }, 0);
  const briefNoteHTML = `
    <ul>
      <li>難易度: ${course.difficulty}</li>
      <li>セクションの数: ${numberOfSections}</li>
      <li>レッスンの数: ${numberOfLessons}</li>
      <li>合計時間: ${totalCompletionMinutes}分</li>
    </ul>
  `;
  const firstLessonSlug = course.sections[0].lessons[0].slug;

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
              html={`セクションの数: ${numberOfSections}・レッスンの数: ${numberOfLessons}・総時間: ${totalCompletionMinutes}分`}
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
  const firstLessonSlug = course.sections[0].lessons[0].slug;

  return (
    <>
      <SimpleCard>
        <PageTextHTMLSection
          title="このコースの内容"
          html={html}
          className="mt-11"
        />
      </SimpleCard>
      <div className="mt-8 lg:mt-3">
        <Link href={`/courses/${course.slug}/lessons/${firstLessonSlug}`}>
          <a>
            <Button size="full">このコースをはじめる</Button>
          </a>
        </Link>
      </div>
    </>
  );
};

export default CourseDetailPage;
