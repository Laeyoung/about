import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';

import styles from '../styles/TypingText.module.scss';

export interface TypingTextProps {
  text: string;
  isCJK?: boolean;
}

const cx = classNames.bind(styles);

/**
 * Primary UI component for user interaction
 */
export const TypingText: React.FC<TypingTextProps> = ({
  text,
  isCJK = false,
}) => {
  const [typingWidth, setTypingWidth] = useState('0px');
  const hiddenText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //const width = isCJK ? `${text.length * 1.5}ch` : `${text.length}ch`;
    console.log(hiddenText?.current?.clientWidth);

    const width = hiddenText?.current?.clientWidth ?? 0;

    setTypingWidth(`${width + 5}px`);
  });

  const typingClassName = cx('typing');
  const typingHiddenClassName = cx('typing--hidden');
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
