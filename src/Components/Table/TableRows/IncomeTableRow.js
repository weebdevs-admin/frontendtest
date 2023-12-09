import { uniqueId, map } from 'lodash'
import React, { useEffect, useState } from 'react'
import TableBtn from '../../Buttons/TableBtn'
import {t} from 'i18next'

export const IncomeTableRow = ({ data, currentPage, countPage, currency, Print }) => {
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
            {map(data, (income, index) => (
                !isMobile?<tr className='tr' key={uniqueId('income')}>
                <td className='text-left td'>
                    {currentPage * countPage + 1 + index}
                </td>
                <td className='text-right td'>
                    {new Date(income.createdAt).toLocaleDateString()}
                </td>
                <td className='text-left td'>{income.saleconnector.id}</td>
                <td className='text-right td font-bold text-error-500'>
                    {(currency === 'USD'
                        ? income.totalincomingprice
                        : income.totalincomingpriceuzs
                    ).toLocaleString('ru-RU')}{' '}
                    <span>{currency}</span>
                </td>
                <td className='text-right td font-bold text-primary-800'>
                    {(currency === 'USD'
                        ? income.totalprice
                        : income.totalpriceuzs
                    ).toLocaleString('ru-RU')}{' '}
                    <span>{currency}</span>
                </td>
                <td className='text-right td py-[0.625rem] font-bold text-warning-500'>
                    {(currency === 'USD'
                        ? income.discount
                        : income.discountuzs
                    ).toLocaleString('ru-RU')}{' '}
                    <span>{currency}</span>
                </td>
                <td className='text-right td font-bold text-success-500'>
                    {(currency === 'USD'
                        ? income.profit
                        : income.profituzs
                    ).toLocaleString('ru-RU')}{' '}
                    <span>{currency}</span>
                </td>
                <td className='text-right border-r-0 td font-bold text-success-500'>
                    <div className='flex items-center justify-center gap-[0.625rem]'>
                        <TableBtn
                            type={'print'}
                            bgcolor={'bg-primary-800'}
                            onClick={() => Print(income.dailyconnector)}
                        />
                    </div>
                </td>
            </tr>:
            <li className='text-sm w-[90vw] h-[150px] bg-[white] rounded-lg m-1 list-none'>
                <li className='border p-[10px] text-sm flex justify-between border-s-0 border-t-0 border-e-0'>
                    <p ><span >{currentPage * countPage + 1 + index}- </span> 
                    {new Date(income.createdAt).toLocaleDateString()}
                    </p>    
                    <p className='text-[green]'><spa>{t('ID:')} </spa>
                    Id: {income.saleconnector.id}
                    </p>
                </li>
                <li className='border p-[10px] text-sm flex justify-between border-s-0 border-t-0 border-e-0'>
                    <p className='text-[red]' ><span >Kelgan: </span> 
                    {(currency === 'USD'
                        ? income.totalincomingprice
                        : income.totalincomingpriceuzs
                    ).toLocaleString('ru-RU')}{' '}
                    <span>{currency}</span>
                    
                    </p>    
                    <p className='text-[green]'><spa>Sotilgan: </spa>
                    {(currency === 'USD'
                        ? income.totalprice
                        : income.totalpriceuzs
                    ).toLocaleString('ru-RU')}{' '}
                    <span>{currency}</span>
                    </p>
                </li>
                <li className='border p-[10px] text-sm flex justify-between border-s-0 border-t-0 border-e-0'>
                    <p className='text-[#FFC300]' ><span >Chegirma: </span> 
                    {(currency === 'USD'
                        ? income.discount
                        : income.discountuzs
                    ).toLocaleString('ru-RU')}{' '}
                    <span>{currency}</span>
                    
                    </p>    
                    <p className='text-[green]'><spa>Foyda: </spa>
                    {(currency === 'USD'
                        ? income.profit
                        : income.profituzs
                    ).toLocaleString('ru-RU')}{' '}
                    <span>{currency}</span>
                    </p>
                </li>
                <div className='flex items-center justify-end p-[3px]'>
                        <TableBtn
                            type={'print'}
                            bgcolor={'bg-primary-800'}
                            onClick={() => Print(income.dailyconnector)}
                        />
                    </div>
            </li>
                
            ))}
        </>
    )
}
