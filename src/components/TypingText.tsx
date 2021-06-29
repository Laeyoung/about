import classNames from 'classnames/bind';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const { detect } = require('detect-browser');
const browser = detect();

import styles from '../styles/TypingText.module.scss';

export interface TypingTextProps {
  text: string;
}

const cx = classNames.bind(styles);
const typingClassName = cx('typing');
const typingHiddenClassName = cx('typing--hidden');

export const TypingText: React.FC<TypingTextProps> = ({ text }) => {
  const animation =
    `${typingClassName} ` +
    `${text.length * 0.1}s steps(${text.length}), ` +
    'blink 0.5s step-end infinite alternate';

  const [typingWidth, setTypingWidth] = useState('0px');
  const hiddenText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hiddenTextWidth = hiddenText?.current?.clientWidth ?? 0;
    setTypingWidth(`${hiddenTextWidth + 5}px`); // add 5px Margin
  });
  const typingStyle = useMemo(() => {
    const style = { width: typingWidth, animation: '' };
    if (parseInt(typingWidth) === 0) return style;
    if (!browser || browser.name !== 'chrome') return style;

    return { ...style, animation };
  }, [typingWidth]);

  return (
    <>
      <div className={typingClassName} style={typingStyle}>
        {text}
      </div>
      <div ref={hiddenText} className={typingHiddenClassName}>
        {text}
      </div>
    </>
  );
};
