import React, { createContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasklists");
        const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
        setTaskList(parsedTasks);
    }, []);
    console.log(taskList);

    const addTask = (task, date) => {
        const updatedTasks = [...taskList];
        const dateIndex = updatedTasks.findIndex(item => item.date === date);

        if (dateIndex > -1) {
            // If the date already exists, add the new task to its tasks
            updatedTasks[dateIndex].tasks[task] = { task, completed: false };
        } else {
            // Otherwise, create a new object for the date
            updatedTasks.push({
                date,
                tasks: {
                    [task]: { task, completed: false }
                }
            });
        }

        setTaskList(updatedTasks);
        localStorage.setItem("tasklists", JSON.stringify(updatedTasks));

        if (updatedTasks.length > 0) {
            console.log("Updated taskList:", updatedTasks);
        }
    };

    const editTask = (newTaskValue, dateIndex, taskKey) => {
        const updatedTasks = [...taskList];
    
        // Check if dateIndex is valid
        if (updatedTasks[dateIndex] && updatedTasks[dateIndex].tasks[taskKey]) {
            updatedTasks[dateIndex].tasks[taskKey].task = newTaskValue;
            
            setTaskList(updatedTasks);
            localStorage.setItem("tasklists", JSON.stringify(updatedTasks));
        } else {
            console.error("Invalid dateIndex or taskKey");
        }
    };    

    const toggleCompletion = (dateIndex, taskKey) => {
        const updatedTasks = [...taskList];
        const task = updatedTasks[dateIndex].tasks[taskKey];
        if (task) {
            task.completed = !task.completed; // Toggle the completed status
            setTaskList(updatedTasks);
            localStorage.setItem("tasklists", JSON.stringify(updatedTasks));
        }
    };
    

    const removeTask = (dateIndex, taskKey) => {
        const updatedTasks = [...taskList];
        const dateTasks = updatedTasks[dateIndex].tasks;
    
        delete dateTasks[taskKey];
    
        if (Object.keys(dateTasks).length === 0) {
            // If no tasks left for this date, remove the date entry
            updatedTasks.splice(dateIndex, 1);
        }
    
        setTaskList(updatedTasks);
        localStorage.setItem("tasklists", JSON.stringify(updatedTasks));
    };
    

    return (
        <TaskContext.Provider value={{ taskList, addTask, editTask, removeTask, toggleCompletion }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return React.useContext(TaskContext);
};
