import type { NextPage } from 'next';
import Head from 'next/head';

import stringHash from 'string-hash';
import produce from 'immer';
import _ from 'lodash';

import styles from '../styles/Home.module.css';

//import Counter from '../features/counter/Counter';

import { Answer, QuestionAnswer } from '../components/QuestionAnswer';
import { useCallback, useState } from 'react';

const NextQuestionQueue = [
  'AINetwork 메인넷은',
  'Ainize는',
  'Teachable NLP를 이용하면,',
  'aFan은 다양한',
  '2021년의 커먼컴퓨터의 목표는',
];

function QuestionAnswerList(
  questions: string[],
  onSelectCallback: (answer: Answer) => void,
) {
  return questions.map((question) => {
    return (
      <QuestionAnswer
        key={stringHash(question)}
        question={question}
        onSelect={onSelectCallback}
      />
    );
  });
}

const IndexPage: NextPage = () => {
  const [questions, setQuestions] = useState(['커먼컴퓨터는']);
  const [answers, setAnswers] = useState([] as Answer[]);
  const onSelectCallback = useCallback(
    (answer: Answer) => {
      setQuestions(
        produce(questions, (draft) => {
          const nextQuestion = NextQuestionQueue.shift();
          if (nextQuestion) draft.push(nextQuestion);
        }),
      );
      setAnswers(
        produce(answers, (draft) => {
          draft.push(answer);
        }),
      );
    },
    [questions],
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>About ComCom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <header className={styles.header}>
        <Counter />
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
        </span>
      </header> */}
      <div className={styles.body}>
        {QuestionAnswerList(questions, onSelectCallback)}
      </div>
    </div>
  );
};

export default IndexPage;
