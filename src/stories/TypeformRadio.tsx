import React, { useState } from 'react';
import uuid from 'react-uuid';

import './typeformradio.css';

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
    <form onChange={onChange}>
      {
        items.map((item, index) => {
          const id = uuid()

          return (
            <div className="radiobtn" key={id}>
              <input
                type="radio"
                name='typeform-radio'
                id={id}
                value={index}
                defaultChecked={selected === index}
                disabled={selected >= 0 && selected !== index}/>
              <label htmlFor={id} style={{ backgroundColor, borderColor }}>{item}</label>
            </div>
          )
        })
      }
    </form>
  );
};
