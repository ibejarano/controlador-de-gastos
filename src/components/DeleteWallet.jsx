import React, { useState, useEffect } from 'react';

import TitleAndSubtitle from './TitleAndSubtitle';

import { getWallets, deleteWallet } from '../helpers/requests'

function WalletItem({ _id, name, setWallets }) {
    const handleDelete = async () => {
        if (window.confirm(`Eliminar billetera ${name}?`)) {
            console.log(_id)
            const { data } = await deleteWallet(_id)
            setWallets(data)
        }
    }

    return (
        <li>
            {name}
            <button onClick={handleDelete}>delete</button>
        </li>
    )
}

export default function DeleteWallet() {

    const [wallets, setWallets] = useState([])

    useEffect(() => {
        async function fetchWallets() {
            console.log("Fetching wallets list for delete")
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