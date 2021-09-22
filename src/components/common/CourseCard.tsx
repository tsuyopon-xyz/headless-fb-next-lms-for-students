import React from 'react';
import Link from 'next/link';
import { CourseEntity } from '../../entities/course.entity';

type Props = {
  course: CourseEntity;
};

export const CourseCard: React.VFC<Props> = ({ course }) => {
  return (
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
          <p className="text-sm font-medium text-indigo-600">
            <a href={course.category.href} className="hover:underline">
              {course.category.name}
            </a>
          </p>
          <Link href={`/courses/${course.courseId}`}>
            <a className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">
                {course.title}
              </p>
              <p className="mt-3 text-base text-gray-500">
                {course.description}
              </p>
            </a>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href={course.author.href}>
              <span className="sr-only">{course.author.name}</span>
              <img
                className="h-10 w-10 rounded-full"
                src={course.author.imageUrl}
                alt=""
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <a href={course.author.href} className="hover:underline">
                {course.author.name}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={course.datetime}>{course.date}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{course.readingTime} read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
