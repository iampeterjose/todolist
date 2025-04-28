import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

const Input = () => {
  const [task, setTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [tempDate, setTempDate] = useState(null); // Temp date while calendar is open
  const [showCalendar, setShowCalendar] = useState(false);
  const { addTask } = useTasks();

  const handleAdd = () => {
    if (task.trim()) {
      const dateToSave = selectedDate ? selectedDate.format("MM/DD/YYYY") : "";
      addTask(task, dateToSave);
      setTask("");
      setSelectedDate(null);
    } else {
      alert("Please enter a valid task");
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    setTempDate(selectedDate); // Keep current selected date when opening
  };

  const handleDone = () => {
    setSelectedDate(tempDate);
    setShowCalendar(false);
  };

  return (
    <div className="flex flex-col my-5 text-slate-700 gap-y-3">
      <div className="flex flex-col gap-4">
        <button
          onClick={toggleCalendar}
          className="px-4 py-2 bg-blue-500 text-white w-max hover:bg-blue-600 rounded"
        >
          {selectedDate ? selectedDate.format("MM/DD/YYYY") : "Pick a Date (Optional)"}
        </button>

        {showCalendar && (
          <div className="flex flex-col items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={tempDate}
                onChange={(newValue) => setTempDate(newValue)}
              />
            </LocalizationProvider>
            <button
              onClick={handleDone}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Done
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-row gap-4 mt-4">
        <label className="text-lg mt-2">Todo:</label>
        <input
          type="text"
          placeholder="Enter a task..."
          className="px-2 py-1 text-base w-full border-b-2 border-slate-900 focus:outline-none"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <button
          className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Input;
