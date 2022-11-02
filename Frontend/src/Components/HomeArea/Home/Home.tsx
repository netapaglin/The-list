import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListModel from "../../../Models/ListModel";
import listsService from "../../../Services/list-service";
import PerDone from "../PerDone/PerDone";
import "./Home.css";
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

function Home(): JSX.Element {

  const [lists, setLists] = useState<ListModel[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    listsService
      .getAllLists()
      .then(lists => setLists(lists))
      .catch(err => alert(err.message));
  }, []);


  const navigateTotasks = (l: ListModel) => {
     navigate(`/tasks/${l._id}/${l.listName}`, { state: { listId: l._id, listName: l.listName } });
  };

  const navigateToAddList = () => {
    navigate('/add-list');
  };


  return (
    <div className="Home">

      <h1>The List</h1>

      {lists.map(l =>
        <div className="listName" key={l._id} >
          <div className="percent">
            <PerDone id={l._id} />
          </div>
          <Button variant="contained" onClick={() => navigateTotasks(l)}>{l.listName}</Button>
     
        </div>
      )}

      <br />
      <div className="Add">
        <IconButton
          color="secondary"
          onClick={navigateToAddList}>
          <AddCircleIcon style={{ fontSize: 55 }} /></IconButton>
      </div>
    </div>
  );
}

export default Home;
