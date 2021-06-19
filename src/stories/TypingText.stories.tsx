import React from 'react';
import { Story, Meta } from '@storybook/react';

import { TypingText, TypingTextProps } from '../components/TypingText';

export default {
  title: 'Example/TypingText',
  component: TypingText,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<TypingTextProps> = (args) => <TypingText {...args} />;

export const English = Template.bind({});
English.args = {
  text: 'Hello, World!',
  isCJK: false,
};

export const Korean = Template.bind({});
Korean.args = {
  text: '안녕하세요 세상이여',
  isCJK: true,
};
