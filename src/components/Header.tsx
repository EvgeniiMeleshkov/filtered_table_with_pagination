import React, {ChangeEvent} from 'react';
import ColumnNameSelector from './ColumnNameSelector';
import FilterSelector from './FilterSelector';

type HeaderPropsType = {
    onButtonHandler: () => void
    setColumnNameSelectorValue: (value: string) => void
    setFilterSelectorValue: (value: string) => void
    filter: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    filterSelectorValue: string
}

const Header = ({
                    filter,
                    filterSelectorValue,
                    value,
                    onButtonHandler,
                    setFilterSelectorValue,
                    setColumnNameSelectorValue
                }: HeaderPropsType) => {
    return (
        <header className="App-header">
            <button onClick={onButtonHandler}>GetData</button>
            <ColumnNameSelector setColumnNameSelectorValue={setColumnNameSelectorValue}/>
            <FilterSelector setFilterSelectorValue={setFilterSelectorValue}/>
            <input onChange={filter} value={value}/>
        </header>

    );
};

export default Header;