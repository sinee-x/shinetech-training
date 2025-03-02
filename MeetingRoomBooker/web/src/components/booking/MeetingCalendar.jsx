import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import '@schedule-x/theme-default/dist/index.css'
import React from 'react'

function MeetingCalendar({ events }) {
    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: events,
        defaultView: 'month-grid',
    })
    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}

export default MeetingCalendar;