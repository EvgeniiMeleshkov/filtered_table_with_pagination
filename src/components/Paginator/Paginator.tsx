import React from 'react';

type PaginatorPropsType = {
    pages: number[]
    currentPageCallBack: (page: number) => void
}

const Paginator = ({pages, currentPageCallBack}: PaginatorPropsType) => {

    let data = pages.map(p => <li key={p}>
        <a className="page-link" href="#" onClick={()=>currentPageCallBack(p)}>{p}</a>
    </li>)

    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                </li>
                {data}
                <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    );
};

export default Paginator;