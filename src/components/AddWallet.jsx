import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { useUser } from "../context/UserContext";

import { addWallet } from "../helpers/requests";

export default function AddWallet() {
  const { dispatch } = useUser();
  const [fields, setFields] = useState({
    name: "TEST",
    description: "TEST DESCRIPTION",
    balance: 12200.0,
  });

  const [redirect, setRedirect] = useState(null);
  const { description, balance, currency, name } = fields;

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <React.Fragment>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { err, data } = await addWallet(fields);
          if (err) {
            toast.error(err.response.data.error);
          } else {
            dispatch({
              type: "set-user",
              payload: data,
            });
            setRedirect("/wallets");
          }
        }}
      >
        <label>Nombre</label>
        <input name="name" value={name} type="text" onChange={handleChange} />
        <label>Descripcion</label>
        <input
          name="description"
          value={description}
          type="text"
          onChange={handleChange}
        />
        <label>Monto Inicial</label>
        <input
          name="balance"
          value={balance}
          type="number"
          onChange={handleChange}
        />
        <label>Seccion</label>

        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}
