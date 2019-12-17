import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'http://localhost:3001/',
        headers: {}
    }
);

export const listsAPI = {
    getLists(){
        return instance.get('lists?_expand=color&_embed=tasks').then(({data})=>data);
    },
    addList(listObj){
        return instance.post('lists', listObj).then(({data})=>data);
    },
    updateList(id, listObj){
        return instance.patch(`lists/${id}`, listObj)
    },
    deleteList(id){
        return instance.delete(`lists/${id}`);
    }
};

export const tasksAPI ={
    deleteTask(id){
        return instance.delete(`tasks/${id}`);
    },
    updateTask(id, taskObj){
        return instance.patch(`tasks/${id}`, taskObj)
    },
    addTask(taskObj){
        return instance.post('tasks', taskObj).then(({data})=>data);
    }
};

export const appAPI = {
    getColors(){
        return instance.get('colors').then(({data})=>data);
    }
};