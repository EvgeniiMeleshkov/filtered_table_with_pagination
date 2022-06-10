import React, {ChangeEvent} from 'react';
import ColumnNameSelector from './ColumnNameSelector';
import FilterSelector from './FilterSelector';

type HeaderPropsType = {
    onButtonHandler: () => void
    setColumnNameSelectorValue: (value: string) => void
    setFilterSelectorValue: (value: string) => void
    filter: (e: ChangeEvent<HTMLInputElement>) => void
    searchCallBack: () => void
    resetCallBack: () => void
    value: string
    filterSelectorValue: string
}

const Header = ({
                    filter,
                    resetCallBack,
                    searchCallBack,
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

                    <button onClick={searchCallBack}>search</button>
                    <button onClick={resetCallBack}>reset search</button>

        </header>

    );
};

export default Header;