import React, {useState, useEffect} from 'react';
import {AddList, Tasks, List} from './components';
import axios from 'axios';
import {BrowserRouter, Route, useHistory} from "react-router-dom";

import listIcon from "./assets/img/list.svg";

const App = () => {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeItem, setActiveItem] = useState();

    let history = useHistory();

    const getTasks = () => {
        return axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
            setLists(data);
            return data;
        });
    };

    useEffect(() => {
        getTasks().then((data)=>  setActiveItem(data[0]));
        axios.get('http://localhost:3001/colors').then(({data}) => {
            setColors(data);
        });
    }, []);

    const removeItem = (itemId) => {
        const newList = lists.filter(i => i.id !== itemId);
        axios.delete('http://localhost:3001/lists/' + itemId).then(({data}) => {
            setLists(newList);
        });
    };

    const addListItem = (newItem) => {
        setLists([...lists, {...newItem, tasks:[]}]);
    };

    const onEditListTitle = (id, title) => {
        const newLists = lists.map(l=>{
            if(l.id === id){
                l.name = title;
            }
            return l;
        });

        setLists(newLists);
    };

    const onAddTaskToList = (task) =>{

        const newLists = lists.map(item => {
            debugger
            if(item.id === task.listId){
                item.tasks = [...item.tasks, task];
            }

            return item
        });
       setLists(newLists);
    };

    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List items={[{icon: listIcon,name: "Все задачи"}]} activeItem={activeItem} onClickItem={(item) => {setActiveItem(item); history.push(`/`)}} />

                {lists ? <List onClickItem={(item) => {
                    history.push(`/lists/${item.id}`);
                    setActiveItem(item);
                }} activeItem={activeItem} removeItem={removeItem} items={lists} isRemovable/> : 'Waiting...'}

                <AddList addListItem={addListItem} colors={colors}/>
            </div>
            <div className="todo__tasks">

                <Route exact path={"/"}>
                    {
                        lists && lists.map(list => (
                            <Tasks key={list.id} onEditTitle={onEditListTitle} addTask={onAddTaskToList} activeList={list} withoutEmpty={true}/>
                        ))
                    }
                </Route>
{/*                { activeList && <Tasks onEditTitle={onEditListTitle} addTask={onAddTaskToList} activeList={activeList}/> }*/}
            </div>
        </div>
    );
};

const AppWithRouter = () => (<BrowserRouter><App/></BrowserRouter>);

export default AppWithRouter;
