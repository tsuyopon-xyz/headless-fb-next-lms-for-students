import React, { VFC } from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Disclosure, Transition } from '@headlessui/react';
import type { Course } from 'src/types/coure';

type Props = {
  course: Course;
  currentLessonSlug: string;
};

export const AccordionListForLesson: VFC<Props> = ({
  course,
  currentLessonSlug,
}) => {
  const { sections } = course;

  console.log(currentLessonSlug);

  return (
    <div className="bg-white shadow overflow-hidden border rounded-md">
      <ul role="list" className="divide-y divide-gray-200 list-none">
        {sections.map((section, i) => {
          const lessonSize = section.lessons.length;
          const sectionTotalMinutes = section.lessons.reduce(
            (sumMinutes, lesson) => {
              return sumMinutes + lesson.completionMinutes;
            },
            0
          );
          const isLessonIncluded = section.lessons.some(
            (lesson) => lesson.slug === currentLessonSlug
          );

          return (
            <Disclosure key={section.id} defaultOpen={isLessonIncluded}>
              {({ open }) => (
                <li>
                  <Disclosure.Button className="w-full">
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="text-gray-500 text-md leading-5 font-normal min-w-0 flex-1 flex items-center justify-between">
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
                            <p className="truncate ml-4">{section.title}</p>
                          </div>
                        </div>
                        <div>{lessonSize}個のレッスン</div>
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
                        {section.lessons.map((lesson) => {
                          const isCurrentLesson =
                            lesson.slug === currentLessonSlug;

                          return (
                            <li
                              key={lesson.id}
                              className={
                                isCurrentLesson
                                  ? 'bg-indigo-100'
                                  : 'bg-gray-100'
                              }
                            >
                              <div className="px-4 py-4 flex items-center sm:px-6">
                                <div className="text-gray-500 text-md leading-5 font-normal min-w-0 flex-1 flex items-center justify-between">
                                  <div className="truncate">
                                    <div className="flex">
                                      <div className="flex items-center h-5">
                                        <input
                                          type="checkbox"
                                          className="focus:ring-indigo-50 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                        />
                                      </div>
                                      <Link
                                        href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                                      >
                                        <a>
                                          <p className="text-indigo-600 truncate ml-4">
                                            {lesson.title}
                                          </p>
                                        </a>
                                      </Link>
                                    </div>
                                  </div>
                                  <div>{lesson.completionMinutes}分</div>
                                </div>
                              </div>
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
