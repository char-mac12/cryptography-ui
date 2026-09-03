import { useState } from 'react';
import type { TimelineEvent as TimelineEventType } from '../../../../../types/timelineEvent'
import './TimelineEvent.css'
import TimelineEventCard from './TimelineEventCard/TimelineEventCard';

type TimelineEventProps = {
    event: TimelineEventType
    index: number
}

function TimelineEvent({ event, index }: TimelineEventProps) {
    const [expanded, setExpanded] = useState(false);

    const isLeft = index % 2 === 0;

    return (
        <div className="timeline-event">
            <TimelineEventCard
                event={event}
                isLeft={isLeft}
                expanded={expanded}
                onToggle={() => setExpanded(!expanded)}
            />
        </div>
    )
}

export default TimelineEvent