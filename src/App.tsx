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
    const baseUrl = 'https://filltext.com/?rows=500&index={index}&date={date|1-1-1999,1-1-2030}&name={firstName}&amount={number|1000}&distance={number|1000}'
//----useState for App-------------------------------------------------
    const [data, setData] = useState<ResponseType>([])
    const [array, setArray] = useState<ResponseType>([])
    const [filterSelectorValue, setFilterSelectorValue] = useState('contains')
    const [columnNameSelectorValue, setColumnNameSelectorValue] = useState('name')
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
//---------------------------------------------------------------------
//---------Getting data from server------------------------------------
    useEffect(() => {
        setIsLoading(true)
        axios.get(baseUrl).then((response: AxiosResponse<ResponseType>) => {
            setArray(response.data)
            setIsLoading(false)
        });
    }, [])
//---------------------------------------------------------------------
//--------CallBack to show data----------------------------------------
    const onButtonHandler = () => {
        setData(array)
        setIsLoading(false)
    }
//---------------------------------------------------------------------
//---------Getting value from search field-----------------------------
    const filterInput = (e: ChangeEvent<HTMLInputElement>) => {
        let currentValue = e.target.value
        setValue(currentValue)
    }
//---------------------------------------------------------------------
//----------Filter logic---------(may be a little bit strange...probably, something wrong with data from server)
    const getFilteredData: any = (filter: string) => {
        if (!value) {
            return data
        }
        if (filter === 'contains') {
            if (columnNameSelectorValue === 'name') {
                return data.filter(el => {
                    return el['name'].toLowerCase().includes(value.toLowerCase())
                })
            }
            if (columnNameSelectorValue === 'amount') {
                return data.filter(el => {
                    return el['amount'].toString().toLowerCase().includes(value.toLowerCase())
                })
            }
            if (columnNameSelectorValue === 'distance') {
                return data.filter(el => {
                    return el['distance'].toString().toLowerCase().includes(value.toLowerCase())
                })
            }
        }
        if (filter === '=') {
            if (columnNameSelectorValue === 'name') {
                return data.filter(el => {
                    return el['name'].toLowerCase() === (value.toLowerCase())
                })
            }
            if (columnNameSelectorValue === 'amount') {
                return data.filter(el => {
                    return el['amount'].toString().toLowerCase() === (value.toLowerCase())
                })
            }
            if (columnNameSelectorValue === 'distance') {
                return data.filter(el => {
                    return el['distance'].toString().toLowerCase() === (value.toLowerCase())
                })
            }
        }
        if (filter === '>') {
            if (columnNameSelectorValue === 'name') {
                return data.filter(el => {
                    return el['name'].toLowerCase() > (value.toLowerCase())
                })
            }
            if (columnNameSelectorValue === 'amount') {
                return data.filter(el => {
                    return el['amount'].toString().toLowerCase() > (value.toLowerCase())
                })
            }
            if (columnNameSelectorValue === 'distance') {
                return data.filter(el => {
                    return el['distance'].toString().toLowerCase() > (value.toLowerCase())
                })
            }
        }
        if (filter === '<') {
            if (columnNameSelectorValue === 'name') {
                return data.filter(el => {
                    return el['name'].toLowerCase() < (value.toLowerCase())
                })
            }
            if (columnNameSelectorValue === 'amount') {
                return data.filter(el => {
                    return el['amount'].toString().toLowerCase() < (value.toLowerCase())
                })
            }
            if (columnNameSelectorValue === 'distance') {
                return data.filter(el => {
                    return el['distance'].toString().toLowerCase() < (value.toLowerCase())
                })
            }
        }
    }
//------------------------assign filtered result to array filteredData----------------------
    let filteredData: ResponseType = getFilteredData(filterSelectorValue)
//---------------------------useStates for pagination---------------------------------------
    const limitCountPage = 30
    const [totalRows, setTotalRows] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [disableNext, setDisableNext] = useState('')
    const [isActive, setIsActive] = useState('active')
    const [disablePrevious, setDisablePrevious] = useState('disabled')
    const lastItem = currentPage * limitCountPage
    const firstItem = lastItem - limitCountPage + 1
    const currentPortion = filteredData!.slice(firstItem, lastItem)

//---------------pagination callBacks-----&------useEffect---------------------------------
    const currentPageCallBack = (page: number) => {
        setCurrentPage(page)
        setIsActive('active')
        setDisablePrevious('')
        setDisableNext('')
    }

    useEffect(() => {
        setTotalRows(filteredData!.length)
        const portion = Math.ceil(totalRows / limitCountPage)
        setTotalPages(portion)
    }, [filteredData, totalRows])

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
//--------------------------------J----S----X---------------------------------------------
    return (
        <div className="container">
            <Header
                filter={filterInput}
                value={value}
                setColumnNameSelectorValue={setColumnNameSelectorValue}
                setFilterSelectorValue={setFilterSelectorValue}
                onButtonHandler={onButtonHandler}/>

            {data.length !== 0 &&
                <Paginator
                    currentPage={currentPage}
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
