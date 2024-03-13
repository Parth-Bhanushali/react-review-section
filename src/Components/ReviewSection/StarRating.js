import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const stars = [];
    const totalStars = 5;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    // add full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={i} className="star-filled" />);
    }
    // add half star if required
    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key={stars.length} className="star-half-filled" />);
    }

    // fill remaining stars (these would be the empty ones)
    const remainingStars = totalStars - stars.length;
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<FaRegStar key={stars.length + i} className="star-empty" />);
    }

    return <div className="star-rating">{stars}</div>;
};

export default StarRating