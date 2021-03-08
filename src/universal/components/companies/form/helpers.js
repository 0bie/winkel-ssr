import React from 'react';

export function renderSelectOptions(option) {

    if (!option || typeof option !== 'object') {
        throw new Error('renderSelectOptions requires a valid object');
    }
    return (
        <option value={option.id} key={option.name}>
            {option.name}
        </option>
    )

}
