import React, { useState, useEffect } from "react";

// import { useUser } from "../context/UserContext";
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
  const [openSlider, setOpenSlider] = useState(false);
  const [isIncome, setIsIncome] = useState(false);
  // const { dispatch } = useUser();

  useEffect(() => {
    async function fetchWalletDetails() {
      setOpenSlider(true);
      const { data } = await getWalletDetails(walletId);
      setWallet(data);
    }
    if (walletId) {
      fetchWalletDetails();
    }
  }, [walletId]);

  return (
    <React.Fragment>
      <Slider open={openSlider} setOpen={setOpenSlider}>
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
        {/* <Button
          onClick={() => dispatch({ type: "close-wallet" })}
          style={{
            position: "absolute",
            top: "10px",
            left: "92%",
          }}
        >
          <FontAwesomeIcon icon={faWindowClose} size="lg" />
        </Button> */}
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
