import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getAllEventsThunk } from '../../store/events';
import OpenModalButton from '../OpenModalButton';
import { EventsModal } from './events';
import { RequestEventModal } from './requestEvents';
import { AddEvent } from './addEvent';
import './Events.css'


const Events = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(state => state.session.user)
  const eventArr = useSelector(state => state.eventReducer)
  const event1 = Object.values(eventArr);

  useEffect(() => {
    dispatch(getAllEventsThunk())
  }, [dispatch])

  if (!eventArr) return


  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const days = [];
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const goToPreviousMonth = () => {
    const previousMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    setCurrentMonth(previousMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    setCurrentMonth(nextMonth);
  };

  const renderWeekdays = () => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return weekdays.map((day) => (
      <th key={day} className="p-2 border h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
        {day}
      </th>
    ));
  };

  const renderDays = () => {
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    const dayElements = [];
    const eventsForCurrentMonth = event1.filter((event) => {

      const eventDate = new Date(event.start_date);
      const enventDateHours = eventDate.getHours()
      eventDate.setHours(+enventDateHours + 4)
      return (
        eventDate.getMonth() === currentMonth.getMonth() &&
        eventDate.getFullYear() === currentMonth.getFullYear()
      );
    });

    for (let i = 0; i < firstDayOfMonth; i++) {
      dayElements.push(<td key={`empty-${i}`} className='border'></td>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

      const eventsForDay = eventsForCurrentMonth.filter((event) => {
        const eventDate = new Date(event.start_date);
        const enventDateHours = eventDate.getHours()
        eventDate.setHours(+enventDateHours + 4)
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        const formattedEventDate = eventDate.toDateString('en-US', options);
        const formattedCurrentDate = currentDate.toDateString('en-US', options);
        return formattedEventDate === formattedCurrentDate;
      });

      dayElements.push(
        < td
          key={day}
          className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition duration-500 ease hover:bg-gray-300"
        >
          <div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
            <div className="top h-5 w-full flex flex-col">
              <span className="text-gray-500">{day}</span>
              {eventsForDay.map((event, index) => (
                <div key={index} className="">
                  <OpenModalButton
                    style={{ backgroundColor: `${event.color}` }}
                    buttonText={event.title}
                    className="rounded-sm p-1 text-sm mb-1text-sm text-white cursor-pointer w-full flex"
                    onItemClick=''
                    modalComponent={<EventsModal event={event} />}
                  />
                </div>
              ))}
            </div>
          </div>
        </td >
      );
    }

    const totalDays = dayElements.length;
    const remainingEmptyCells = (totalDays + 7 - daysInMonth) % 7;

    for (let i = 0; i < remainingEmptyCells; i++) {
      dayElements.push(<td key={`empty-${i}`} className="border"></td>);
    }

    const weeks = [];
    while (dayElements.length > 0) {
      weeks.push(
        <tr key={weeks.length} className="text-center h-20">
          {dayElements.splice(0, 7)}
        </tr>
      );
    }

    return weeks;
  };


  return (
    <>
      <div className="relative w-full h-24">
      <div className="events-request-modal">
        <div className="headers">EVENTS</div>
        <div className='request-event-btn-container'>
          {
          user ?
          <button
          onClick = {() => navigate('/events/add-event')}
          className='green-btn request-event-btn'
          >
            Add Event
          </button>
          :
          <OpenModalButton
            buttonText='Request Event'
            className="green-btn request-event-btn"
            onItemClick=""
            modalComponent={<RequestEventModal />}
          />
          }
          {/* <button className="absolute top-0 right-5 landing-page-button rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium green">Request Event</button> */}
        </div>
      </div>
      <div className="container mx-auto mt-0">
        <div className="wrapper rounded shadow w-full">
          <div className="header flex flex-col justify-center border-2 border-grey p-2">
            <span className="font-bold flex justify-center text-3xl">
              {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonth)}
            </span>
            <div className="buttons flex justify-between">
              <button className="p-1 " onClick={goToPreviousMonth}>
                <svg width="1.5em" fill="gray" height="1.5em" viewBox="0 0 16 16" className="bi bi-arrow-left-circle" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path fillRule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z" />
                  <path fillRule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z" />
                </svg>
              </button>
              <button className="p-1" onClick={goToNextMonth}>
                <svg width="1.5em" fill="gray" height="1.5em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path fillRule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z" />
                  <path fillRule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
                </svg>
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr>{renderWeekdays()}</tr>
            </thead>
            <tbody>{renderDays()}</tbody>
          </table>
        </div>
        </div>
      </div>
    </>
  );
};

export default Events;
