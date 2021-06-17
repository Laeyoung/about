import React from 'react';
import { Story, Meta } from '@storybook/react';

import { TypeformRadio, TypeformRadioProps } from './TypeformRadio';

export default {
  title: 'Example/TypeformRadio',
  component: TypeformRadio,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<TypeformRadioProps> = (args) => <TypeformRadio {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  items: [
    'In this tutorial, we will cover how to create a simple AngularJS project with three controllers.',
    'I\'m sorry for how quickly we all arrived in here.'
  ]
};

export const Secondary = Template.bind({});
Secondary.args = {
  backgroundColor: "rgba(146, 70, 153, 0.74)",
  borderColor: "rgba(146, 70, 153, 1)",
  items: [
    'Answer_1',
    'Answer_2',
    'Answer_3',
    'Answer_4',
    'Answer_5',
  ]
};
