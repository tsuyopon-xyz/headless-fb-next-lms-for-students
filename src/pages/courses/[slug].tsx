import React, { VFC } from 'react';
import Head from 'next/head';
import { CourseSections } from 'src/components/courses/AccordionList';
import { PageHeader } from 'src/components/common/PageHeader';
import { PageTextHTMLSection } from 'src/components/common/PageTextHTMLSection';
import { Button } from 'src/components/common/Button';
import { DUMMY_COURSE_SECTIONS } from 'src/data/courses';

const CourseDetailPage = () => {
  return (
    <main className="lg:relative max-w-7xl mx-auto px-4 py-6">
      <Head>
        <title>詳細ページ</title>
      </Head>
      <PageHeader title="〇〇アプリを作ろう！（講座タイトルを入れる）" />

      {/* 画面サイズが小さい1カラムのときは、右サイドバーの要素を一番上に持ってくる */}
      <div className="block lg:hidden">
        <SimpleCard>
          <PageTextHTMLSection
            title="このコースの内容"
            html="<ul><li>基本的なコマンド操作</li><li>基本的なコマンド操作</li><li>基本的なコマンド操作</li><li>基本的なコマンド操作</li><li>基本的なコマンド操作</li></ul>"
            className="mt-11"
          />
        </SimpleCard>
        <div className="mt-8 lg:mt-3">
          <Button size="full">このコースをはじめる</Button>
        </div>
      </div>
      <div className="mt-8 w-full mx-auto grid grid-cols-1 gap-6 px-0 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="lg:col-start-1 lg:col-span-2">
          <PageTextHTMLSection
            title="学習内容"
            html="<ul><li>〇〇とは何か？</li><li>〇〇とは何か？</li><li>〇〇とは何か？</li></ul>"
          />
          <div className="mt-8">
            <PageTextHTMLSection
              title="コースの内容"
              html="セクションの数: 〇〇・レクチャーの数: 〇〇・総時間: 〇時間〇〇分"
            />
          </div>
          <CourseSections courseDataList={DUMMY_COURSE_SECTIONS} />
          <div className="mt-8">
            <PageTextHTMLSection
              title="前提知識"
              html="<ul><li>基本的なコマンド操作</li><li>基本的なコマンド操作</li><li>基本的なコマンド操作</li><li>基本的なコマンド操作</li><li>基本的なコマンド操作</li></ul>"
              className="mt-11"
            />
          </div>
          <div className="mt-8">
            <PageTextHTMLSection
              title="講座の詳細"
              html="<p>ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。</p><br/><p>ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。</p><br/><p>ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。ここに講座の詳細を記述する。</p>"
              className="mt-11"
            />
          </div>
          <div className="mt-8">
            <Button size="full">このコースをはじめる</Button>
          </div>
        </div>

        {/* 画面サイズが小さい1カラムのときは、右サイドバーの要素を一番上に持ってくる */}
        <div className="lg:relative lg:col-start-3 lg:col-span-1">
          <div className="hidden lg:block lg:sticky lg:top-3">
            <SimpleCard>
              <PageTextHTMLSection
                title="このコースの内容"
                html="<ul><li>基本的なコマンド操作</li><li>基本的なコマンド操作</li><li>基本的なコマンド操作</li><li>基本的なコマンド操作</li><li>基本的なコマンド操作</li></ul>"
                className="mt-11"
              />
            </SimpleCard>
            <div className="mt-8 lg:mt-3">
              <Button size="full">このコースをはじめる</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const SimpleCard: React.FC = ({ children }) => {
  return <div className="rounded-lg shadow-lg border p-6 ">{children}</div>;
};

export default CourseDetailPage;
