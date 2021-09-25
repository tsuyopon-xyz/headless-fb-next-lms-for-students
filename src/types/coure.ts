export type Course = {
  id: string;
  slug: string;
  title: string;
  excerpt: string; // WordPressの抜粋と同じように110文字までを想定（Card UIの説明文として使う）
  difficulty: string; // 初級、中級、上級などのテキストをセットする想定
  learningOverview: string; // 学習内容
  prerequisite: string; // 前提知識
  description: string; // 講座の詳細
  imageUrl: string;
  publishedAt: string; // 表示用の公開日時
  updatedAt: string; // 表示用の更新日時
  price: number;
  isPublic: boolean; // true: 講座一覧に表示する, false: 講座一覧に表示しない
  sections?: CourseSection[];
};

export type CourseSection = {
  title: string;
  lessons: CourseLesson[];
};

export type CourseLesson = {
  id: string;
  title: string;
  slug: string;
  completionMinutes: number; // 完了までにかかる時間（分換算）
  embeddedHTML?: string | null;
  description?: string | null;
  canPreview?: boolean; // true: 未登録の人も閲覧可能, false: 登録済みの人のみ閲覧可能
};

export type CompletedLessonMap = {
  [lessonId in string]: boolean | undefined;
};
