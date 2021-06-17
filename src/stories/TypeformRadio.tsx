import React from 'react';
import './typeformradio.css';

export interface TypeformRadioProps {
  backgroundColor?: string;
  borderColor?: string;
  items: string[];
  
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const TypeformRadio: React.FC<TypeformRadioProps> = ({
  backgroundColor = "#fee8c3",
  borderColor = "#fdd591",
  items = [],
  ...props
}) => {


  return (
    <form>
      {
        items.map((item, index) => {
          const id = `${index}`

          return (
            <div className="radiobtn">
              <input type="radio" id={id} name='typeform-radio' value={index}/>
              <label htmlFor={id} style={{ backgroundColor, borderColor }}>{item}</label>
            </div>
          )
        })
      }
    </form>
  );
};
