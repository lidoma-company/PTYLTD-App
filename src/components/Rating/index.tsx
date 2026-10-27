import React, { FC } from 'react';
import { RatingType } from './rating.type';

const Rating: FC<RatingType> = ({ ratingId, score, disabled }) => {
    return (
        <div className='rating rating-xs' dir='ltr'>
            <input
                type='radio'
                disabled={disabled}
                name={ratingId}
                className='mask mask-star-2 bg-neutral'
                aria-label='1 star'
                defaultChecked={score == 1}
            />
            <input
                type='radio'
                disabled={disabled}
                name={ratingId}
                className='mask mask-star-2 bg-neutral'
                aria-label='2 star'
                defaultChecked={score == 2}
            />
            <input
                type='radio'
                disabled={disabled}
                name={ratingId}
                className='mask mask-star-2 bg-neutral'
                aria-label='3 star'
                defaultChecked={score == 3}
            />
            <input
                type='radio'
                disabled={disabled}
                name={ratingId}
                className='mask mask-star-2 bg-neutral'
                aria-label='4 star'
                defaultChecked={score == 4}
            />
            <input
                type='radio'
                disabled={disabled}
                name={ratingId}
                className='mask mask-star-2 bg-neutral'
                aria-label='5 star'
                defaultChecked={score == 5}
            />
        </div>
    );
};

export default Rating;

