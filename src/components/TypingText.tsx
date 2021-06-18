import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '../styles/TypingText.module.scss';

export interface TypingTextProps {
  text: string;
}

const cx = classNames.bind(styles);

/**
 * Primary UI component for user interaction
 */
export const TypingText: React.FC<TypingTextProps> = ({ text }) => {
  return <div className={cx('typing')}>{text}</div>;
};
