import dayjs from 'dayjs';

const getDayOfWeek = (inputDate) => {
    const date = dayjs(inputDate);

    const dayOfWeek = date.day();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek];
};

export { getDayOfWeek };