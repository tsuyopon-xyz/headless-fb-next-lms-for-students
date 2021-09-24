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
      <a className="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div className="flex-shrink-0">
          <img
            className="h-48 w-full object-cover"
            src={course.imageUrl}
            alt=""
          />
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600">
              {course.difficulty}
            </p>

            <p className="text-xl font-semibold text-gray-900 mt-2">
              {course.title}
            </p>

            <p className="mt-3 text-base text-gray-500">{course.excerpt}</p>
          </div>
          <div className="mt-6 flex items-center">
            <p className="text-md font-medium text-gray-900">{bottomText}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};
