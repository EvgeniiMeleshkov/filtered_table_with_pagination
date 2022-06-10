import React from 'react';

import {ResponseType} from '../App';

type TableDataPropsType = {
    data: ResponseType
}

const TableData = ({data}: TableDataPropsType) => {

    let tableData = data.map(el => {
        return (<tr key={el.index}>
            <td>{el.date.toLocaleString()}</td>
            <td>{el.name}</td>
            <td>{el.amount}</td>
            <td>{el.distance}</td>
        </tr>)
    })
    return (
        <tbody>
        {tableData}
        </tbody>
    );
};

export default TableData;