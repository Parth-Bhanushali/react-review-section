import './ReviewHighlighter.css'

const ReviewHighlighter = ({ review, showTooltip, hideTooltip }) => {
    function findSentencesInAnalytics(analytics) {
        if (analytics?.length > 0) {
            const sentences = [];
            analytics.forEach(analytic => {
                if (analytic?.sentences?.length > 0) {
                    analytic.sentences.forEach(sentence => {
                        // Split the sentence based on '|||' if present
                        const subSentences = sentence.split('|||').map(subSentence => subSentence.trim());
                        sentences.push(...subSentences); // Add sub-sentences to the sentences array
                    });
                }
            });
            return sentences;
        }
        return null;
    };

    function findSentimentForSentence(sentence, analytics) {
        for (let i = 0; i < analytics.length; i++) {
            const analytic = analytics[i];
            if (analytic.sentences) {
                for (let j = 0; j < analytic.sentences.length; j++) {
                    const checkingElement = analytic.sentences[j]
                    if (checkingElement.includes(sentence)) {
                        return analytic.sentiment;
                    }
                }
            }
        }
        return null;
    };

    function findTopicForSentence(sentence, analytics) {
        for (let i = 0; i < analytics.length; i++) {
            const analytic = analytics[i];
            if (analytic.sentences) {
                for (let j = 0; j < analytic.sentences.length; j++) {
                    const checkingElement = analytic.sentences[j]
                    if (checkingElement.includes(sentence)) {
                        return analytic.topic;
                    }
                }
            }
        }
        return null;
    };

    const sentences = findSentencesInAnalytics(review.analytics);

    const renderHighlightedText = (content, sentences) => {
        if (!sentences || sentences.length === 0) {
            return content;
        }

        const regex = new RegExp(sentences.map(sentence => `(${sentence.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`).join('|'), 'g');
        const parts = content.split(regex).filter(Boolean);

        return parts.map((part, index) => {
            if (sentences.includes(part)) {
                const sentiment = findSentimentForSentence(part, review.analytics);
                const topic = findTopicForSentence(part, review.analytics);
                return (
                    <span
                        key={index}
                        onMouseOver={(e) => showTooltip(e, topic)}
                        onMouseOut={hideTooltip}
                        className={`highlighted ${sentiment?.toLowerCase()}`}
                    >
                        {part}
                    </span>
                );
            } else {
                return <span key={index}>{part}</span>;
            }
        });
    };

    const renderContentWithLineBreaks = (content) => {
        const paragraphs = content.split('\n\n');
        return paragraphs.map((paragraph, index) => (
            <p key={index}>
                {index != 0 && renderHighlightedText(paragraph, sentences)}
            </p>
        ));
    };

    return (
        <div>
            {renderContentWithLineBreaks(review.content)}
        </div>
    );
};

export default ReviewHighlighter