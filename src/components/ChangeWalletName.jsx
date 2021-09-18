import React, { useState, useEffect } from 'react';

import TitleAndSubtitle from './TitleAndSubtitle';

import { getWallets, changeWalletName } from '../helpers/requests'

function WalletItem({ _id, name, setWallets }) {
    const handleChange = async () => {
        const newName = window.prompt("Nuevo nombre", name)
        if ((newName != name) & (newName.length > 0)) {
            console.log("Cambiar nombre")
            const resp = changeWalletName(_id, newName)
        }
    }

    return (
        <li>
            {name}
            <button onClick={handleChange}>Cambiar Nombre</button>
        </li>
    )
}

export default function DeleteWallet() {

    const [wallets, setWallets] = useState([])

    useEffect(() => {
        async function fetchWallets() {
            console.log("Fetching wallets list for change")
            const { data } = await getWallets();
            setWallets(data);
        }

        fetchWallets()

    }, []);


    return (
        <React.Fragment>
            <TitleAndSubtitle title="Eliminar billetera" />

            {wallets &&
                <ul>
                    {wallets.map((wallet) => (
                        <WalletItem key={wallet._id} setWallets={setWallets} {...wallet} />
                    ))}
                </ul>
            }

        </React.Fragment>
    )
}