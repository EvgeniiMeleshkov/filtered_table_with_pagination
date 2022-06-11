import React from 'react';

type PaginatorPropsType = {
    disableNext: string
    disablePrevious: string
    currentPage: number
    pages: number[]
    isActive: string
    onNext: () => void
    onPrevious: () => void
    currentPageCallBack: (page: number) => void
}

const Paginator = ({
                       pages,
                       currentPage,
                       isActive,
                       disablePrevious,
                       disableNext,
                       onNext,
                       onPrevious,
                       currentPageCallBack}: PaginatorPropsType) => {

    let data = pages.map(p => <li className={currentPage === p ? `page-item ${isActive}` : 'page-item'} key={p}>
        <a className="page-link" href="#" onClick={()=>currentPageCallBack(p)}>{p}</a>
    </li>
    )

    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className={`page-item ${disablePrevious}`}>
                    <a className="page-link" href="#" tabIndex = {-1} onClick={onPrevious}>Previous</a>
                </li>
                {data}
                <li className={`page-item ${disableNext}`}>
                    <a className="page-link" href="#" onClick={onNext}>Next</a>
                </li>
            </ul>
        </nav>
    );
};

export default Paginator;