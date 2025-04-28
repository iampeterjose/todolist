import Input from "./components/Input";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return(
    <div className="flex justify-center">
      <div className=" flex flex-col bg-slate-100 min-h-screen w-[700px] p-4 shadow-md shadow-slate-400">
        <h1 className="text-3xl text-slate-800 font-semibold text-center">To do list</h1>
        <TaskProvider>
          <Input />
          <TaskList />
        </TaskProvider>
      </div>
    </div>
  );
}

export default App
