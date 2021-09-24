import type { Course, CourseSection } from 'src/types/coure';

const createDummySingleCourse = (id: string): Course => {
  return {
    id: id,
    slug: 'course-slug-' + id,
    title: `〇〇アプリを作ろう！（${id}）`,
    difficulty: '中級',
    learningOverview:
      '<ul><li>〇〇とは何か？</li><li>△△の使い方を覚える</li><li>□□を使いこなせるようになる</li></ul>',
    prerequisite:
      '<ul><li>基本的なコマンド操作</li><li>TypeScript</li><li>Next.js</li><li>Git操作</li><li>Vercel</li></ul>',
    description:
      '<p>ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。</p><br/><p>ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。</p><br/><p>ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。</p>',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    publishedAt: '2021-09-23',
    updatedAt: '2021-09-23',
    price: 0,
    isPublic: true,
    sections: DUMMY_COURSE_SECTIONS,
  };
};

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

export const DUMMY_SINGLE_COURSE: Course =
  createDummySingleCourse('course-id-1');

export const DUMMY_COURSES: Course[] = Array.from({ length: 30 }).map(
  (_, i) => {
    const courseId = '' + (i + 1);

    return createDummySingleCourse(courseId);
  }
);
