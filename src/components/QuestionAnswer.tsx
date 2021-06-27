import React, { useEffect, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

import classNames from 'classnames/bind';
import _ from 'lodash';

import { TypingText } from '../components/TypingText';
import { TypeformRadio } from '../components/TypeformRadio';

import styles from '../styles/QuestionAnswer.module.scss';

import { fetchTeachableNLPInference } from '../app/apis';

export interface QuestionAnswerProps {
  question: string;
}

const cx = classNames.bind(styles);
const className = cx('qa');

const transitionConfig = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  delay: 100,
  config: { duration: 400 },
};

export const QuestionAnswer: React.FC<QuestionAnswerProps> = ({ question }) => {
  const [form, setForm] = useState([] as string[]);
  const transitions = useTransition(!_.isEmpty(form), transitionConfig);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTeachableNLPInference(question);

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

  return (
    <div className={className}>
      <TypingText text={question} />
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
  );
};
