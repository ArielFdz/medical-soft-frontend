import React, { useState } from 'react'
import { Dropdown as PrimeDropdown } from 'primereact/dropdown'

export const Dropdown = ({items, onChange, classError}) => {

    const [selectedItem, setSelectedItem] = useState(null);
    const handleChange = (e) => {
        console.log(e.value);
        setSelectedItem(e.value);
        if (onChange) {
          onChange(e);
        }
      };

  return (
    <>
    <PrimeDropdown value={selectedItem} onChange={handleChange} options={items} optionLabel="name" 
            optionValue='val' placeholder="Selecciona una opción" className={`w-full mb-3 ${classError}`}   />
    </>
  )
}
