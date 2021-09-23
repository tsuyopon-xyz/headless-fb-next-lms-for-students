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
        {courseDataList.map((courseData, i) => (
          <Disclosure key={i}>
            {({ open }) => (
              <li>
                <Disclosure.Button className="w-full">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <ChevronRightIcon
                            className={
                              open
                                ? 'h-5 w-5 text-gray-400 -rotate-90 duration-200'
                                : 'h-5 w-5 text-gray-400 rotate-90 duration-200'
                            }
                            aria-hidden="true"
                          />
                          <p className="text-sm leading-5 font-normal text-gray-500 truncate ml-4">
                            {courseData.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Disclosure.Button>
                {/* <span className="h-96"></span> */}
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
                                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div className="truncate">
                                      <div className="flex text-sm">
                                        <PlayIcon
                                          className="h-5 w-5 text-black"
                                          aria-hidden="true"
                                        />
                                        <p className="text-sm leading-5 font-normal text-indigo-600 truncate ml-4">
                                          {lesson.title}
                                        </p>
                                      </div>
                                    </div>
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
        ))}
      </ul>
    </div>
  );
};
