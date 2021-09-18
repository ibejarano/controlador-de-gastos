import React, { useState, useEffect } from 'react';

import { faPen } from "@fortawesome/free-solid-svg-icons";

import TitleAndSubtitle from './TitleAndSubtitle';
import ItemList from "./common/ItemList"
import List from "./common/ListContainer"

import { getWallets, changeWalletName } from '../helpers/requests'
import { toast } from 'react-toastify';

function WalletItem({ _id, name, setWallets }) {
    const handleChange = async () => {
        const newName = window.prompt("Nuevo nombre", name)
        if ((newName !== name) & (newName)) {
            const { message } = changeWalletName(_id, newName)
            toast.success(message)
        }
    }

    return (
        <ItemList action={handleChange} icon={faPen}>
            {name}
        </ItemList>
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
            <TitleAndSubtitle title="Cambiar nombre de billetera" />

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