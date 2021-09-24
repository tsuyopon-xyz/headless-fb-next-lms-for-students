import React, { VFC } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import {
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from '@heroicons/react/outline';
import { Button } from 'src/components/common/Button';
import { CourseCardGrid } from 'src/components/common/CourseCardGrid';
import { fetchNew3Courses } from 'src/services/courses.service';
import type { Course } from 'src/types/coure';

type PageProps = {
  threeCourses: Course[];
};

// markup
const IndexPage: React.VFC<PageProps> = ({ threeCourses }) => {
  return (
    <main className="lg:relative">
      <Head>
        <title>トップページ</title>
      </Head>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <HeroSection />
      </div>
      <div className="bg-gray-100">
        <ThreeCoursesSection threeCourses={threeCourses} />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <TargetUserSection />
      </div>
    </main>
  );
};

const HeroSection: VFC = () => {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl w-full text-center lg:text-left lg:py-24">
        <div className="px-4 lg:w-3/5 lg:pr-4 sm:px-0 sm:mr-10">
          <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block">楽しみながら</span>
            <span className="block text-indigo-600 xl:inline">
              もう1歩先のレベルへ
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            教材を使ってプログラミング学習を1通り終えた後、「次に何をしようかなー？」と思っているそこのあなた！
            <br />
            <br />
            ちょいとこちらのサイトで、Webアプリを作っていきませんか？^^
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link href="/courses">
                <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  すべての講座を見る
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-2/5 lg:h-full mt-8 lg:mt-0">
        <img
          src="/images/top/hero.svg"
          alt="hero image"
          className="absolute w-full h-full object-contain top-0 right-0"
        />
      </div>
    </div>
  );
};

type ThreeCoursesSectionProps = PageProps;
const ThreeCoursesSection: VFC<ThreeCoursesSectionProps> = ({
  threeCourses,
}) => {
  return (
    <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:py-10 lg:px-4 max-w-7xl mx-auto">
      <div className="absolute inset-0">
        <div className="h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            講座一覧
          </h2>
        </div>
        <div className="mt-12">
          <CourseCardGrid courses={threeCourses} />
        </div>
        <div className="flex justify-center mt-10">
          <Button size="3lg">
            <Link href="/courses">
              <a className="text-white text-lg">他の講座も見る</a>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const TargetUserSection: VFC = () => {
  const features = [
    {
      name: '次に何をすれば良いかわからない人',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: GlobeAltIcon,
    },
    {
      name: 'とにかくポートフォリオを作りたい人',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: ScaleIcon,
    },
    {
      name: 'いろんなサービスを作ってみたい人',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: LightningBoltIcon,
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-lg mx-auto md:max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            想定している利用者
          </h2>
        </div>
        <dl className="mt-12 space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {features.map((feature) => (
            <div key={feature.name}>
              <dt>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-5 text-lg leading-6 font-medium text-gray-900">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const threeCourses = await fetchNew3Courses();

  console.log(threeCourses, '@@@@@@@@@threeCourses');

  return {
    props: {
      threeCourses,
    },
  };
};
