import React, { useState, useEffect, useCallback } from 'react'
import { getBookingsByUserId } from '../../services/bookingService';
import { useAuth } from '../../auth/AuthContext';
import { } from '@mui/material'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
const MeetingCalendar = () => {
    const [events, setEvents] = useState([]);
    const { user } = useAuth();
    const fetchBookings = useCallback(() => {
        if (user?.id) {
            getBookingsByUserId(user.id).then(data => {
                const events = data?.map((element) => ({
                    id: element.id,
                    title: element.subject + '-' + element.roomName + '-' + element.userName,
                    start: element.startTime,
                    end: element.endTime
                }));
                setEvents(events);
            });
        }
    }, [user?.id]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const eventsService = useState(() => createEventsServicePlugin())[0]

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: events,
        plugins: [eventsService],
        defaultView: 'monthGrid',
    })

    return (
        <>
            <ScheduleXCalendar calendarApp={calendar} />
        </>
    );
}
export default MeetingCalendar;