import React, { useState, useEffect } from 'react';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import TitleAndSubtitle from './TitleAndSubtitle';
import ItemList from "./common/ItemList"
import List from "./common/ListContainer"

import { getWallets, deleteWallet } from '../helpers/requests'

function WalletItem({ _id, name, setWallets }) {
    const handleDelete = async () => {
        if (window.confirm(`Eliminar billetera ${name}?`)) {
            const { data } = await deleteWallet(_id)
            setWallets(data)
        }
    }

    return (
        <ItemList action={handleDelete} icon={faTrash}>
            {name}
        </ItemList>
    )
}

export default function DeleteWallet() {

    const [wallets, setWallets] = useState([])

    useEffect(() => {
        async function fetchWallets() {
            const { data } = await getWallets();
            setWallets(data);
        }

        fetchWallets()

    }, []);


    return (
        <React.Fragment>
            <TitleAndSubtitle title="Eliminar billetera" />

            {wallets &&
                <List>
                    {wallets.map((wallet) => (
                        <WalletItem key={wallet._id} setWallets={setWallets} {...wallet} />
                    ))}
                </List>
            }

        </React.Fragment>
    )
}