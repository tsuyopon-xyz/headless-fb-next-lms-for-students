import React, { createContext, FC, useState } from 'react';
import { courses as coursesEntities } from '../../../data/courses';
import { CourseEntity } from '../../../entities/course.entity';

type ContextProps = {
  searchWord: string;
  setSearchWord: (word: string) => void;
  getFilteredCourses: () => CourseEntity[];
};

export const CoursesPageContext = createContext({} as ContextProps);

export const CoursesPageProvider: FC = ({ children }) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const getFilteredCourses = () => {
    if (!searchWord) return coursesEntities;

    const searchWordInUpperCase = searchWord.trim().toUpperCase();
    return coursesEntities.filter((entity) => {
      const titleInUpperCase = entity.title.toUpperCase();

      return titleInUpperCase.includes(searchWordInUpperCase);
    });
  };

  return (
    <CoursesPageContext.Provider
      value={{
        searchWord,
        setSearchWord,
        getFilteredCourses,
      }}
    >
      {children}
    </CoursesPageContext.Provider>
  );
};
