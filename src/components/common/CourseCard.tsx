import React from 'react';
import Link from 'next/link';
import {
  getNumbersOfSections,
  getNumbersOfAllLessons,
  calculateTotalCompletionMinutes,
} from 'src/utils/course.util';
import type { Course } from 'src/types/coure';

type Props = {
  course: Course;
};

export const CourseCard: React.VFC<Props> = ({ course }) => {
  const numberOfAllLessons = getNumbersOfAllLessons(course);
  const totalCompletionTime = calculateTotalCompletionMinutes(course) + '分';

  const bottomText = `レッスン数 ${numberOfAllLessons}本・合計時間 ${totalCompletionTime}`;

  return (
    <Link href={`/courses/${course.slug}`}>
      <a className="block mt-2">
        <div
          key={course.title}
          className="flex flex-col rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex-shrink-0">
            <img
              className="h-48 w-full object-cover"
              src={course.imageUrl}
              alt=""
            />
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <p className="text-md font-medium text-indigo-600">
                {course.difficulty}
              </p>
              <p className="mt-2 text-xl font-semibold text-gray-900">
                {course.title}
              </p>
              <p className="mt-3 text-base text-gray-500">
                {course.description}
              </p>
            </div>
            <div className="mt-6 flex items-center">
              <div className="">
                <p className="text-md font-medium text-gray-500">
                  {bottomText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
