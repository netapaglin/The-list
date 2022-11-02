class Config {
}

class DevelopmentConfig extends Config {
   
    public giftsUrl = "http://localhost:3001/api/gifts/";
    public tasksUrl = "http://localhost:3001/api/tasks";
    public tasksByListUrl = "http://localhost:3001/api/tasks/";
    public addTaskUrl = "http://localhost:3001/api/task/";
    public editTaskUrl = "http://localhost:3001/api/task/";
    public listsUrl = "http://localhost:3001/api/lists";
    public deletelistsUrl = "http://localhost:3001/api/list/";
    public deletetasksUrl = "http://localhost:3001/api/task/";
    public addListUrl = "http://localhost:3001/api/lists";
}

class ProductionConfig extends Config {

    public giftsUrl = "http://localhost:3001/api/gifts/";
    public tasksUrl = "http://localhost:3001/api/tasks";
    public tasksByListUrl = "http://localhost:3001/api/tasks/";
    public addTaskUrl = "http://localhost:3001/api/task/";
    public editTaskUrl = "http://localhost:3001/api/task/";
    public listsUrl = "http://localhost:3001/api/lists";
    public deletelistsUrl = "http://localhost:3001/api/list/";
    public deletetasksUrl = "http://localhost:3001/api/task/";
    public addListUrl = "http://localhost:3001/api/lists";
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
