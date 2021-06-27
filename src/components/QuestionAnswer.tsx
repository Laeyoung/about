import React, { useEffect, useState, useRef } from 'react';
import { useTransition, animated } from '@react-spring/web';

import classNames from 'classnames/bind';
import _ from 'lodash';

import { TypingText } from '../components/TypingText';
import { TypeformRadio } from '../components/TypeformRadio';

import styles from '../styles/QuestionAnswer.module.scss';

import { fetchTeachableNLPInference } from '../app/apis';

export interface QuestionAnswerProps {
  question: string;
  onSelect?: (answer: Answer) => void;
}
export interface Answer {
  question: string;
  choices: string[];
  answer: string;
}

const cx = classNames.bind(styles);
const className = cx('qa');
const scrollIntoViewOption: ScrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
};
const transitionConfig = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  delay: 100,
  config: { duration: 400 },
};

export const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
  question,
  onSelect,
}) => {
  const [choices, setChoices] = useState([] as string[]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref?.current?.scrollIntoView(scrollIntoViewOption);

    const fetchData = async () => {
      const data = await fetchTeachableNLPInference(question);

      const answers = (_.values(data) as string[]).map((answer) => {
        const dotIndex = answer.indexOf('.');
        return dotIndex > 0
          ? answer.substr(0, answer.indexOf('.') + 1)
          : answer;
      });
      setChoices(answers);

      ref?.current?.scrollIntoView(scrollIntoViewOption);
    };
    fetchData();
  }, []);

  const transitions = useTransition(!_.isEmpty(choices), transitionConfig);

  return (
    <div className={className} ref={ref}>
      <TypingText text={question} />
      {transitions(
        (_styles, item) =>
          item && (
            <animated.div style={_styles}>
              <TypeformRadio
                items={choices}
                onItemSelected={(_index: number, text: string) => {
                  if (onSelect)
                    onSelect({
                      question: question,
                      choices: choices,
                      answer: text,
                    });
                }}
              />
            </animated.div>
          ),
      )}
    </div>
  );
};
