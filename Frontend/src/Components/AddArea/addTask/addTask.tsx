import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import TaskModel from "../../../Models/TaskModel";
import taskService from "../../../Services/task-service";
import "./addTask.css";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';

function AddTask(): JSX.Element {

    const { listId } = useParams()
    const { listName } = useParams()
    const { register, handleSubmit, formState } = useForm<TaskModel>();
    const navigate = useNavigate();

    async function submit(task: TaskModel) {
        try {
            await taskService.addTask(task, listId)
            navigate(-1)
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="addTask">

            <IconButton className="Back" onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>

            <form className="form" onSubmit={handleSubmit(submit)} noValidate>

                <TextField color="info" id="outlined-basic" label="Write new task" type="text" {...register("description", {
                    required: { value: true, message: "Missing task" }
                })} />
                <br />
                <span>{formState.errors?.description?.message}</span>
                <br />
                <br />
                <Button color="info" type="submit">Add</Button>

            </form>


        </div>
    );
}

export default AddTask;
