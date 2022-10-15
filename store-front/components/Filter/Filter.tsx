import { Dispatch, SetStateAction, useEffect } from 'react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { isArray } from 'lodash';

import { FilterFieldsI } from '../../interfaces/FilterFields.interface';
import { SimpleButton } from '../Buttons/SimpleButton';
import { FieldButton } from '../Buttons/FieldButton';
import { RangeInput } from './RangeInput/RangeInput';

interface FilterI {
    fields: FilterFieldsI
}

export const statesType = ['category', 'color']

export const Filter = ({ fields }: FilterI) => {
    const [isOpened, setIsOpened] = useState(false)
    const [color, setColor] = useState<string[]>([])
    const [price, setPrice] = useState<string[]>(['0', '500'])
    const [category, setCategory] = useState<string[]>([])

    const router = useRouter()

    const states: { [key: string]: [string[] | number[], Dispatch<SetStateAction<any[]>>]; } = {
        'category': [category, setCategory],
        'color': [color, setColor],
    }

    const pushTo = (data: string | number, state: string) => {
        const [propState, setState] = states[state]
        if (!(propState.indexOf(data as never) !== -1)) {
            return setState([...propState, data])
        } else {
            return setState([...propState?.filter((el: any) => String(el) !== String(data))])
        }
    }

    const openStateSwitch = () => {
        return setIsOpened(!isOpened)
    }

    const resetFilters = async () => {
        setCategory([])
        setColor([])
        setPrice([])
        await router.push('/products')
    }

    const applyFilter = async () => {
        const query = {
            ...(price.length && { price: price }),
            ...(category.length && { category: category }),
            ...(color.length && { color: color }),
        }
        await router.push('/products', {
            ...(Object.keys(query).length && { query: query }),
        }).finally(
            () => router.reload()
        )
    }

    useEffect(() => {
        const categories = isArray(router.query.category)
            ? router.query?.category?.map((category) => category)
            : [router.query.category!]
        setCategory(categories || [])

        const colors = isArray(router.query.color)
            ? router.query?.color?.map((color) => color)
            : [router.query.color!]
        setColor(colors || [])
    }, [])

    return (
        <div className='flex relative ml-auto mt-5'>
            <SimpleButton title={!isOpened ? "Open filter" : "Close filter"} callback={openStateSwitch} />
            {
                isOpened && (
                    <div className='absolute top-[130%] right-0 border min-w-[50px] max-w-[400px] bg-gray-50 bg-opacity-[0.98] p-5 rounded-lg'>
                        <div className='flex overflow-x-scroll gap-4 my-1 py-1'>
                            {fields.category.map(field => (
                                <FieldButton title={field.category} callback={pushTo} active={(category.includes(field.category))} field={'category'} />
                            ))}
                        </div>
                        <div className='flex overflow-x-scroll gap-4 my-1 py-1'>
                            {fields.color.map(field => (
                                <FieldButton title={field.color} callback={pushTo} active={color.includes(field.color)} field={'color'} />
                            ))}
                        </div>
                        <div className='flex w-full mt-7 mb-5'>
                            <RangeInput statement={price} callback={setPrice} range={fields.priceRange} />
                        </div>
                        <div className='ml-auto flex justify-end gap-2.5'>
                            <SimpleButton title={'Apply filters'} callback={applyFilter} />
                            <SimpleButton title={'Reset filters'} callback={resetFilters} danger />
                        </div>
                    </div>
                )
            }
        </div>
    )
}