import { CourseEntity } from '../entities/course.entity';
import type { CourseSection } from 'src/types/coure';

const DUMMY_TITLES = ['HTML', 'CSS', 'JavaScript', 'TypeScript'];

export const courses = Array.from({ length: 30 }).map((_, i) => {
  const courseId = 'id-' + (i + 1);
  const indexForDummyTitles = i % DUMMY_TITLES.length;

  return new CourseEntity({
    courseId,
    title: DUMMY_TITLES[indexForDummyTitles] + ' course ' + courseId,
    category: { name: 'Article', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '6 min',
    author: {
      name: 'Roel Aufderehar',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  });
});

export const DUMMY_COURSE_SECTIONS: CourseSection[] = Array.from({
  length: 5,
}).map((_, i) => {
  const sectionNumber = i + 1;
  return {
    id: 'section-id-' + sectionNumber,
    title: 'セクション' + sectionNumber,
    lessons: Array.from({ length: 10 }).map((_, i) => {
      const lessonNumber = i + 1;
      return {
        id: 'lesson-id-' + lessonNumber,
        title: 'レッスン' + lessonNumber,
        slug: 'lesson-' + lessonNumber,
        completionMinutes: 5 + i,
        movieUrl: 'https://youtu.be/JchsQRonmk8',
        description: 'ここに動画以外の説明文を記述する。',
        canPreview: false,
      };
    }),
  };
});
