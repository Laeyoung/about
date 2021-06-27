import type { NextPage } from 'next';
import Head from 'next/head';

import _ from 'lodash';

import styles from '../styles/Home.module.css';

//import Counter from '../features/counter/Counter';

import { QuestionAnswer } from '../components/QuestionAnswer';

const questionList = [
  '커먼컴퓨터는',
  'AINetwork는',
  '현재 시리즈 A 투자를',
  'Ainize가 뭔가요?',
];

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <QuestionAnswer question={questionList[0]} />

        {/* <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className={styles.link}
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className={styles.link}
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span> */}
      </header>
    </div>
  );
};

export default IndexPage;
