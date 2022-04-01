import React from "react";
import NavBar from "../components/Navbar";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Navbar",
  component: NavBar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <NavBar {...args} />;

export const Primary = Template.bind({});
