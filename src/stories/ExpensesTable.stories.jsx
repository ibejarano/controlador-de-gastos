import React from "react";
import ExpensesTable from "../components/ExpensesTable";

export default {
  title: "Expenses Table",
  component: ExpensesTable,
};

const Template = (args) => <ExpensesTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  expenses: [
    {
      description: "papitas",
      amount: 100,
      section: "General",
      createdAt: new Date(),
    },
    {
      description: "tomatitos",
      amount: 150,
      section: "General",
      createdAt: new Date(),
    },
  ],
};
