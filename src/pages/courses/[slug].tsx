import React, { VFC } from 'react';
import Head from 'next/head';
import { CourseSections } from 'src/components/courses/AccordionList';
import { DUMMY_COURSE_SECTIONS } from 'src/data/courses';

const courseDataList = Array.from({ length: 3 }).map((_, i) => {
  const sectionNumber = i + 1;
  return {
    id: sectionNumber,
    title: 'セクション' + sectionNumber,
    lessons: Array.from({ length: 3 }).map((_, i) => {
      const id = `${sectionNumber}-${i + 1}`;
      return {
        id,
        title: 'レッスン' + id,
      };
    }),
  };
});

const CourseDetailPage = () => {
  return (
    <main className="lg:relative max-w-7xl mx-auto px-4 py-6">
      <Head>
        <title>詳細ページ</title>
      </Head>

      <CourseSections courseDataList={DUMMY_COURSE_SECTIONS} />
    </main>
  );
};

export default CourseDetailPage;
