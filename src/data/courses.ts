import { CourseEntity } from '../entities/course.entity';
import type { Course, CourseSection } from 'src/types/coure';

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
  length: 10,
}).map((_, i) => {
  const sectionNumber = i + 1;
  return {
    id: 'section-id-' + sectionNumber,
    title: 'セクション' + sectionNumber,
    lessons: Array.from({ length: 5 }).map((_, i) => {
      const lessonNumber = i + 1;
      return {
        id: `lesson-id-${sectionNumber}-${lessonNumber}`,
        title: `レッスン ${sectionNumber}-${lessonNumber}`,
        slug: `lesson-slug-${sectionNumber}-${lessonNumber}`,
        completionMinutes: 5 + i,

        // iframeを想定
        embeddedHTML: `<iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/JchsQRonmk8"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>`,
        description: `<h2>解説</h2><p>（レッスン ${sectionNumber}-${lessonNumber}）ここにテキストを解説を入れる。ここにテキストを解説を入れる。ここにテキストを解説を入れる。ここにテキストを解説を入れる。ここにテキストを解説を入れる。</p><br/><p>ここにテキストを解説を入れる。ここにテキストを解説を入れる。ここにテキストを解説を入れる。ここにテキストを解説を入れる。ここにテキストを解説を入れる。</p><br/><p>ここにテキストを解説を入れる。ここにテキストを解説を入れる。ここにテキストを解説を入れる。ここにテキストを解説を入れる。ここにテキストを解説を入れる。</p><br/><br/><h2>参考リンク</h2><ul><li><a href="https://tsuyopon.xyz" target="_blank">Web白熱教室</a></li><li><a href="https://tsuyopon.xyz" target="_blank">Web白熱教室</a></li><li><a href="https://tsuyopon.xyz" target="_blank">Web白熱教室</a></li></ul>`,
        canPreview: false,
      };
    }),
  };
});

export const DUMMY_SINGLE_COURSE: Course = {
  id: 'course-1',
  slug: 'course-1',
  title: '〇〇アプリを作ろう！',
  difficulty: '中級',
  learningOverview:
    '<ul><li>〇〇とは何か？</li><li>△△の使い方を覚える</li><li>□□を使いこなせるようになる</li></ul>',
  prerequisite:
    '<ul><li>基本的なコマンド操作</li><li>TypeScript</li><li>Next.js</li><li>Git操作</li><li>Vercel</li></ul>',
  description:
    '<p>ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。</p><br/><p>ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。</p><br/><p>ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。</p>',
  imageUrl: '',
  publishedAt: '2021-09-23',
  updatedAt: '2021-09-23',
  price: 0,
  isPublic: true,
  sections: DUMMY_COURSE_SECTIONS,
};
