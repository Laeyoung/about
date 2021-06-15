import React from 'react';
import './typeformradio.css';

export interface TypeformRadioProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const TypeformRadio: React.FC<TypeformRadioProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const mode = primary ? 'storybook-typeformradio--primary' : 'storybook-typeformradio--secondary';
  return (
    // <button
    //   type="button"
    //   className={['storybook-typeformradio', `storybook-typeformradio--${size}`, mode].join(' ')}
    //   style={{ backgroundColor }}
    //   {...props}
    // >
    //   {label}
    // </button>
    <form>
      <div className="radiobtn">
        <input type="radio" id="huey"
              name="drone" value="huey" checked />
        <label htmlFor="huey">we're ready to get on with writing our first</label>
      </div>
    
      <div className="radiobtn">
        <input type="radio" id="dewey"
              name="drone" value="dewey" />
        <label htmlFor="dewey">In this tutorial, we will cover how to create a simple AngularJS project with three controllers</label>
      </div>
    
      <div className="radiobtn">
        <input type="radio" id="louie"
              name="drone" value="louie" />
        <label htmlFor="louie">I'm sorry for how quickly we all arrived in here.</label>
      </div>
    </form>
  );
};
