import { Link } from "react-router-dom"
import type { TimelineEvent } from "../../../../../../types/timelineEvent"
import './TimelineEventCard.css'

type TimelineEventCardProps = {
    event: TimelineEvent
    isLeft: boolean
    expanded: boolean
    onToggle: () => void
}

function TimelineEventCard({ 
    event, 
    isLeft, 
    expanded, 
    onToggle 
}: TimelineEventCardProps) {
    return (
        <div className={`timeline-event-card ${isLeft ? 'left' : 'right'}`}>
            <button onClick={onToggle}>
                <span>
                    {event.year}
                </span>

                <h2>{event.title}</h2>

                <p>{event.summary}</p>
            </button>

            {expanded && (
                <div className="timeline-event-description">
                    <p>{event.description}</p>

                    {event.person && (
                        <p>
                            <strong>Person:</strong> {event.person}
                        </p>
                    )}

                    {event.link && (
                        <Link to={event.link.path}>
                            {event.link.label}
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}

export default TimelineEventCard