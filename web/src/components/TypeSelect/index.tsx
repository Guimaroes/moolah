import { useContext } from "react";
import { TypesContext } from "../../contexts/TypesContext";

import './styles.css';

export default function TypeSelect() {
    
    const { types, selectedType, setSelectedTypeId } = useContext(TypesContext);

    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        
        var id: number =+ e.target.value;

        setSelectedTypeId( id );
    }

    return (

        <select onChange={handleSelect}
            name="types" 
            className="type-select" 
            value={selectedType ? selectedType.id : 'default'}
        >
            <option value="default" disabled hidden>Tipo</option>
            <optgroup label="Receitas" >
                {types.map((type) => type.is_income && <option key={type.id} value={type.id}>{type.title}</option>)}
            </optgroup>
            <optgroup label="Despesas">
                {types.map((type) => ! type.is_income && <option key={type.id} value={type.id}>{type.title}</option>)}
            </optgroup>
        </select>
    )
}