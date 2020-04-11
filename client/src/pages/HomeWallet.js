import React from "react";

import BalanceCard from '../components/MonthBalance';
import Expenses from '../components/Expenses';

// import { Container } from './styles';

const HomeWallet = ({userInfo}) => (
  <React.Fragment>
    {userInfo.expenses && (
      <BalanceCard wallet={userInfo.wallet} expenses={userInfo.expenses} />
    )}
    {userInfo.expenses && <Expenses expenses={userInfo.expenses} />}
  </React.Fragment>
);

export default HomeWallet;
