import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AccordionListForLesson } from 'src/components/pages/courses/lessons/AccordionListForLesson';
import { PageHeader } from 'src/components/common/PageHeader';
import { PageTextHTMLSection } from 'src/components/common/PageTextHTMLSection';
import { DUMMY_SINGLE_COURSE } from 'src/data/courses';
import type { Course } from 'src/types/coure';

type Props = {
  course: Course;
};

const LessonPage: React.VFC<Props> = ({ course = DUMMY_SINGLE_COURSE }) => {
  const router = useRouter();
  console.log(router);

  return (
    <main className="lg:relative max-w-7xl mx-auto px-4 py-6">
      <Head>
        <title>{course.title}</title>
      </Head>
      <PageHeader title={course.title} />

      <div className="mt-8 w-full mx-auto grid grid-cols-1 gap-6 px-0 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="lg:col-start-1 lg:col-span-2 h-screen">
          <PageTextHTMLSection title="補足" html={course.learningOverview} />
        </div>

        <div className="lg:relative lg:col-start-3 lg:col-span-1">
          <div className="lg:sticky lg:top-3">
            <AccordionListForLesson course={course} />
          </div>
        </div>
      </div>
    </main>
  );
};

const SimpleCard: React.FC = ({ children }) => {
  return <div className="rounded-lg shadow-lg border p-6 ">{children}</div>;
};

export default LessonPage;
