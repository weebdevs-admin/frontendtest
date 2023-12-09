import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import { map } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { roundUsd, roundUzs } from '../../../App/globalFunctions'
import { useTranslation } from 'react-i18next'

export const CategoryTableMobileRow = ({
    data,
    currentPage,
    countPage,
    Edit,
    Delete,
    startDate, 
    endDate
}) => {
    const navigate = useNavigate()
    const { currencyType } = useSelector((state) => state.currency)
    const {t} = useTranslation(['common'])
    return (
        <>
            {map(data, (category, index) => (
               
                <li className='text-sm w-[90vw] h-[150px] bg-[white] rounded-lg m-1 list-none'>
                    <li className='flex justify-between p-[10px] border border-b-1 border-s-0 border-t-0 border-e-0'><p>{category.code}-{category.name}</p> <p className='text-[blue]'>Sotilganlar soni: {category?.totalproducts}</p></li>
                    <p className='m-[10px] text-[#19737A]'>{t('Sotilganlar Jami')}: {currencyType === 'USD' ? roundUsd(category?.totalsales).toLocaleString('ru-RU') : roundUzs(category?.totalsalesuzs).toLocaleString('ru-RU')} {currencyType} </p><br/>
                    <p className='ms-[10px] mt-[-5px] text-[green]'>{t('Sof foyda')}: {currencyType === 'USD' ? roundUsd(category?.profit).toLocaleString('ru-RU') : roundUzs(category?.profituzs).toLocaleString('ru-RU')} {currencyType}</p>
                    <li className='flex items-center justify-end p-[10px]'>
                    <TableBtn
                                type={'report'}
                                bgcolor='bg-primary-800 mr-2.5'
                                onClick={() => navigate(category.code, {
                                    state: {
                                        id: category._id,
                                        name: category.name,
                                        startDate,
                                        endDate
                                    }
                                })}
                            />
                        <TableBtn
                            type={'edit'}
                            bgcolor='bg-warning-500'
                            onClick={() => Edit(category)}
                        />
                        <TableBtn
                            type={'delete'}
                            bgcolor='bg-error-500 ml-2.5'
                            onClick={() => Delete(category)}
                        />
                    </li>
                </li>
            
            ))}
        </>
    )
}
