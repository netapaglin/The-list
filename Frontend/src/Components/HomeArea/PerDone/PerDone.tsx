import { useEffect, useState } from "react";
import tasksService from "../../../Services/task-service";
import "./PerDone.css";

function PerDone({ id }: { id: string }): JSX.Element {
 
    const [tasks, setTasks] = useState([])
    const [perc, setPerc] = useState(0)

    useEffect(() => {
        tasksService
            .getTasksByList(id)
            .then(tasks => setTasks(tasks))
            .catch(err => alert(err.message));
    }, []);

    useEffect(() => {
        let count = 0
        if (tasks.length >0){
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].done === true) {
                    count++
                }
            }
            let percent = +(count / tasks.length).toFixed(2)*100
            setPerc(percent)
        }

    }, [tasks]);

    return (
        <div className="PerDone">
            <p className="Number">{perc}%</p>
            <p className="Done">done</p>
        </div>
    );
}

export default PerDone;
