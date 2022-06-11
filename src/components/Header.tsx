import React, {ChangeEvent} from 'react';
import ColumnNameSelector from './ColumnNameSelector';
import FilterSelector from './FilterSelector';

type HeaderPropsType = {
    setColumnNameSelectorValue: (value: string) => void
    setFilterSelectorValue: (value: string) => void
    filter: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
}

const Header = ({
                    filter,
                    value,
                    setFilterSelectorValue,
                    setColumnNameSelectorValue
                }: HeaderPropsType) => {
    return (
        <header className="App-header">
            <ColumnNameSelector setColumnNameSelectorValue={setColumnNameSelectorValue}/>
            <FilterSelector setFilterSelectorValue={setFilterSelectorValue}/>
            <input className='filterInput' onChange={filter} value={value}/>
        </header>

    );
};

export default Header;