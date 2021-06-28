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
  '커먼컴퓨터는 어떤 것들을 만드는 곳인가요?',
  '커먼컴퓨터를 어떻게 시작하게 되셨나요?',
  '커먼컴퓨터를 시작하기 전에는 어떤 일을 하셨나요?',
  'AI Writer는 어떻게 시작된 서비스인가요?',
  '커먼컴퓨터에서 서비스를 만들면서 겪는 가장 큰 어려움은 뭔가요?',
  '커먼컴퓨터의 앞으로 목표는 뭔가요?',
  '커먼컴퓨터의 비젼은 뭔가요?',
  '커먼컴퓨터의 비젼을 달성하기 위해 커먼컴퓨터가 겪는 가장 큰 챌린지는 뭔가요?',
  '한국에서 인공지능과 블록체인 스타트업을 하는 환경은 어떤가요?',
  '커먼컴퓨터의 팀문화는 어떠한가요?',
  '커먼컴퓨터가 현재 찾고 있는 팀원이 있나요?',

  // '커먼컴퓨터는',
  // 'AINetwork 메인넷은',
  // 'Ainize는',
  // 'Teachable NLP를 이용하면,',
  // 'aFan은 다양한',
  // '2021년의 커먼컴퓨터의 목표는',
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
  const [questions, setQuestions] = useState([
    NextQuestionQueue.shift() ?? 'Test question?',
  ]);
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
        <h1>커먼컴퓨터에 관하여</h1>
        {QuestionAnswerList(questions, onSelectCallback)}
      </div>
    </div>
  );
};

export default IndexPage;
