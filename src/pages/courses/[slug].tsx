import React, { VFC } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { PlayIcon, ChevronRightIcon } from '@heroicons/react/solid';

const CourseDetailPage = () => {
  return (
    <main className="lg:relative max-w-7xl mx-auto px-4 py-6">
      <Head>
        <title>詳細ページ</title>
      </Head>

      <CourseSections />
    </main>
  );
};

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

const CourseSections: VFC = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {courseDataList.map((courseData) => (
          <li key={courseData.id}>
            <div className="px-4 py-4 flex items-center sm:px-6">
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="truncate">
                  <div className="flex text-sm">
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400 rotate-90"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-5 font-normal text-gray-500 truncate ml-4">
                      {courseData.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ul role="list" className="divide-y divide-gray-200">
              {courseData.lessons.map((lesson) => {
                return (
                  <li key={lesson.id} className="bg-gray-100">
                    <Link href="#">
                      <a>
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                            <div className="truncate">
                              <div className="flex text-sm">
                                <PlayIcon
                                  className="h-5 w-5 text-black"
                                  aria-hidden="true"
                                />
                                <p className="text-sm leading-5 font-normal text-indigo-600 truncate ml-4">
                                  {lesson.title}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetailPage;