import React, { useContext } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SearchIcon } from '@heroicons/react/outline';
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid';
import { PageHeader } from 'src/components/common/PageHeader';
import { CourseCardGrid } from 'src/components/common/CourseCardGrid';
import {
  CoursesPageContext,
  CoursesPageProvider,
} from 'src/contexts/pages/CoursesPageContext';
import { fetchAllCourses } from 'src/services/courses.service';
import type { Course } from 'src/types/coure';

type PageProps = {
  courses: Course[];
};

const CoursesPage: React.VFC<PageProps> = ({ courses }) => {
  return (
    <CoursesPageProvider>
      <main className="lg:relative max-w-7xl mx-auto px-4 pb-6">
        <title>講座一覧</title>
        <div className="sm:flex sm:justify-between">
          <PageHeader title="講座一覧" />
          {/* // TODO: サーバープロセスで、microCMSからデータを取得する必要があるため、現状のCoursesPageContextの作りを見直す必要がある。
          // TODO: CoursesPageContextの仕様を対応するまでフィルタリング処理は一旦無効にする */}
          {/* <div className="sm:flex sm:items-center sm:w-80">
            <SearchFormSection />
          </div> */}
        </div>
        <div className="mt-8 sm:mt-0">
          <CoursesGridSection courses={courses} />
        </div>
      </main>
    </CoursesPageProvider>
  );
};

type QueryParams = {
  page?: string;
};

const CoursesGridSection: React.VFC<PageProps> = ({ courses }) => {
  const router = useRouter();
  const { getFilteredCourses } = useContext(CoursesPageContext);

  // TODO: サーバープロセスで、microCMSからデータを取得する必要があるため、現状のCoursesPageContextの作りを見直す必要がある。
  // TODO: CoursesPageContextの仕様を対応するまでフィルタリング処理は一旦無効にする
  // const _courses = getFilteredCourses();
  // const [page, _] = useQueryParam('page', withDefault(NumberParam, 1));

  const queryParams = router.query as QueryParams;
  const page =
    queryParams.page && queryParams.page.length > 0
      ? parseInt(queryParams.page, 10)
      : 1;

  const perPage = 10;
  const startIndex = perPage * (page - 1);
  const pageCourses = courses.slice(startIndex, startIndex + perPage);

  return (
    <>
      <CourseCardGrid courses={pageCourses} />
      <div className="mt-10">
        <PaginationSection
          perPage={perPage}
          total={courses.length}
          currentPage={page}
        />
      </div>
    </>
  );
};

type PaginationProps = {
  perPage: number;
  total: number;
  currentPage?: number;
};
const PaginationSection: React.VFC<PaginationProps> = ({
  perPage,
  total,
  currentPage = 1,
}) => {
  const maxPage = Math.ceil(total / perPage);
  const unselectedPageClassValues =
    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium';
  const selectedPageClassValues =
    'border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium';

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        {currentPage > 1 ? (
          <Link href={`?page=${currentPage - 1}`}>
            <a className={unselectedPageClassValues}>
              <ArrowNarrowLeftIcon
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Previous
            </a>
          </Link>
        ) : null}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {Array.from({ length: maxPage }).map((_, i) => {
          const pageNumber = i + 1;
          const classValues =
            pageNumber === currentPage
              ? selectedPageClassValues
              : unselectedPageClassValues;

          return (
            <Link key={pageNumber} href={`?page=${pageNumber}`}>
              <a className={classValues}>{pageNumber}</a>
            </Link>
          );
        })}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        {currentPage < maxPage ? (
          <Link href={`?page=${currentPage + 1}`}>
            <a className={unselectedPageClassValues}>
              Next
              <ArrowNarrowRightIcon
                className="ml-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </a>
          </Link>
        ) : null}
      </div>
    </nav>
  );
};

const SearchFormSection: React.VFC = () => {
  const { searchWord, setSearchWord } = useContext(CoursesPageContext);

  return (
    <div className="relative rounded-md w-full">
      <input
        type="text"
        name="account-number"
        id="account-number"
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
        placeholder="講座を探す"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const courses = await fetchAllCourses();

  return {
    props: {
      courses,
    },
  };
};

export default CoursesPage;
