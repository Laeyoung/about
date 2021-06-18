import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import './typeformradio.module.css';

export interface TypeformRadioProps {
  backgroundColor?: string;
  borderColor?: string;
  items: string[];
  
  onItemSelected?: (index: number, text: string) => void;
}

/**
 * Primary UI component for user interaction
 */
export const TypeformRadio: React.FC<TypeformRadioProps> = ({
  backgroundColor = "#fee8c3",
  borderColor = "#fdd591",
  items = [],
  onItemSelected,
}) => {
  const [selected, setSelected] = useState(-1);

  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const index: number = parseInt((event.target as HTMLInputElement).value)
    const text = items[index]

    onItemSelected && onItemSelected(index, text)
    setSelected(index)
  }

  return (
    <form className="typeform-radio" onChange={onChange}>
      {
        items.map((item, index) => {
          const key = uuid()

          return (
            <div className="radiobtn" key={key}>
              <input
                type="radio"
                name='typeform-radio'
                id={`${index}`}
                value={index}
                defaultChecked={selected === index}
                disabled={selected >= 0 && selected !== index}/>
              <label htmlFor={`${index}`} style={{ backgroundColor, borderColor }}>{item}</label>
            </div>
          )
        })
      }
    </form>
  );
};
