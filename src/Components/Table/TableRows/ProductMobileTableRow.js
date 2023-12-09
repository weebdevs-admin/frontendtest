import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import { map } from 'lodash'
import { t } from 'i18next'
export const ProductMobileTableRow = ({
    currentPage,
    countPage,
    data,
    Edit,
    Delete,
    currency,
    currencyType,
    productminimumpage,
    modalOpen
}) => {
    return (
        <>

            {map(data, (product, index) => (
                <li className='w-[90vw]  bg-white list-none mb-[10px] ps-0 rounded-md'>
                <li className='border p-[10px] text-sm flex justify-between border-s-0 border-t-0 border-e-0'>
                    <p >
                        {product?.category?.code}{' '}
                        {product?.category?.name && `- ${product?.category?.name}`}    
                    </p>    
                    <p>
                    {product.total.toLocaleString('ru-RU')}{' '}
                        {product.unit && product.unit.name}
                    </p>
                </li>
                <li className='border p-[10px] text-sm flex justify-between border-s-0 border-t-0 border-e-0'>
                    <p className='gap-1 text-[blue]'><span>{t('Olish')}: </span>
                    {product.price &&
                            (currency === 'UZS'
                                ? product?.price?.incomingpriceuzs && product?.price?.incomingpriceuzs.toLocaleString(
                                    'ru-RU'
                                )
                                : product?.price?.incomingprice && product?.price?.incomingprice.toLocaleString(
                                    'ru-RU'
                                ))}{' '}
                        {currencyType}   
                    </p>    
                    <p className='text-[green]'><span>{t('Sotish')}: </span>
                    {product.price &&
                            (currency === 'UZS'
                                ? product?.price?.sellingpriceuzs && product?.price?.sellingpriceuzs.toLocaleString(
                                    'ru-RU'
                                )
                                : product?.price?.sellingprice && product?.price?.sellingprice.toLocaleString(
                                    'ru-RU'
                                ))}{' '}
                        {currencyType}
                    </p>
                </li>
                <li className='border p-[10px] text-sm flex justify-between border-s-0 border-t-0 border-e-0'>
                    <p ><span>{t('Optom')}: </span>
                    {product.price?.tradepriceuzs ? (
                            <>
                                {currency === 'UZS'
                                    ? product?.price?.tradepriceuzs && product?.price?.tradepriceuzs.toLocaleString(
                                        'ru-RU'
                                    )
                                    : product?.price?.tradeprice && product?.price?.tradeprice.toLocaleString(
                                        'ru-RU'
                                    )}{' '}
                                {currencyType}
                            </>
                        ) : (
                            ''
                        )} 
                    </p>    
                    <p className='text-[red]'><span>{t('Minimum')}: </span>
                    {product.total.toLocaleString('ru-RU')}{' '}
                    {product.price?.tradepriceuzs ? (
                            <>
                                {currency === 'UZS'
                                    ? product?.price?.tradepriceuzs && product?.price?.tradepriceuzs.toLocaleString(
                                        'ru-RU'
                                    )
                                    : product?.price?.tradeprice && product?.price?.tradeprice.toLocaleString(
                                        'ru-RU'
                                    )}{' '}
                                {currencyType}
                            </>
                        ) : (
                            ''
                        )}
                    </p>
                </li>
                <li className='flex justify-end p-2'>
                <TableBtn
               type={'edit'}
               bgcolor='bg-warning-500'
               onClick={() =>{
                   Edit('producttablerow' + index, product)
                   modalOpen(true)
                }
               }
           />
           <TableBtn
               type={'delete'}
               bgcolor='bg-error-500 ml-2.5'
               onClick={() => Delete(product)}
           />                     
                </li>
            </li>
            ))}
        </>
    )
}
