import { useState } from "react";
import { useTasks } from "../context/TaskContext";

const TaskList = () => {
    const { taskList, editTask, removeTask, toggleCompletion } = useTasks(); // Ensure toggleCompletion is available in context
    const [editing, setEditing] = useState({ dateIndex: null, taskKey: null, value: "" });

    const sortedTaskList = taskList.sort((a, b) => new Date(a.date) - new Date(b.date));

    const handleEdit = (dateIndex, taskKey) => {
        if (editing.dateIndex === dateIndex && editing.taskKey === taskKey) {
            editTask(editing.value, dateIndex, taskKey);
            setEditing({ dateIndex: null, taskKey: null, value: "" });
        } else {
            setEditing({ dateIndex, taskKey, value: taskList[dateIndex].tasks[taskKey].task });
        }
    };

    const handleRemove = (dateIndex, taskKey) => {
        const confirmed = window.confirm(`Would you like to delete this task?`);
        if (confirmed) {
            removeTask(dateIndex, taskKey);
        }
    };

    const handleCheckboxChange = (dateIndex, taskKey) => {
        toggleCompletion(dateIndex, taskKey); // Call the function to toggle completion
    };

    return (
        <div className="flex flex-col mt-4">
            {sortedTaskList.length > 0 ? (
                <h1 className="text-xl font-semibold">Tasks</h1>
            ) : (
                "Write a task to get started!"
            )}
            <ul className="my-2">
                {sortedTaskList.map((dateObj, dateIndex) => (
                    <div key={dateObj.date} className="my-4">
                        <h2 className="text-md font-semibold bg-slate-200 px-2 py-1">{dateObj.date === "" ? "Daily" : dateObj.date}</h2>
                        {Object.keys(dateObj.tasks).map((taskKey) => (
                            <li key={taskKey} className="flex flex-row items-center gap-3 my-2 px-2 border-b-2 hover:bg-slate-200">
                                <input 
                                    type="checkbox" 
                                    className="w-5 h-5" 
                                    checked={dateObj.tasks[taskKey].completed} 
                                    onChange={() => handleCheckboxChange(dateIndex, taskKey)} 
                                />
                                {editing.dateIndex === dateIndex && editing.taskKey === taskKey ? (
                                    <input
                                        type="text"
                                        className="px-2 py-1 text-base w-full border-b-2 border-slate-900"
                                        value={editing.value}
                                        onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                                    />
                                ) : (
                                    <span className={`flex-1 py-1 ${dateObj.tasks[taskKey].completed ? "line-through" : ""}`}>
                                        {dateObj.tasks[taskKey].task}
                                    </span>
                                )}
                                <button
                                    className={`${editing.dateIndex === dateIndex && editing.taskKey === taskKey ? "text-blue-700" : "text-green-700"} hover:underline`}
                                    onClick={() => handleEdit(dateIndex, taskKey)}
                                >
                                    {editing.dateIndex === dateIndex && editing.taskKey === taskKey ? "Done" : "Edit"}
                                </button>
                                <p className="text-slate-400">|</p>
                                <button
                                    className="text-red-700 hover:underline"
                                    onClick={() => handleRemove(dateIndex, taskKey)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
