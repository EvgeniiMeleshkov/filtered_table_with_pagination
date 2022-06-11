import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import TableData from './components/TableData';
import axios, {AxiosResponse} from 'axios';
import Loader from './components/Loader/Loader';
import Header from './components/Header';
import TableHead from './components/TableHead';
import Paginator from './components/Paginator/Paginator';

export type ResponseElementType = {
    index: number
    date: Date
    name: string
    amount: number
    distance: number
}
export type ResponseType = Array<ResponseElementType>

function App() {
    const baseUrl = 'https://filltext.com/?rows=500&index={index}&date={date|1-1-1999,1-1-2050}&name={firstName}&amount={number|500}&distance={number|500}'

    const [data, setData] = useState<ResponseType>([])
    const [array, setArray] = useState<ResponseType>([])
    const [filterSelectorValue, setFilterSelectorValue] = useState('contains')
    const [columnNameSelectorValue, setColumnNameSelectorValue] = useState('name')
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get(baseUrl).then((response: AxiosResponse<ResponseType>) => {

            setArray(response.data)
            setIsLoading(false)
        });
    }, [])

    const onButtonHandler = () => {
        setData(array)
        setIsLoading(false)
    }

    const filterInput = (e: ChangeEvent<HTMLInputElement>) => {

        let currentValue = e.target.value
        setValue(currentValue)

        if (filterSelectorValue === 'contains') {
            columnNameSelectorValue === 'name' &&
            setData(data.filter((el) => {
                return el.name.toLowerCase().match(value.toLowerCase())
            }));
            columnNameSelectorValue === 'amount' &&
            setData(data.filter((el) => {
                return el.amount.toString().includes(value);
            }));
            columnNameSelectorValue === 'distance' &&
            setData(data.filter((el) => {
                return el.distance.toString().includes(value)
            }));
        }
    }

    const resetCallBack = () => {
        setData(array)
        setValue('')
    }


    const searchCallBack = () => {
        if (filterSelectorValue === '>') {
            columnNameSelectorValue === 'amount' &&
            setData(data.filter((el) => {
                return el.amount > Number(value)
            }));
            columnNameSelectorValue === 'distance' &&
            setData(data.filter((el) => {
                return el.distance > Number(value)
            }));
            columnNameSelectorValue === 'name' &&
            setData(data.filter((el) => {
                return el.name.toLowerCase() > value.toLowerCase()
            }));
        }
        if (filterSelectorValue === '<') {
            columnNameSelectorValue === 'amount' &&
            setData(data.filter((el) => {
                return el.amount < Number(value)
            }));
            columnNameSelectorValue === 'distance' &&
            setData(data.filter((el) => {
                return el.distance < Number(value)
            }));
            columnNameSelectorValue === 'name' &&
            setData(data.filter((el) => {
                return el.name.toLowerCase() < value.toLowerCase()
            }));
        }
        if (filterSelectorValue === '=') {
            columnNameSelectorValue === 'amount' &&
            setData(data.filter((el) => {
                return el.amount === Number(value)
            }));
            columnNameSelectorValue === 'distance' &&
            setData(data.filter((el) => {
                return el.distance === Number(value)
            }));
            columnNameSelectorValue === 'name' &&
            setData(data.filter((el) => {
                return el.name.toLowerCase() === value.toLowerCase()
            }));
        }
    }


    const limitCountPage = 30
    const [totalRows, setTotalRows] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [disableNext, setDisableNext] = useState('')
    const [isActive, setIsActive] = useState('active')
    const [disablePrevious, setDisablePrevious] = useState('disabled')
    const lastItem = currentPage * limitCountPage
    const firstItem = lastItem - limitCountPage + 1
    const currentPortion = data.slice(firstItem, lastItem)


    const currentPageCallBack = (page: number) => {
        setCurrentPage(page)
        setIsActive('active')
        setDisablePrevious('')
        setDisableNext('')
    }
    useEffect(() => {
        setTotalRows(data.length)
        const portion = totalRows / limitCountPage
        setTotalPages(portion)
    })
    let pages = []
    for (let i = 1; i < totalPages; i++) {
        pages.push(i)
    }
    const onNext = () => {
        if (currentPage > totalPages - 1) {
            setDisableNext('disabled')
            return
        }
        setCurrentPage(currentPage + 1)
        setIsActive('active')
        setDisablePrevious('')
    }
    const onPrevious = () => {
        if (currentPage === 1) {
            setDisablePrevious('disabled')
        } else {
            setCurrentPage(currentPage - 1)
            setIsActive('active')
            setDisableNext('')
        }
    }
    return (
        <div className="container">
            <Header
                filterSelectorValue={filterSelectorValue}
                filter={filterInput}
                value={value}
                searchCallBack={searchCallBack}
                resetCallBack={resetCallBack}
                setColumnNameSelectorValue={setColumnNameSelectorValue}
                setFilterSelectorValue={setFilterSelectorValue}
                onButtonHandler={onButtonHandler}/>
            {data.length !== 0 && <Paginator currentPage={currentPage}
                        isActive={isActive}
                        disablePrevious={disablePrevious}
                        disableNext={disableNext}
                        onPrevious={onPrevious}
                        onNext={onNext}
                        currentPageCallBack={currentPageCallBack}
                        pages={pages}/>}
            <table className="table">
                <TableHead/>
                {!isLoading
                    ?
                    <TableData data={currentPortion}/>
                    :
                    <Loader/>
                }
            </table>

        </div>
    );
}

export default App;
