import { Rating } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, deleteReviews, getProductDetails } from '../../redux/actions/productActions'
import { toast } from 'react-toastify'
import { DELETE_REVIEW_RESET } from '../../redux/constants/productConstants'
import { Delete } from '@mui/icons-material'

const ReviewCard = ({ review, productId, userId }) => {

    const dispatch = useDispatch()
    const { isDeleted, error: deleteError } = useSelector(state => state.review)

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

    const deleteReviewHandler = async () => {
        await dispatch(deleteReviews(review._id, productId))
        dispatch(getProductDetails(productId))
    }

    useEffect(() => {
        if (deleteError) {
            toast.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('Review deleted successfully.')
            dispatch({ type: DELETE_REVIEW_RESET })
        }

    }, [dispatch, deleteError, isDeleted])

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
            <p>Reviewed in India on {`${reviewDate.date} ${reviewDate.month}, ${reviewDate.year}`} &nbsp; {review.verified && <>| &nbsp; <span>Verified Purchase</span></>}</p>
            <h5>{review.comment}</h5>
            <div>
                <button className='button-secondary'>Helpful</button>
                |
                <p>Report</p>

                {userId === review.user &&
                    <div style={{ marginLeft: '10px' }} className='app__center'>
                        <span>|</span>
                        <button
                            onClick={deleteReviewHandler}
                            style={{
                                marginLeft: '10px',
                                padding: '5px 10px',
                                border: 'none',
                                color: '#C00',
                                cursor: 'pointer',
                                backgroundColor: 'transparent'
                            }} type='button'><Delete /></button>
                    </div>
                }
            </div>
        </div >
    )
}

export default ReviewCard
