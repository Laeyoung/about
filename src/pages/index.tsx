import type { NextPage } from 'next';
import Head from 'next/head';

import Counter from '../features/counter/Counter';

import { TypeformRadio } from '../components/TypeformRadio';

import styles from '../styles/Home.module.css';

import { fetchTeachableNLPInference } from '../app/apis';
import { useEffect, useState } from 'react';

import _ from 'lodash';

const initText = '커먼컴퓨터는';

const IndexPage: NextPage = () => {
  const [form, setForm] = useState([] as string[]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTeachableNLPInference(initText);

      console.log(JSON.stringify(data));

      setForm(_.values(data) as string[]);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <p>{initText}</p>
        {!_.isEmpty(form) && (
          <TypeformRadio
            items={form}
            onItemSelected={(index: number, text: string) => {
              console.log(index, text);
            }}
          />
        )}

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
      </header>
    </div>
  );
};

export default IndexPage;
