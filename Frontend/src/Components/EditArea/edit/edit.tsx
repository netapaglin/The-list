import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import TaskModel from "../../../Models/TaskModel";
import taskService from "../../../Services/task-service";
import "./edit.css";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";

function Edit(): JSX.Element {

    const { taskId } = useParams()
    const { register, handleSubmit, formState } = useForm<TaskModel>();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    async function submit(task: TaskModel) {

        try {
            await taskService.editTask(task, taskId, dispatch)
            navigate(-1)
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="edit">
            <IconButton className="Back" onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
            <form className="form" onSubmit={handleSubmit(submit)} noValidate>
                <TextField color="info" id="outlined-basic" label="Edit task" type="text" {...register("description", {
                    required: { value: true, message: "Missing task" }
                })} />
                <br />
                <span>{formState.errors?.description?.message}</span>
                <br />
                <br />
                <Button color="info" type="submit">Edit</Button>
            </form>
        </div>
    );
}

export default Edit;
