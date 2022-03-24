import React from "react";
import BudgetCard from "../components/BudgetCard";

export default {
  title: "Budget Card",
  component: BudgetCard,
};

const Template = (args) => <BudgetCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  section: "General",
  limit: 10000,
  current: 3000,
};

export const PrimaryNoBudget = Template.bind({});
PrimaryNoBudget.args = {
  section: "General",
};
