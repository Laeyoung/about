import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';

import styles from '../styles/TypingText.module.scss';

export interface TypingTextProps {
  text: string;
}

const cx = classNames.bind(styles);
const typingClassName = cx('typing');
const typingHiddenClassName = cx('typing--hidden');

export const TypingText: React.FC<TypingTextProps> = ({ text }) => {
  const [typingWidth, setTypingWidth] = useState('0px');
  const hiddenText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hiddenTextWidth = hiddenText?.current?.clientWidth ?? 0;
    setTypingWidth(`${hiddenTextWidth + 5}px`); // add 5px Margin
  });

  const animation =
    `${typingClassName} ` +
    `${text.length * 0.1}s steps(${text.length}), ` +
    'blink 0.5s step-end infinite alternate';

  return (
    <>
      <div
        className={typingClassName}
        style={{ width: typingWidth, animation }}
      >
        {text}
      </div>
      <div ref={hiddenText} className={typingHiddenClassName}>
        {text}
      </div>
    </>
  );
};
