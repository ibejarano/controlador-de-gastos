import React, { useState, useEffect } from 'react';

import { toast } from "react-toastify"
import TitleAndSubtitle from './TitleAndSubtitle';

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
        <li>
            {section}
            <button onClick={handleChange}>Cambiar Limite</button>
        </li>
    )
}

export default function ChangeBudgetLimit() {

    const [budgets, setBudgets] = useState([])

    useEffect(() => {
        async function fetchData() {
            console.log("Fetching Budgets list for change")
            const { data } = await getBudgets();
            setBudgets(data);
        }

        fetchData()

    }, []);
    console.log(budgets)

    return (
        <React.Fragment>
            <TitleAndSubtitle title="Cambiar limite de presupuesto" />

            {budgets &&
                <ul>
                    {budgets.map(
                        (b) => (
                            <BudgetItem key={b._id} {...b} />
                        ))
                    }
                </ul>
            }

        </React.Fragment>
    )
}