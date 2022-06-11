import React, {ChangeEvent} from 'react';

type FilterSelectorPropsType = {
    setFilterSelectorValue: (value: string) => void
}

const FilterSelector = ({setFilterSelectorValue}: FilterSelectorPropsType) => {
    const select = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectValue = event.currentTarget.value
        setFilterSelectorValue(selectValue)
    }
    return (
        <select onChange={select} name="condition">
            <optgroup label="Condition">
                <option value="contains">{'Contains'}</option>
                <option value=">">{'>'}</option>
                <option value="<">{'<'}</option>
                <option value="=">{'='}</option>
            </optgroup>
        </select>
    );
};

export default FilterSelector;