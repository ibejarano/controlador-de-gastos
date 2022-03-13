import React from 'react';
import LoginForm from "../components/LoginForm";

export default {
  title: "LoginForm",
  component: LoginForm,
};

const Template = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
