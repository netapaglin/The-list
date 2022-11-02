import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskModel from "../../../Models/TaskModel";
import { RootState } from "../../../Redux/Store";
import listsService from "../../../Services/list-service";
import taskService from "../../../Services/task-service";
import tasksService from "../../../Services/task-service";
import "./tasks.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from "react-redux";


function Tasks(): JSX.Element {

    const tasks = useSelector<RootState, TaskModel[]>(state => state.tasksState.tasks)
    const { listName } = useParams()
    const navigate = useNavigate();
    const location = useLocation()

    const [perc, setPerc] = useState(Number)

    const dispatch = useDispatch()


    useEffect(() => {
        if (location.state.listId)
            tasksService
                .getTasksByList(location.state.listId)
                .catch(err => alert(err.message));

    }, [location , perc]);

    useEffect(() => {
        let count = 0
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].done === true) {
                count++
            }
        }
        let percent = +(count / tasks.length).toFixed(2)*100
        setPerc(percent)
    }, [tasks]);

    const handleCheckbox = async (t: TaskModel) => {
        try {
            await taskService.editTask({ ...t, done: !t.done }, t._id, dispatch)
        }
        catch (err: any) {
            alert(err.message);
        }
    };


    const navigateTolists = () => {
        navigate('/home');
    };

    const navigateToAddTask = () => {
        navigate(`/add-task/${location.state.listId}/${listName}`);
    };

    const navigateToEditTask = (t: TaskModel) => {
        navigate(`/edit-task/${t._id}`, { state: { listId: t._id, listName: t.listName } });
    };

    const deleteTask = (id: string) => {
        tasksService.deleteTasks(id)
    }

    const deleteList = () => {
        const confirmDelete = window.confirm("Are you sure? All the list will gone");
        if (!confirmDelete) return;
        listsService.deleteList(location.state.listId)
        navigate('/home')
    }


    return (
        <div className="Tasks">
            <IconButton color="secondary" className="Back" onClick={navigateTolists}><ArrowBackIcon /></IconButton>
            <IconButton color="secondary" className="DelList" onClick={deleteList}><DeleteIcon fontSize="small" /></IconButton>
            <br />
            <br />
            <h3 color="info">{location.state.listName}</h3>
            <p>{perc}% done</p>
            {tasks.map(t =>
                <div className="TaskLine" key={t._id}>
                    <br />
                    <input type="checkbox" className="Checkbox" checked={t.done} onChange={() => handleCheckbox(t)} />
                    <p color="info">{t.description}</p>
                    <IconButton color="info" onClick={() => navigateToEditTask(t)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton color="info" onClick={() => deleteTask(t._id)}> <DeleteIcon fontSize="small" /></IconButton>
                </div>
            )}

            <div className="Add">

                <IconButton
                    color="secondary"
                    size="large"
                    onClick={navigateToAddTask}><AddCircleIcon  style={{ fontSize: 55 }} /></IconButton>
            </div>
        </div>
    );
}

export default Tasks;


