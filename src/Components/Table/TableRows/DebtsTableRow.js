import {uniqueId, map} from 'lodash'
import React, {useState} from 'react'
import TableBtn from '../../Buttons/TableBtn'
import { useEffect } from 'react'
import { t } from 'i18next'

export const DebtsTableRow = ({data, currency, Pay, Print, Edit}) => {
    const [isEditComment, setIsEditComment] = useState(null)
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
            {map(data, (debt, index) => (
                !isMobile?<tr className='tr' key={uniqueId('debt')}>
                    <td className='text-left td'>{1 + index}</td>
                    <td className='text-right td'>
                        {new Date(debt.createdAt).toLocaleDateString()}
                    </td>
                    <td className='text-right td'>{debt.id}</td>
                    <td className='text-left td'>
                        {debt.client && debt.client.name}
                    </td>
                    <td
                        onMouseOver={() => setIsEditComment(debt._id)}
                        onMouseOut={() => setIsEditComment(null)}
                        className={`text-left td relative hover:bg-black-200 transition duration-300 ease-in-out`}
                    >
                        {debt.comment}
                        {isEditComment === debt._id && (
                            <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                                <TableBtn
                                    type={'edit'}
                                    bgcolor={'bg-warning-500'}
                                    onClick={() =>
                                        Edit(debt.comment, debt.debtid)
                                    }
                                />
                            </span>
                        )}
                    </td>
                    <td className='text-right td font-medium'>
                        {(currency === 'USD'
                            ? debt.totalprice
                            : debt.totalpriceuzs
                        ).toLocaleString('ru-RU')}{' '}
                        <span className='text-warning-500'>{currency}</span>
                    </td>
                    <td className='text-right td py-[0.625rem] font-medium'>
                        {currency === 'UZS'
                            ? (Math.round(debt.debtuzs * 1) / 1).toLocaleString(
                                  'ru-RU'
                              )
                            : (
                                  Math.round(debt.debt * 1000) / 1000
                              ).toLocaleString('ru-RU')}{' '}
                        <span className='text-error-500'>{currency}</span>
                    </td>
                    <td className='td border-r-0 py-[6px]'>
                        <div className='flex justify-center items-center gap-[0.625rem]'>
                            <TableBtn
                                type={'print'}
                                bgcolor={'bg-primary-800'}
                                onClick={() => Print(debt.saleconnector)}
                            />
                            <TableBtn
                                type={'pay'}
                                bgcolor={'bg-success-500'}
                                onClick={() => Pay(debt)}
                            />
                        </div>
                    </td>
                </tr>:
                <li className='text-sm w-[90vw]  bg-[white] rounded-lg mb-2 list-none'>
                    <li className='flex justify-between p-[10px] border border-b-1 border-s-0 border-t-0 border-e-0'><p>{1 + index}- {new Date(debt.createdAt).toLocaleDateString()}</p> 
                    <p className='text-[blue]'>{t('ID')}: {debt.client && debt.client.name}</p>
                    </li>
                </li>
            ))}
        </>
    )
}
