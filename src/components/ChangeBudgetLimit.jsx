import React, { useState, useEffect } from 'react';
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify"
import TitleAndSubtitle from './common/TitleAndSubtitle';
import ItemList from "./common/ItemList"
import List from "./common/ListContainer"

import { getBudgets, configureBudget } from '../helpers/requests'

function BudgetItem({ limit, section }) {
    const handleChange = async () => {
        const newLimit = parseFloat(window.prompt("Nuevo limite", limit))
        if ((newLimit !== limit) & (newLimit > 0)) {
            const { message } = await configureBudget(section, newLimit)
            toast.success(message)
        }
    }

    return (
        <ItemList action={handleChange} icon={faPen}>
            {section}
        </ItemList>
    )
}

export default function ChangeBudgetLimit() {

    const [budgets, setBudgets] = useState([])

    useEffect(() => {
        async function fetchData() {
            const { data } = await getBudgets();
            setBudgets(data);
        }

        fetchData()

    }, []);

    return (
        <React.Fragment>
            <TitleAndSubtitle title="Cambiar limite de presupuesto" />

            {budgets &&
                <List>
                    {budgets.map(
                        (b) => (
                            <BudgetItem key={b._id} {...b} />
                        ))
                    }
                </List>
            }

        </React.Fragment>
    )
}