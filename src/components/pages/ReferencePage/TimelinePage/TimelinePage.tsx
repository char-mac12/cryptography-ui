import { timelineEvents } from "../../../../data/timeline"
import TimelineEvent from "./TimelineEvent/TimelineEvent"
import './TimelinePage.css'

function TimelinePage() {
    return (
        <div className="timeline-page">
            <h1>Timeline</h1>
            <div className="timeline-content">
                <div className="timeline">
                    {timelineEvents.map((event, index) => (
                        <TimelineEvent
                            key={event.title}
                            event={event}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TimelinePage