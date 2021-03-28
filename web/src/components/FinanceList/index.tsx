import { useContext, useEffect } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import { TypesContext } from '../../contexts/TypesContext'
import { FinancesContext } from '../../contexts/FinancesContext'

import './styles.css';

export interface FinanceItem {
    id: number,
    title: string,
    value: number,
    id_user: number,
    id_type: number
}

export default function FinanceList() {

    const { 
        getTypeTitle, 
        refreshTypes 
    } = useContext(TypesContext);

    const { 
        finances, 
        getFormattedValue, 
        deleteFinance, 
        refreshFinances, 
        setSelectedFinanceId 
    } = useContext(FinancesContext);

    useEffect(() => {
        refreshFinances();
        refreshTypes();
    }, []);

    function editFinance(id: FinanceItem["id"]) {
        setSelectedFinanceId(id);
    }

    return (
        <table className="finance-table">
            <thead>
                <tr>
                    <th className="th-title" >Título</th>
                    <th className="th-type" >Tipo</th>
                    <th className="th-value" >Valor</th>
                    <th className="th-buttons" ></th>
                </tr>
            </thead>
            <tbody>
                {finances.map((finance) => (
                    <tr key={finance.id}>
                        <td className="td-title" >
                            {finance.title}
                        </td>
                        <td className="td-type" >
                            {getTypeTitle(finance.id_type)}
                        </td>
                        <td className="td-value" >
                            {getFormattedValue(finance.value)}
                        </td>
                        <td className="td-buttons" >
                            <div>
                                <EditIcon className="button" onClick={() => editFinance(finance.id)}/>
                                <DeleteIcon className="button" onClick={() => deleteFinance(finance.id)} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}