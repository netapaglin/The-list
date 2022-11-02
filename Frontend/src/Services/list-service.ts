import axios from "axios";
import ListModel from "../Models/ListModel";
import config from "../Utils/Config";

class ListsService {

    // Get all lists: 
    public async getAllLists(): Promise<ListModel[]> {
        const response = await axios.get<ListModel[]>(config.listsUrl);
        return response.data.reverse();
    }

     // Delete list: 
     public async deleteList(listId: string): Promise<void> {
     await axios.delete(config.deletelistsUrl + listId);
    }

       // Add list: 
    public async addList(list: ListModel): Promise<ListModel> {
        const response = await axios.post<ListModel>(config.addListUrl, list);
        return response.data;
    }

}

const listsService = new ListsService()
export default listsService;