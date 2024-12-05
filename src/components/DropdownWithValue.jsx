import React from 'react';
import { Dropdown as PrimeDropdown } from 'primereact/dropdown';

export const DropdownWithValue = ({ items, value, onChange, classError, disabled }) => {
    return (
        <PrimeDropdown
            value={value} // Usa el valor controlado por el padre
            onChange={onChange} // Llama al onChange del padre directamente
            options={items}
            optionLabel="name"
            optionValue="val"
            placeholder="Selecciona una opción"
            className={`w-full mb-3 ${classError}`}
            disabled={disabled}
        />
    );
};
