import React from "react";
import MeetingCalendar from "../components/booking/MeetingCalendar";
import { useEffect, useState, useCallback } from 'react'
import { getBookingsByUserId } from '../services/bookingService';
import { useAuth } from '../auth/AuthContext';
import dayjs from 'dayjs';
const Booking = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const fetchBookings = useCallback(() => {
    if (user?.id) {
      getBookingsByUserId(user.id).then(data => {
        const events = data?.map((element) => ({
          id: element.id,
          title: element.subject,
          people: element.userName,
          location: element.roomName,
          start: dayjs(element.startTime).format('YYYY-MM-DD HH:mm'),
          end: dayjs(element.endTime).format('YYYY-MM-DD HH:mm')
        }));
        setEvents(events);
      });
    }
  }, [user?.id]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <>
      {events.length > 0 && <MeetingCalendar events={events} />}
    </>
  );
}

export default Booking;