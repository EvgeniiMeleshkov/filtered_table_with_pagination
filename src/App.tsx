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
    const baseUrl = 'https://filltext.com/?rows=100&index={index}&date={date|1-1-1999,1-1-2050}&name={firstName}&amount={number|500}&distance={number|500}'

    const [data, setData] = useState<ResponseType>([])
    const [array, setArray] = useState<ResponseType>([])
    const [filterSelectorValue, setFilterSelectorValue] = useState('contains')
    const [columnNameSelectorValue, setColumnNameSelectorValue] = useState('name')
    const [value, setValue] = useState('')

    const onButtonHandler = () => {
        axios.get(baseUrl).then((response: AxiosResponse<ResponseType>) => {
            setArray(response.data)
            setData(response.data)
        })
    }

    const filter = (e: ChangeEvent<HTMLInputElement>) => {
        let currentValue = e.currentTarget.value
        setValue(currentValue)
        searchCallBack()
    }

    const resetCallBack = () => {
        setData(array)
        setValue('')
    }
    const searchCallBack = () => {
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
        if (filterSelectorValue === '>') {
            columnNameSelectorValue === 'amount' &&
            setData(data.filter((el) => {
                return el.amount > parseInt(value)
            }));
            columnNameSelectorValue === 'distance' &&
            setData(data.filter((el) => {
                return el.distance > parseInt(value)
            }));
            columnNameSelectorValue === 'name' &&
            setData(data.filter((el) => {
                return el.name.toLowerCase() > value.toLowerCase()
            }));
        }
        if(filterSelectorValue === '<'){
            columnNameSelectorValue === 'amount' &&
            setData(data.filter((el) => {
                return el.amount < parseInt(value)
            }));
            columnNameSelectorValue === 'distance' &&
            setData(data.filter((el) => {
                return el.distance < parseInt(value)
            }));
            columnNameSelectorValue === 'name' &&
            setData(data.filter((el) => {
                return el.name.toLowerCase() < value.toLowerCase()
            }));
        }
        if(filterSelectorValue === '='){
            columnNameSelectorValue === 'amount' &&
            setData(data.filter((el) => {
                return el.amount === parseInt(value)
            }));
            columnNameSelectorValue === 'distance' &&
            setData(data.filter((el) => {
                return el.distance === parseInt(value)
            }));
            columnNameSelectorValue === 'name' &&
            setData(data.filter((el) => {
                return el.name.toLowerCase() === value.toLowerCase()
            }));
        }
    }


    const limitCountPage = 10
    const [totalRows, setTotalRows] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const lastItem = currentPage * limitCountPage
    const firstItem = lastItem - limitCountPage + 1
    const currentPortion = data.slice(firstItem, lastItem)



    const currentPageCallBack = (page: number) => {
        setCurrentPage(page)
        console.log('hi')
    }
    useEffect(()=>{
        setTotalRows(data.length)
        const portion = totalRows/limitCountPage
        setTotalPages(portion)
    })
    let pages = []
    for (let i = 1; i < totalPages; i++) {
        pages.push(i)
    }
    return (
        <div className="container">
            <Header
                filterSelectorValue={filterSelectorValue}
                filter={filter}
                value={value}
                searchCallBack={searchCallBack}
                resetCallBack={resetCallBack}
                setColumnNameSelectorValue={setColumnNameSelectorValue}
                setFilterSelectorValue={setFilterSelectorValue}
                onButtonHandler={onButtonHandler}/>
            <Paginator currentPageCallBack={currentPageCallBack} pages={pages}/>
            <table className="table">
                <TableHead/>
                {data.length !== 0
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
