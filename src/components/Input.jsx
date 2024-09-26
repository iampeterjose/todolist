import { useState } from "react";
import { useTasks } from "../context/TaskContext";

const Input = () => {
  const [task, setTask] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const {addTask} = useTasks();

  const handleAdd = () => {
    if(task.trim()){
      addTask(task, selectedDate);
      setTask("");
    }
    else{
      alert("Please enter a valid task");
    }
  }

  return (
    <div className="flex flex-col my-5 text-slate-700 gap-y-3">
      <div className="flex flex-row gap-4">
        <label className="text-lg">Date: </label>
        <input 
          type="date"
          className="px-2 py-1 text-base border-b-2 border-slate-900"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-4">
        <label className="text-lg">Todo: </label>
        <input 
            type="text" 
            placeholder="Enter a task..." 
            className="px-2 py-1 text-base w-full border-b-2 border-slate-900"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
        />
        <button 
          className="bg-blue-500 text-white px-4 hover:bg-blue-600"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default Input