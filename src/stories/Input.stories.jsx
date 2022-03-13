import React from "react";

import InputText from "../components/InputText";

export default {
  title: "InputText",
  component: InputText,
};

const Template = (args) => <InputText {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "E-mail",
  variant: "solid",
};
