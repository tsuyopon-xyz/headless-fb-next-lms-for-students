import React, { createContext, FC, useState, useEffect } from 'react';
import { fetchAllCourses } from 'src/services/courses.service';
import type { Course } from 'src/types/coure';

type ContextProps = {
  searchWord: string;
  setSearchWord: (word: string) => void;
  getFilteredCourses: () => Course[];
};

export const CoursesPageContext = createContext({} as ContextProps);

export const CoursesPageProvider: FC = ({ children }) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      const allCourses = await fetchAllCourses();
      setCourses(allCourses);
    }

    fetchCourses();
  }, []);

  const getFilteredCourses = () => {
    if (!searchWord) return courses;

    const searchWordInUpperCase = searchWord.trim().toUpperCase();
    return courses.filter((course) => {
      const titleInUpperCase = course.title.toUpperCase();

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
