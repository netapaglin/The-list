import { Navigate, Route, Routes } from "react-router-dom";
import AddList from "../../AddArea/addList/addList";
import AddTask from "../../AddArea/addTask/addTask";
import Edit from "../../EditArea/edit/edit";
import Home from "../../HomeArea/Home/Home";
import Tasks from "../../TasksArea/tasks/tasks";

import "./Routing.css";

function Routing(): JSX.Element {

    return (
        <div>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/tasks/:listId/:listName" element={<Tasks />} />
                <Route path="/add-list" element={<AddList />} />
                <Route path="/add-task/:listId/:listName" element={<AddTask />} />
                <Route path="/edit-task/:taskId" element={<Edit />} />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </div>
    );
}

export default Routing;
