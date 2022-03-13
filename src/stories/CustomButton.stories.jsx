import React from "react";

import Button from "../components/Button";

export default {
  title: "Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "Hola mundo!",
  variant: "solid",
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: "Bye world!",
  variant: "ghost",
};
