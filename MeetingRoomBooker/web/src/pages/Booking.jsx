import React, { useEffect } from "react";
import MeetingCalendar from "../components/booking/MeetingCalendar";
import { useState } from 'react'
import { getBookingsByUserId } from '../services/bookingService';
import { useAuth } from '../auth/AuthContext';
import dayjs from 'dayjs';
const Booking = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      if (user?.id) {
        try {
          const data = await getBookingsByUserId(user.id);
          const formattedEvents = data?.map((element) => ({
            id: element.id,
            title: element.subject,
            people: element.userName,
            location: element.roomName,
            start: dayjs(element.startTime).format('YYYY-MM-DD HH:mm'),
            end: dayjs(element.endTime).format('YYYY-MM-DD HH:mm')
          })) || [];
          setEvents(formattedEvents);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <>
      {events.length > 0 && <MeetingCalendar events={events} />}
    </>
  );
}

export default Booking;