import React, { useEffect, useState } from 'react'
import TableBtn from '../../Buttons/TableBtn'
import {map} from 'lodash'
import { t } from 'i18next'
export const ExpensesTableRow = ({

    data,
    currentPage,
    countPage,
    currency,
    reports,
    Delete,
    
}) => {
    const typeofexpense = (type) => {
        
        switch (type) {
            case 'cash':
                return 'Naqt'
            case 'card':
                return 'Plastik'
            case 'transfer':
                return "O'tkazma"
            default:
                return ''
        }
    }
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
        useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        }, []);
    return (
        <>
            {map(data,(expense, index) => (
                !isMobile?<tr className='tr' key={expense._id}>
                    <td className='text-left td'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='text-right td'>
                        {new Date(expense.createdAt).toLocaleDateString()}
                    </td>
                    <td className='text-right td font-medium'>
                        {currency === 'USD' ? expense.sum: expense.sumuzs.toLocaleString('ru-Ru')}{' '}
                        <span>{currency}</span>
                    </td>
                    <td className='text-left td'>{expense.comment}</td>
                    <td className='text-left py-[0.625rem] td'>
                        {typeofexpense(expense.type)}
                    </td>
                    {!reports && (
                        <td className='border-r-0 py-[0.625rem] td'>
                            <div className='flex items-center justify-center'>
                                <TableBtn
                                    type={'delete'}
                                    bgcolor={'bg-error-500'}
                                    onClick={() => Delete(expense)}
                                />
                            </div>
                        </td>
                    )}
                </tr>:
                <li className='text-sm w-[90vw]  bg-[white] rounded-lg mb-2 list-none'>
                <li className='border p-[10px] text-sm flex justify-between border-s-0 border-t-0 border-e-0'>
                    <p ><span >{currentPage * countPage + 1 + index}- </span> 
                    {new Date(expense.createdAt).toLocaleDateString()}
                    </p>    
                    <p className='text-[green]'><span>{t('Summa')}: </span>
                    {currency === 'USD' ? expense.sum: expense.sumuzs.toLocaleString('ru-Ru')}{' '}
                        <span>{currency}</span>
                    </p>
                </li>
                <li className=' p-[10px] text-sm flex justify-between '>
                    <p className='text-[red]' ><span >Izoh: </span> 
                    {expense.comment}
                    
                    </p>    
                    <p className='text-[green]'><spa>Turi: </spa>
                    {typeofexpense(expense.type)}
                    </p>
                </li>
                
            </li>
            ))}
        </>
    )
}
