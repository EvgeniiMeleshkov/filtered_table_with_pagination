import React from 'react';

export type ColumnNameSelectorValueType = 'name' | 'amount' | 'distance'
type ColumnNameSelectorPropsType = {
    setColumnNameSelectorValue: (value: ColumnNameSelectorValueType) => void
}

const ColumnNameSelector = ({setColumnNameSelectorValue}: ColumnNameSelectorPropsType) => {
    const select = (event: any) => {
        const selectValue = event.currentTarget.value
        console.log(selectValue)
        setColumnNameSelectorValue(selectValue)
    }
    return (
        <select onChange={select} name="column">
            <optgroup label="Column">
                <option value="name">Name</option>
                <option value="amount">Amount</option>
                <option value="distance">Distance</option>
            </optgroup>
        </select>
    );
};

export default ColumnNameSelector;