import React from 'react';
import './typeformradio.css';

export interface TypeformRadioProps {
  items: string[];
  
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const TypeformRadio: React.FC<TypeformRadioProps> = ({
  items = ['In this tutorial, we will cover how to create a simple AngularJS project with three controllers.', 'I\'m sorry for how quickly we all arrived in here.'],
  ...props
}) => {
  return (
    <form>
      {
        items.map((item, index) => {
          const id = `${index}`

          return (
            <div className="radiobtn">
              <input type="radio" id={id} name='typeform-radio' value={index} />
              <label htmlFor={id}>{item}</label>
            </div>
          )
        })
      }
    </form>
  );
};
