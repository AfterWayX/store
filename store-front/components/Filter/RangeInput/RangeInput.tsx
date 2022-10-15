import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isArray } from 'lodash';

interface RangeInputI {
    statement?: string[],
    callback: Dispatch<SetStateAction<string[]>>,
    range: number[],
}
export const RangeInput = ({ statement = ['0', '500'], callback, range }: RangeInputI) => {
    const [minValue, setMinValue] = useState(statement[0])
    const [maxValue, setMaxValue] = useState(statement[1])

    const router = useRouter()

    useEffect(() => {
        const prices = isArray(router.query.price)
            ? router.query?.price?.map((price) => price)
            : [router?.query?.price!]
        setMinValue(prices[0] || statement[0])
        setMaxValue(prices[1] || statement[1])
    }, [])

    useEffect(() => {
        const min = minValue;
        const max = maxValue;
        if (min > max) {
            setMinValue(max)
            setMaxValue(min)
        }
    }, [minValue, maxValue])

    const handleChangeMax = (e: ChangeEvent<HTMLInputElement>) =>
        e.target.value >= minValue
            ? (
                setMaxValue(e.target.value),
                callback([minValue, e.target.value])
            ) : (
                setMinValue(e.target.value),
                callback([e.target.value, maxValue])
            )


    const handleChangeMin = (e: ChangeEvent<HTMLInputElement>) =>
        e.target.value < maxValue
            ? (
                setMinValue(e.target.value),
                callback([e.target.value, maxValue])
            ) : (
                setMaxValue(e.target.value),
                callback([minValue, e.target.value])
            )



    return (
        <div className="range_container">
            <div className="sliders_control">
                <input
                    id="fromSlider"
                    type="range"
                    value={minValue}
                    onChange={handleChangeMin}
                    min={range[0]}
                    max={range[1]}
                />
                <input
                    id="toSlider"
                    type="range"
                    value={maxValue}
                    onChange={handleChangeMax}
                    min={range[0]}
                    max={range[1]}
                />
            </div>
            <div className='flex justify-between p-2'>
                <div className=''>
                    From:
                    <input type="text" onChange={handleChangeMin} value={minValue} />
                </div>
                <div className=''>
                    To:
                    <input type="text" onChange={handleChangeMax} value={maxValue} />
                </div>
            </div>
        </div>
    )
}