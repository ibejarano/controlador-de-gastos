import React from "react";
import WalletContainer from "../components/WalletContainer";

export default {
  title: "WalletContainer",
  component: WalletContainer,
};

const Template = (args) => <WalletContainer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  wallet: {
    _id: 1,
    name: "Cryptos",
    description: "prueba descripcion",
    balance: 1000,
  },
};
