import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '../styles/Typeformradio.module.scss';

export interface TypeformRadioProps {
  items: string[];
  onItemSelected?: (index: number, text: string) => void;
  backgroundColor?: string;
  borderColor?: string;
}

const cx = classNames.bind(styles);

/**
 * Primary UI component for user interaction
 */
export const TypeformRadio: React.FC<TypeformRadioProps> = ({
  items = [],
  onItemSelected,
  backgroundColor = undefined,
  borderColor = undefined,
}) => {
  const [selected, setSelected] = useState(-1);
  const [formKey] = useState(uuidv4());

  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const index: number = parseInt((event.target as HTMLInputElement).value);
    const text = items[index];

    if (onItemSelected) onItemSelected(index, text);
    setSelected(index);
  };

  const formName = `typeform-radio-${formKey}`;
  const customLabelStyle = { backgroundColor, borderColor };

  return (
    <form className={cx('form')} onChange={onChange} key={formKey}>
      {items.map((item, index) => {
        const id = `${formKey}-${index}`;

        return (
          <div className={cx('radiobtn')} key={id}>
            <input
              type="radio"
              name={formName}
              id={id}
              value={index}
              defaultChecked={selected === index}
              disabled={selected >= 0 && selected !== index}
            />
            <label htmlFor={id} style={customLabelStyle}>
              {item}
            </label>
          </div>
        );
      })}
    </form>
  );
};
