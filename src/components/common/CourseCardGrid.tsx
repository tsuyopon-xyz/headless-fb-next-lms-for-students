import React from 'react';
import { CourseCard } from '../../components/common/CourseCard';
import { CourseEntity } from '../../entities/course.entity';

type Props = {
  courses: CourseEntity[];
};

export const CourseCardGrid: React.VFC<Props> = ({ courses }) => {
  return (
    <div className="max-w-lg mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:max-w-none">
      {courses.map((course) => {
        return <CourseCard key={course.courseId} course={course} />;
      })}
    </div>
  );
};
