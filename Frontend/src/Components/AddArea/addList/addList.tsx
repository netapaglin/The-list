import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ListModel from "../../../Models/ListModel";
import listsService from "../../../Services/list-service";
import "./addList.css";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';



function AddList(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<ListModel>();
    const navigate = useNavigate();

    async function submit(list: ListModel) {
        try {
            const addedList = await listsService.addList(list)
            navigate("/home");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="addList">

            <IconButton className="Back" onClick={()=>navigate(-1)}><ArrowBackIcon /></IconButton>
            
           
            <form className="form" onSubmit={handleSubmit(submit)} noValidate>

             
                <TextField color="info" id="outlined-basic" label="Write new list" type="text" {...register("listName", {
                    required: { value: true, message: "Missing list name" }
                })} />
                <br/>
                <span>{formState.errors?.listName?.message}</span>
                <br/>
                <br/>

                <Button color="info" type="submit">Add</Button>

            </form>

        </div>
    );
}

export default AddList;
