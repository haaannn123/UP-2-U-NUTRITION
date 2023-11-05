// import { useState } from "react";
// import { createEventThunk } from "../../store/events";
// import { useDispatch } from "react-redux";


// export function EditEvent(event) {
//   const dispatch = useDispatch()


//   const [title, setTitle] = useState("");
//   const [details, setDetails] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [color, setColor] = useState("");
//   const [allDay, setAllDay] = useState(false);
//   const [errors, setErrors] = useState([])

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([])

//     if(allDay){
//       setStartTime("00:00")
//       setEndTime("23:59")
//     }

//     const event = {
//       title,
//       details,
//       startDate,
//       endDate,
//       "startTime": `${startDate} ${startTime}:00`,
//       "endTime": `${endDate} ${endTime}:00`,
//       color,
//     };

//     const data = dispatch(createEventThunk(event))
//     if(data.errors){
//       console.log(data.errors)
//     } else {
//       console.log(data)
//     }

//   };

//   return (
//     <div className="w-full max-w-lg m-auto">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col m-auto space-y-6 mb-4 "
//       >
//         <div className="flex flex-col space-y-3">
//           <label htmlFor="event-title">Event Title:</label>
//           <input
//             className="bg-gray-100 rounded text-center h-10 txt-lg"
//             id="event-title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Title must be between 3 and 100 charaters"
//             minLength="3"
//             maxLength="100"
//             required
//           />
//         </div>
//         <div className="flex flex-col space-y-3">
//           <label htmlFor="start-date">Start Date:</label>
//           <input
//             className="bg-gray-100 rounded text-center h-10 txt-lg"
//             id="start-date"
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             required
//           />
//         </div>
//         <div className="flex flex-col space-y-3">
//           <label htmlFor="end-date">End Date:</label>
//           <input
//             className="bg-gray-100 rounded text-center h-10 txt-lg"
//             id="end-date"
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>
//         {/* {startDate &&

//         } */}


//         <div className="flex flex-col space-y-3">
//           <label htmlFor="start-date">Start Date:</label>
//           <input
//             className="bg-gray-100 rounded text-center h-10 txt-lg"
//             id="start-date"
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             required
//           />
//         </div>

//         {!allDay && (
//           <div className="flex place-content-between">
//             <div>
//               <label htmlFor="startTime">Start Time:</label>
//               <input
//                 id="startTime"
//                 type="time"
//                 value={startTime}
//                 required
//                 onChange={(e) => setStartTime(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="endTime">End Time:</label>
//               <input
//                 id="endTime"
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//               />
//             </div>
//           </div>
//         )}
//         <div className="flex space-x-3">
//           <label htmlFor="all-day">All Day:</label>
//           <input
//             className=""
//             id="all-day"
//             type="checkbox"
//             value={allDay}
//             onChange={() => setAllDay(!allDay)}
//           />
//         </div>
//         <div className="flex flex-col space-y-3">
//           <label htmlFor="color">Choose Color:</label>
//           <select
//             className={`bg-[${color}] rounded text-center h-10 txt-lg`}
//             id="color"
//             value={color}
//             onChange={(e) => setColor(e.target.value)}
//             required
//           >
//             <option
//             value="" disabled hidden>
//               Choose a Color
//             </option>
//             <option value="#d98c00" >Orange</option>
//             <option value="#d52540" >Red</option>
//             <option value="#5eac00" >Green</option>
//             <option value="#0093d3">Blue</option>
//           </select>
//         </div>
//         <div className="flex flex-col space-y-3">
//           <label htmlFor="event-details">Event Details:</label>
//           <textarea
//             className="bg-gray-100 rounded  h-100 txt-lg resize-none p-2"
//             id="event-details"
//             value={details}
//             onChange={(e) => setDetails(e.target.value)}
//             placeholder="Enter event details here"
//             required
//           />
//         </div>

//         <button>Submit Event</button>
//       </form>
//     </div>
//   );
// }
