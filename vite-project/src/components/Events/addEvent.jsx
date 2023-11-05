import { useState } from "react";
import {
  createEventThunk,
  deleteEventThunk,
  editEventThunk,
} from "../../store/events";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { dateFormater } from "./util/dateFormatter";

export function AddEvent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user)

  const event = location.state;
  const tempTitle = event && event.title ? event.title : "";
  const tempDetails = event && event.details ? event.details : "";
  const tempStartDate =
    event && event.start_date ? dateFormater(event.start_date) : "";
  const tempEndDate =
    event && event.end_date ? dateFormater(event.end_date) : "";
  const tempStartTime =
    event && event.start_time ? event.start_time.slice(-12, -7) : "";
  const tempEndTime =
    event && event.end_time ? event.end_time.slice(-12, -7) : "";
  const tempColor = event && event.color ? event.color : "";

  const [title, setTitle] = useState(tempTitle);
  const [details, setDetails] = useState(tempDetails);
  const [startDate, setStartDate] = useState(tempStartDate);
  const [endDate, setEndDate] = useState(tempEndDate);
  const [startTime, setStartTime] = useState(tempStartTime);
  const [endTime, setEndTime] = useState(tempEndTime);
  const [color, setColor] = useState(tempColor);
  // const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([])

    const eventToSend = {
      title,
      details,
      startDate,
      endDate,
      startTime: `${startDate} ${startTime}:00`,
      endTime: `${endDate} ${endTime}:00`,
      color,
    };
    if (event) {
      eventToSend.id = event.id;
      console.log(eventToSend);
      const data = await dispatch(editEventThunk(eventToSend));
      console.log(data);

      navigate("/events");
    } else {
      console.log(eventToSend);
      const data = dispatch(createEventThunk(eventToSend));
      if (data.errors) {
        console.log(data.errors);
      } else {
        navigate("/events");
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to discard your changes?")) {
      navigate("/events");
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEventThunk(event.id));
      navigate("/events");
    }
  };

  return (
    <>{user && user.admin ?

      <div className="w-full max-w-lg m-auto">
      <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col m-auto space-y-6 mb-4 "
      >
      <div className="flex flex-col space-y-3">
      <label htmlFor="event-title">Event Title:</label>
      <input
      className="bg-gray-100 rounded text-center h-10 txt-lg"
      id="event-title"
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Title must be between 3 and 100 charaters"
      minLength="3"
      maxLength="100"
      required
      />
      </div>
      <div className="flex flex-col space-y-3">
      <label htmlFor="start-date">Start Date:</label>
      <input
      className="bg-gray-100 rounded text-center h-10 txt-lg"
      id="start-date"
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      required
      />
      </div>
      <div className="flex flex-col space-y-3">
      <label htmlFor="end-date">End Date:</label>
      <input
      className="bg-gray-100 rounded text-center h-10 txt-lg"
      id="end-date"
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      />
      </div>

      <div className="flex place-content-between">
      <div>
      <label htmlFor="startTime">Start Time:</label>
      <input
      id="startTime"
      type="time"
      value={startTime}
      required
      onChange={(e) => setStartTime(e.target.value)}
      />
      </div>
      <div>
      <label htmlFor="endTime">End Time:</label>
      <input
      id="endTime"
      type="time"
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
      />
      </div>
      </div>

      <div className="flex flex-col space-y-3">
      <label htmlFor="color">Choose Color:</label>
      <select
      className={`bg-[${color}] rounded text-center h-10 txt-lg`}
      id="color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
      required
      >
      <option value="" disabled hidden>
      Choose a Color
      </option>
      <option value="#d98c00">Orange</option>
      <option value="#d52540">Red</option>
      <option value="#5eac00">Green</option>
      <option value="#0093d3">Blue</option>
      </select>
      </div>
      <div className="flex flex-col space-y-3">
      <label htmlFor="event-details">Event Details:</label>
      <textarea
      className="bg-gray-100 rounded  h-100 txt-lg resize-none p-2"
      id="event-details"
      value={details}
      onChange={(e) => setDetails(e.target.value)}
      placeholder="Enter event details here"
      required
      />
      </div>
      <button>Submit Event</button>
      <button onClick={handleCancel}>Cancel</button>
      {event && <button onClick={handleDelete}>Delete Event</button>}
      </form>
      </div>
  :
   <div>
     <div onClick={navigate("events")}>Click here to return to events</div>
  </div>


          }
      </>
      );
    }
