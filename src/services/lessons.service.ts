// 最終的にはFirestoreなどのDBに完了フラグを持たせる予定（認証機能を実装した後）
// それまでは、localStorageで簡易的に完了フラグを持たせる
// 将来的に、外部DBに保存することを考慮して、async/awaitを使って実装する
import localForage from 'localforage';
import { CompletedLessonMap } from 'src/types/coure';

// TODO: ドメインが決まったら「xyz.tsuyopon」のところを差し替える（ドメインは逆さにする）
const REVERSE_DOMAIN_FOR_KEY = 'xyz.tsuyopon';
const BASE_KEY = `${REVERSE_DOMAIN_FOR_KEY}.lessons`;
const KEY_MAP = {
  COMPLETED_LESSON_KEY: `${BASE_KEY}:completed`,
};

export const completeLesson = async (
  courseId: string,
  lessonId: string
): Promise<CompletedLessonMap> => {
  const values = await getStoredCompletedLessonMapAndKey(courseId);
  if (!values) return {};

  const { storedCompletedLessonMap, key } = values;
  if (!lessonId) return storedCompletedLessonMap;

  storedCompletedLessonMap[lessonId] = true;
  localForage.setItem(key, storedCompletedLessonMap);

  return storedCompletedLessonMap;
};

export const returnLessonToIncomplete = async (
  courseId: string,
  lessonId: string
): Promise<CompletedLessonMap> => {
  const values = await getStoredCompletedLessonMapAndKey(courseId);
  if (!values) return {};

  const { storedCompletedLessonMap, key } = values;
  if (!lessonId) return storedCompletedLessonMap;

  storedCompletedLessonMap[lessonId] = false;
  localForage.setItem(key, storedCompletedLessonMap);

  return storedCompletedLessonMap;
};

export const getCompletedLessonMapByCourseId = async (
  courseId: string
): Promise<CompletedLessonMap> => {
  const values = await getStoredCompletedLessonMapAndKey(courseId);
  if (!values) return {};

  const { storedCompletedLessonMap } = values;

  return storedCompletedLessonMap;
};

// Private functions

const createStorageKey = (prefixKey: string, suffixKey: string) => {
  return `${prefixKey}:${suffixKey}`;
};

const createStorageKeyFromArray = (keys: string[]): string | undefined => {
  const copiedKeys = [...keys];
  const startKey = copiedKeys.shift();

  if (!startKey || copiedKeys.length === 0) return;

  return copiedKeys.reduce((combinedKey, currentKey) => {
    return createStorageKey(combinedKey, currentKey);
  }, startKey);
};

const getStoredCompletedLessonMapAndKey = async (
  courseId: string
): Promise<
  | {
      storedCompletedLessonMap: CompletedLessonMap;
      key: string;
    }
  | undefined
> => {
  // Format of Key for completeLesson
  // => 'lessons:completed:{courseId}'
  const key = createStorageKeyFromArray([
    KEY_MAP.COMPLETED_LESSON_KEY,
    courseId,
  ]);

  if (!key) return;

  const storedCompletedLessonMap =
    (await localForage.getItem<CompletedLessonMap>(key)) ?? {};

  return { storedCompletedLessonMap, key };
};
