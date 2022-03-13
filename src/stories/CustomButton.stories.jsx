import React from "react";

import { CustomButton } from "./CustomButton.jsx";

export default {
  title: "CustomButton",
  component: CustomButton,
};

const Template = (args) => <CustomButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: "Hola mundo!"
}

export const Secondary = Template.bind({});
Secondary.args = {
    title: "Bye world!"
}
