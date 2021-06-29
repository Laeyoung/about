import type { NextPage } from 'next';
import Head from 'next/head';

import { useCallback, useState, useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import stringHash from 'string-hash';
import produce from 'immer';
import _ from 'lodash';

import styles from '../styles/Home.module.css';

//import Counter from '../features/counter/Counter';

import { Answer, QuestionAnswer } from '../components/QuestionAnswer';

const NextQuestionQueue = [
  '커먼컴퓨터는 어떤 것들을 만드는 곳인가요?',
  // '커먼컴퓨터를 어떻게 시작하게 되셨나요?',
  // '커먼컴퓨터를 시작하기 전에는 어떤 일을 하셨나요?',
  // 'AI Writer는 어떻게 시작된 서비스인가요?',
  // '서비스를 만들면서 겪는 가장 큰 어려움은 뭔가요?',
  // '커먼컴퓨터의 앞으로 목표는 뭔가요?',
  // '커먼컴퓨터의 비젼은 뭔가요?',
  // '커먼컴퓨터가 겪는 가장 큰 챌린지는 뭔가요?',
  // '커먼컴퓨터의 팀문화는 어떠한가요?',
  // '커먼컴퓨터가 현재 찾고 있는 팀원이 있나요?',

  // '커먼컴퓨터는',
  // 'AINetwork 메인넷은',
  // 'Ainize는',
  // 'Teachable NLP를 이용하면,',
  // 'aFan은 다양한',
  // '2021년의 커먼컴퓨터의 목표는',
];
const FIRST_QUESTION = NextQuestionQueue.shift() as string;

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
  const appBarClasses = useAppBarStyles();

  const [questions, setQuestions] = useState([FIRST_QUESTION]);
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
  const isAllQuestionDone = useMemo(() => {
    if (NextQuestionQueue.length > 0) return false;
    if (answers.length < questions.length) return false;

    return true;
  }, [answers]);

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
          style={{
            visibility: isAllQuestionDone ? 'visible' : 'hidden',
          }}
        >
          커먼컴퓨터에 대해 더 알아보고 싶으신가요?
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
