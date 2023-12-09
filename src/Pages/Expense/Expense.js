import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import Button from '../../Components/Buttons/BtnAddRemove'
import {
    clearSuccessRegister,
    deleteExpense,
    getExpense,
    registerExpense,
} from './expenseSlice'
import SearchForm from '../../Components/SearchForm/SearchForm'
import Pagination from '../../Components/Pagination/Pagination'
import Table from '../../Components/Table/Table'
import {universalToast} from '../../Components/ToastMessages/ToastMessages'
import {useTranslation} from 'react-i18next'
import {universalSort} from './../../App/globalFunctions'

const Expense = () => {
    const {t} = useTranslation(['common'])
    const dispatch = useDispatch()
    const {
        market: {_id},
    } = useSelector((state) => state.login)
    const {currencyType, currency} = useSelector((state) => state.currency)
    const {expenses, count, successRegister} = useSelector(
        (state) => state.expense
    )
    const [data, setData] = useState(expenses)
    const [storeData, setStoreData] = useState(expenses)
    const [currentPage, setCurrentPage] = useState(0)
    const [countPage, setCountPage] = useState(10)
    const [startDate, setStartDate] = useState(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        ).toISOString()
    )
    const [endDate, setEndDate] = useState(
        new Date(new Date().setHours(23, 59, 59, 59)).toISOString()
    )

    const [sorItem, setSorItem] = useState({
        filter: '',
        sort: '',
        count: 0,
    })
    const [expense, setExpense] = useState({
        sum: '',
        sumuzs: '',
        type: '',
        comment: '',
        market: _id,
    })
    const [expenseType, setExpenseType] = useState({
        label: t('Turi'),
        value: '',
    })

    const types = [
        {
            label: t('Naqd'),
            value: 'cash',
        },
        {
            label: t('Plastik'),
            value: 'card',
        },
        {
            label: t("O'tkazma"),
            value: 'transfer',
        },
    ]

    const handleChangeInput = (e, key) => {
        let target = e.target.value
        if (key === 'comment') {
            setExpense({
                ...expense,
                comment: target,
            })
        }
        if (key === 'sum') {
            setExpense({
                ...expense,
                sum:
                    currencyType === 'USD'
                        ? Number(target)
                        : Math.round((target / currency) * 1000) / 1000,
                sumuzs:
                    currencyType === 'UZS'
                        ? Number(target)
                        : Math.round(target * currency * 1000) / 1000,
            })
        }
        if (key === 'sum' && e.target.value === '') {
            setExpense({
                ...expense,
                sum: '',
                sumuzs: '',
            })
        }
    }

    const handleChangeSelect = (e) => {
        setExpenseType({
            label: e.label,
            value: e.value,
        })
        setExpense({
            ...expense,
            type: e.value,
        })
    }

    const checkExpense = () => {
        if (expense.sum < 0.01) {
            return universalToast('Xarajat narxini kiritin', 'warning')
        }
        if (!expense.comment) {
            return universalToast('Xarajat izohini kiriting', 'warning')
        }
        if (!expense.type) {
            return universalToast('Xarajat turini kiriting', 'warning')
        }
        return false
    }

    const createExpense = () => {
        let body = {
            currentPage,
            countPage,
            expense,
        }
        if (!checkExpense(expense)) {
            dispatch(registerExpense(body))
        }
    }

    const removeExpense = (expense) => {
        let body = {
            currentPage,
            countPage,
            _id: expense._id,
        }
        dispatch(deleteExpense(body))
    }

    const clearForm = useCallback(() => {
        setExpense({
            sum: '',
            sumuzs: '',
            type: '',
            comment: '',
            market: _id,
        })
        setExpenseType({
            label: t('Turi'),
            value: '',
        })
    }, [_id, t])

    const onKeyCreate = (e) => {
        if (e.key === 'Enter') {
            createExpense()
        }
    }

    useEffect(() => {
        let body = {
            currentPage,
            countPage,
            startDate,
            endDate,
        }
        dispatch(getExpense(body))
    }, [dispatch, currentPage, countPage, startDate, endDate])

    useEffect(() => {
        if (successRegister) {
            clearForm()
            dispatch(clearSuccessRegister())
        }
    }, [dispatch, successRegister, clearForm])

    const filterData = (filterKey) => {
        if (filterKey === sorItem.filter) {
            switch (sorItem.count) {
                case 1:
                    setSorItem({
                        filter: filterKey,
                        sort: '1',
                        count: 2,
                    })
                    universalSort(data, setData, filterKey, 1, storeData)
                    break
                case 2:
                    setSorItem({
                        filter: filterKey,
                        sort: '',
                        count: 0,
                    })
                    universalSort(data, setData, filterKey, '', storeData)
                    break
                default:
                    setSorItem({
                        filter: filterKey,
                        sort: '-1',
                        count: 1,
                    })
                    universalSort(data, setData, filterKey, -1, storeData)
            }
        } else {
            setSorItem({
                filter: filterKey,
                sort: '-1',
                count: 1,
            })
            universalSort(data, setData, filterKey, -1, storeData)
        }
    }

    useEffect(() => {
        setData(expenses)
        setStoreData(expenses)
    }, [expenses])

    const headers = [
        {
            title: '№',
            styles: 'w-[7%]',
        },
        {
            title: t('Sana'),
            styles: 'w-[10%]',
            filter: 'createdAt',
        },
        {
            title: t('Summa'),
            styles: 'w-[20%]',
        },
        {
            title: t('Izoh'),
        },
        {
            title: t('Turi'),
        },
        {
            title: '',
            styles: 'w-[5%]',
        },
    ]

    return (
        <div className='pt-[1rem]'>
            <div className='flex items-center gap-[1.25rem] mainPadding'>
                <FieldContainer
                    value={
                        currencyType === 'USD' ? expense.sum : expense.sumuzs
                    }
                    onChange={(e) => handleChangeInput(e, 'sum')}
                    label={t('Narxi')}
                    placeholder={'misol: 100'}
                    maxWidth={'w-[21.75rem]'}
                    type={'number'}
                    border={true}
                    onKeyUp={onKeyCreate}
                />
                <FieldContainer
                    value={expense.comment}
                    onChange={(e) => handleChangeInput(e, 'comment')}
                    label={t('Izoh')}
                    placeholder={t('misol: soliq uchun')}
                    maxWidth={'w-[21.75rem]'}
                    type={'text'}
                    border={true}
                    onKeyUp={onKeyCreate}
                />
                <FieldContainer
                    value={expenseType}
                    onChange={handleChangeSelect}
                    label={t('Xarajat turi')}
                    placeholder={t('misol: Dilso`z')}
                    select={true}
                    options={types}
                    maxWidth={'w-[21rem]'}
                    onKeyUp={onKeyCreate}
                />
            </div>
            <div className='mainPadding flex justify-end'>
                <div className={'flex gap-[1.25rem] w-[19.5rem]'}>
                    <Button
                        onClick={createExpense}
                        add={createExpense}
                        text={t('Yangi xarajat yaratish')}
                    />
                    <Button onClick={clearForm} text={t('Tozalash')} />
                </div>
            </div>
            <div className='mainPadding'>
                <Pagination
                    countPage={countPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalDatas={count}
                />
            </div>
            <div className='pt-[0.625rem]'>
                <SearchForm
                    filterBy={['total', 'startDate', 'endDate']}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    filterByTotal={(e) => setCountPage(e.value)}
                    startDate={new Date(startDate)}
                    endDate={new Date(endDate)}
                />
            </div>
            {expenses && (
                <div className='tableContainerPadding'>
                    <Table
                        page={'expenses'}
                        headers={headers}
                        data={data}
                        reports={false}
                        Delete={removeExpense}
                        currentPage={currentPage}
                        countPage={countPage}
                        currency={currencyType}
                        Sort={filterData}
                        sortItem={sorItem}
                    />
                </div>
            )}
        </div>
    )
}

export default Expense
