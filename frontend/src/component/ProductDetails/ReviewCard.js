import { Rating } from '@mui/material'
import React from 'react'
// import { reviewsProfile } from '../../assets'

const ReviewCard = ({ review }) => {

    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
        size: 'small',
    }

    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const reviewDate = {
        year: review.createdAt.substring(0, 4),
        date: review.createdAt.substring(8, 10),
        month: monthNames[parseInt(review.createdAt.substring(5, 7))]
    }

    return (
        <div className='reviewCard'>
            <div>
                <img src={review.profile?.url} alt='User' />
                <p>{review.name}</p>
            </div>
            <div>
                <Rating  {...options} />
                <h2>{review.title}</h2>
            </div>
            <p>Reviewed in India on {`${reviewDate.date} ${reviewDate.month}, ${reviewDate.year}`} &nbsp; | &nbsp; <span>Verified Purchase</span></p>
            <h5>{review.comment}</h5>
            <div>
                <button className='button-secondary'>Helpful</button>
                |
                <p>Report</p>
            </div>
        </div>
    )
}

export default ReviewCard
