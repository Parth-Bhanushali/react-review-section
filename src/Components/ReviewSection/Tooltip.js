import './Tooltip.css'

const Tooltip = ({ position, content }) => {
    return (
        <div className="tooltip" style={{ left: position.left, top: position.top }}>
            {content}
        </div>
    )
}

export default Tooltip