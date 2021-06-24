import type { NextPage } from 'next';
import Head from 'next/head';

import { useEffect, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

//import Counter from '../features/counter/Counter';

import { TypingText } from '../components/TypingText';
import { TypeformRadio } from '../components/TypeformRadio';

import styles from '../styles/Home.module.css';

import { fetchTeachableNLPInference } from '../app/apis';

import _ from 'lodash';

const initText = '커먼컴퓨터는';

const IndexPage: NextPage = () => {
  const [form, setForm] = useState([] as string[]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTeachableNLPInference(initText);

      const answers = (_.values(data) as string[]).map((answer) => {
        const dotIndex = answer.indexOf('.');
        return dotIndex > 0
          ? answer.substr(0, answer.indexOf('.') + 1)
          : answer;
      });

      setForm(answers);
    };
    fetchData();
  }, []);

  const transitions = useTransition(!_.isEmpty(form), {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 100,
    config: { duration: 400 },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            margin: '10px',
          }}
        >
          <TypingText text={initText} isCJK={true} />
          {transitions(
            (_styles, item) =>
              item && (
                <animated.div style={_styles}>
                  <TypeformRadio
                    items={form}
                    onItemSelected={(index: number, text: string) => {
                      console.log(index, text);
                    }}
                  />
                </animated.div>
              ),
          )}
        </div>

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
