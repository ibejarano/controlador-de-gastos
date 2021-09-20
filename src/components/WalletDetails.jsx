import React, { useState, useEffect } from "react";

import Balance from "./Balance";
import Expenses from "./Expenses";
import AddExpenseForm from "./AddExpense";
import Modal from "./common/Modal";
import TitleAndSubtitle from "./TitleAndSubtitle";
import Slider from "./Slider";

import { getWalletDetails } from "../helpers/requests";

export default function WalletDetails({ walletId }) {
  const [wallet, setWallet] = useState(null);
  const [modal, toggleModal] = useState(false);
  const [isIncome, setIsIncome] = useState(false);

  useEffect(() => {
    async function fetchWalletDetails() {
      const { data } = await getWalletDetails(walletId);
      setWallet(data);
    }
    if (walletId) {
      fetchWalletDetails();
    }
  }, [walletId]);

  return (
    <React.Fragment>
      <Slider>
        <React.Fragment>
          {wallet && (
            <React.Fragment>
              <Balance
                wallet={wallet}
                setWallet={setWallet}
                toggleModal={toggleModal}
                setIsIncome={setIsIncome}
              />
              <TitleAndSubtitle title="Historial" />

              <Expenses expenses={wallet.expenses} />
            </React.Fragment>
          )}
        </React.Fragment>
      </Slider>
      {modal && (
        <Modal>
          <AddExpenseForm
            walletId={walletId}
            setWallet={setWallet}
            toggleModal={toggleModal}
            isIncome={isIncome}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}
