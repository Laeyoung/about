import type { NextPage } from 'next';
import Head from 'next/head';

import { useCallback, useState, useMemo, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import stringHash from 'string-hash';
import produce from 'immer';
import _ from 'lodash';

import styles from '../styles/Home.module.css';

import { Questions } from '../const';
import { Answer, QuestionAnswer } from '../components/QuestionAnswer';

const QuestionQueue = [...Questions];
const FIRST_QUESTION = QuestionQueue.shift() as string;

const useAppBarStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

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
  const [questions, setQuestions] = useState([FIRST_QUESTION]);
  const [answers, setAnswers] = useState([] as Answer[]);
  const ref = useRef<HTMLDivElement>(null);

  const onSelectCallback = useCallback(
    (answer: Answer) => {
      setQuestions(
        produce(questions, (draft) => {
          const nextQuestion = QuestionQueue.shift();
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
  const isAllQuestionDone = useMemo(() => {
    if (QuestionQueue.length > 0) return false;
    if (answers.length < questions.length) return false;

    ref?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    return true;
  }, [answers]);

  const appBarClasses = useAppBarStyles();

  return (
    <div className={styles.container}>
      <Head>
        <title>About ComCom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="fixed" style={{ background: '#764fcd' }}>
        <Toolbar>
          <Typography variant="h5" className={appBarClasses.title}>
            커먼컴퓨터에 관하여
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={styles.body}>
        <div className={styles.description}>
          커먼컴퓨터에 대해 학습한 AI와의 10문 10답입니다.
          <br />
          여러분이 생각하시는 커먼컴퓨터는 어떤 모습에 가깝나요? 🤔
        </div>
        {QuestionAnswerList(questions, onSelectCallback)}
        <div
          className={styles.lastMessageFooter}
          ref={ref}
          style={{
            visibility: isAllQuestionDone ? 'visible' : 'hidden',
          }}
        >
          <p>
            <br />
            👩‍💻👨‍💻 커먼컴퓨터에 대해 더 알고 싶으신가요?
          </p>
          <span>
            <a
              className={styles.link}
              href="https://comcom.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              더 자세히 알아보기 🧐
            </a>
          </span>
          <p>
            <br />
            나에 대한 AI를 한번 만들어 보실래요?
            <br />
            텍스트 데이터만 있으면, 단 5분 만에 만들 수 있어요!
          </p>
          <span>
            <a
              className={styles.link}
              href="https://forum.ainetwork.ai/t/teachable-nlp-ai/142"
              target="_blank"
              rel="noopener noreferrer"
            >
              만들어보기 😎
            </a>
            <br />
          </span>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
