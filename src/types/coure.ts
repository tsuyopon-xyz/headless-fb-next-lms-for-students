export type Course = {
  id: string;
  slug: string;
  title: string;
  difficulty: string; // 初級、中級、上級などのテキストをセットする想定
  prerequisite: string; // 前提
  description: string; // 講座の詳細
  imageUrl: string;
  publishedAt: string; // 表示用の公開日時
  updatedAt: string; // 表示用の更新日時
  price: number;
  isPublic: boolean; // true: 講座一覧に表示する, false: 講座一覧に表示しない
  section: CourseSection;
};

export type CourseSection = {
  id: string;
  title: string;
  lessons: CourseLesson[];
};

export type CourseLesson = {
  id: string;
  title: string;
  slug: string;
  completionMinutes: number; // 完了までにかかる時間（分換算）
  movieUrl?: string;
  description?: string;
  canPreview?: boolean; // true: 未登録の人も閲覧可能, false: 登録済みの人のみ閲覧可能
};
