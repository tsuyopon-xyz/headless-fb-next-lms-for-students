import React, { createContext, FC, useState, useEffect } from 'react';
import {
  completeLesson as completeLessonInService,
  returnLessonToIncomplete as returnLessonToIncompleteInService,
  getCompletedLessonMapByCourseId,
} from 'src/services/lessons.service';
import type { CompletedLessonMap } from 'src/types/coure';

type ContextProps = {
  completeLesson: (lessonId: string) => Promise<void>;
  returnLessonToIncomplete: (lessonId: string) => Promise<void>;
  hasLessonCompleted: (lessonId: string) => boolean;
};

export const LessonPageContext = createContext({} as ContextProps);

type ProviderProps = {
  courseId: string;
};

export const LessonPageProvider: FC<ProviderProps> = ({
  children,
  courseId,
}) => {
  const [compleatedLessonMap, setCompleatedLessonMap] =
    useState<CompletedLessonMap>({});

  useEffect(() => {
    async function init() {
      const storedCompletedLessonMap = await getCompletedLessonMapByCourseId(
        courseId
      );
      setCompleatedLessonMap(storedCompletedLessonMap);
    }

    init();
  }, []);

  const completeLesson = async (lessonId: string) => {
    const newCompletedLessonMap = await completeLessonInService(
      courseId,
      lessonId
    );
    setCompleatedLessonMap(newCompletedLessonMap);
  };

  const returnLessonToIncomplete = async (lessonId: string) => {
    const newCompletedLessonMap = await returnLessonToIncompleteInService(
      courseId,
      lessonId
    );
    setCompleatedLessonMap(newCompletedLessonMap);
  };

  const hasLessonCompleted = (lessonId: string): boolean => {
    return compleatedLessonMap[lessonId] ?? false;
  };

  return (
    <LessonPageContext.Provider
      value={{
        completeLesson,
        returnLessonToIncomplete,
        hasLessonCompleted,
      }}
    >
      {children}
    </LessonPageContext.Provider>
  );
};
