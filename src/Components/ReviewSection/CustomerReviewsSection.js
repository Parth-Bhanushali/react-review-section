import ReviewList from './ReviewList'
import './CustomerReviewsSections.css'

const CustomerReviewsSection = () => {
    return (
        <div>
            <h2 className='reviews-section-header'>Customer Reviews</h2>
            <ReviewList />
        </div>
    )
}

export default CustomerReviewsSection