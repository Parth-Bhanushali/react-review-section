import React from 'react'
import ReviewItem from './ReviewItem'
import './ReviewList.css'

const reviewsJsonURL = 'https://api.npoint.io/232b0f31ea83ac6883ad'

const ReviewList = () => {
    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        function getData() {
            fetch(reviewsJsonURL)
                .then(response => response.json())
                .then(reviewsJsonData => setData(reviewsJsonData))
                .catch(error => console.error("Something went wrong while fetching reviews: ", error));
        }
        getData()
    }, [])

    return (
        <div>
            {
                data?.map((item, index) => {
                    return (
                        <ReviewItem
                            key={item.review_id}
                            review={item}
                        />
                    )
                })
            }
        </div>
    )
}

export default ReviewList
