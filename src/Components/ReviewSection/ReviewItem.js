import React from 'react'
import { FaUserGraduate } from "react-icons/fa6";
import { FiUserPlus } from "react-icons/fi";
import { GrBookmark } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";
import { ImUser } from 'react-icons/im';
import StarRating from './StarRating'
import ReviewHighlighter from './ReviewHighlighter'
import Tooltip from './Tooltip'
import './ReviewItem.css'

const ReviewItem = ({ review }) => {
    const [tooltipContent, setTooltipContent] = React.useState('');
    const [tooltipPosition, setTooltipPosition] = React.useState({});

    const { reviewer_name, source, rating_review_score, date } = review;
    const rating_out_of_five = rating_review_score / 2;


    const showTooltip = (event, text) => {
        const { clientX, clientY } = event;
        setTooltipContent(text);
        setTooltipPosition({ left: clientX + 10, top: clientY + 10 });
    };

    const hideTooltip = () => {
        setTooltipContent('');
    };

    return (
        <div>
            <div className="review-holder">
                <div className="user-icon-container">
                    <ImUser className="user-icon" />
                </div>

                <div className="review">
                    <div className="review-l1">
                        <div>
                            <span className="reviewer-name">{reviewer_name} </span>
                            <span className="reviewed-at">wrote a review at </span>
                            <span className="review-source">{source.name}</span>
                        </div>

                        <div className="review-action-icons-container">
                            <FiUserPlus />
                            <GrBookmark />
                            <IoIosMore />
                        </div>
                    </div>

                    <div className="review-l2">
                        <StarRating rating={rating_out_of_five} />
                        <p className="date">{date}</p>
                    </div>

                    <div className="review-l3-paragraph">
                        <ReviewHighlighter
                            review={review}
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                        />
                    </div>
                </div>
            </div>

            {
                tooltipContent &&
                <Tooltip position={tooltipPosition} content={tooltipContent} />
            }
        </div>
    );
};

export default ReviewItem