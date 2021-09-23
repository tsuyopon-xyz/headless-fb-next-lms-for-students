import React, { VFC } from 'react';
import Link from 'next/link';
import { PlayIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Disclosure, Transition } from '@headlessui/react';
import type { CourseSection } from 'src/types/coure';

type Props = {
  courseDataList: CourseSection[];
};

export const CourseSections: VFC<Props> = ({ courseDataList }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200 list-none">
        {courseDataList.map((courseData, i) => {
          const lessonSize = courseData.lessons.length;
          const sectionTotalMinutes = courseData.lessons.reduce(
            (sumMinutes, lesson) => {
              return sumMinutes + lesson.completionMinutes;
            },
            0
          );

          return (
            <Disclosure key={i}>
              {({ open }) => (
                <li>
                  <Disclosure.Button className="w-full">
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="text-gray-500 text-md leading-5 font-normal min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex">
                            <ChevronRightIcon
                              className={
                                open
                                  ? 'h-5 w-5 text-gray-400 -rotate-90 duration-200'
                                  : 'h-5 w-5 text-gray-400 rotate-90 duration-200'
                              }
                              aria-hidden="true"
                            />
                            <p className="truncate ml-4">{courseData.title}</p>
                          </div>
                        </div>
                        <div>
                          {lessonSize}個のレッスン・合計{sectionTotalMinutes}分
                        </div>
                      </div>
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <Transition
                      show={open}
                      enter="transition-opacity ease-linear duration-200"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 list-none"
                      >
                        {courseData.lessons.map((lesson) => {
                          return (
                            <li key={lesson.id} className="bg-gray-100">
                              <Link href={`#${lesson.id}`}>
                                <a>
                                  <div className="px-4 py-4 flex items-center sm:px-6">
                                    <div className="text-gray-500 text-md leading-5 font-normal min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                      <div className="truncate">
                                        <div className="flex">
                                          <PlayIcon
                                            className="h-5 w-5 text-black"
                                            aria-hidden="true"
                                          />
                                          <p className="text-indigo-600 truncate ml-4">
                                            {lesson.title}
                                          </p>
                                        </div>
                                      </div>
                                      <div>{lesson.completionMinutes}分</div>
                                    </div>
                                  </div>
                                </a>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </Transition>
                  </Disclosure.Panel>
                </li>
              )}
            </Disclosure>
          );
        })}
      </ul>
    </div>
  );
};
