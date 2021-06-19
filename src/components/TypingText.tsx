import classNames from 'classnames/bind';
import React from 'react';

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
  const classId = cx('typing');
  const width = isCJK ? `${text.length * 1.5}ch` : `${text.length}ch`;
  const animation =
    `${classId} ` +
    `${text.length * 0.1}s steps(${text.length}), ` +
    'blink 0.5s step-end infinite alternate';

  return (
    <div className={classId} style={{ width, animation }}>
      {text}
    </div>
  );
};
