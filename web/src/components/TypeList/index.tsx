import { useContext, useEffect } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import { TypesContext } from '../../contexts/TypesContext'

import './styles.css';

interface TypeItem {
    id: number;
    title: string;
    is_income: boolean;
    id_user: number;
}

export default function TypeList() {

    const { 
        types,
        refreshTypes,
        setSelectedTypeId,
        getIsIncomeLabel,
        deleteType
    } = useContext(TypesContext);

    useEffect(() => {
        refreshTypes();
    }, []);

    function editType(id: TypeItem["id"]) {
        setSelectedTypeId(id);
    }

    return (
        <table className="type-table">
            <thead>
                <tr>
                    <th className="th-title" >Título</th>
                    <th className="th-category" >Categoria</th>
                    <th className="th-buttons" ></th>
                </tr>
            </thead>
            <tbody>
                {types.map((type) => (
                    <tr key={type.id}>
                        <td className="td-title" >
                            {type.title}
                        </td>
                        <td className="td-category" >
                            {getIsIncomeLabel(type.is_income)}
                        </td>
                        <td className="td-buttons" >
                            <div>
                                <EditIcon className="button" onClick={() => editType(type.id)}/>
                                <DeleteIcon className="button" onClick={() => deleteType(type.id)} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}