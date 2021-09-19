import React, { useState, useEffect } from 'react';

import { faPen } from "@fortawesome/free-solid-svg-icons";

import TitleAndSubtitle from './TitleAndSubtitle';
import ItemList from "./common/ItemList"
import List from "./common/ListContainer"

import { getWallets, changeWalletName } from '../helpers/requests'
import { toast } from 'react-toastify';

function WalletItem({ _id, name, setWallets, idx }) {
    const handleChange = async () => {
        const newName = window.prompt("Nuevo nombre", name)

        if (newName) {
            const { data } = await changeWalletName(_id, newName)
            setWallets(prev => {
                prev[idx] = data;
                return [...prev]
            })
            toast.success("Nombre cambiado correctamente.")
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

                    {wallets.map((wallet, idx) => (
                        <WalletItem key={wallet._id} setWallets={setWallets} {...wallet} idx={idx} />
                    ))}
                </List>

            }

        </React.Fragment>
    )
}