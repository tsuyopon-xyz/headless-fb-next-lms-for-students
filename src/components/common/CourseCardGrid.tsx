import React from 'react';
import { CourseCard } from 'src/components/common/CourseCard';
import type { Course } from 'src/types/coure';

type Props = {
  courses: Course[];
};

export const CourseCardGrid: React.VFC<Props> = ({ courses }) => {
  return (
    <div className="max-w-lg mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:auto-cols-max md:max-w-none">
      {courses.map((course) => {
        return <CourseCard key={course.id} course={course} />;
      })}
    </div>
  );
};
