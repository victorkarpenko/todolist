import React, {useState, useEffect} from 'react';
import {AddList, Tasks, List} from './components';
import axios from 'axios';

import listIcon from "./assets/img/list.svg";

const listItems = [
    {
        icon: listIcon,
        name: "Все задачи"
    }
];

const App = () => {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeList, setActiveList] = useState(null);

    const getTasks = () => {
        return axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
            setLists(data);
            return data;
        });
    };

    useEffect(() => {

        getTasks().then((data)=> setActiveList(data[0]));

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
            if(item.id === activeList.id){
                item.tasks = [...item.tasks, task];
            }

            return item
        });
       setLists(newLists);
    };

    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List items={listItems}/>

                {lists ? <List toggleClick={(item) => {
                    setActiveList(item)
                }} removeItem={removeItem} items={lists} isRemovable onClickItem={true}/> : 'Waiting...'}

                <AddList addListItem={addListItem} colors={colors}/>
            </div>
            <div className="todo__tasks">
                {activeList && <Tasks onEditTitle={onEditListTitle} addTask={onAddTaskToList} activeList={activeList}/>}
            </div>
        </div>
    );
};

export default App;
