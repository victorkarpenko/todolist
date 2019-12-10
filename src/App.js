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

    useEffect(()=>{

        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data})=>{
            setLists(data);
            setActiveList(data[0]);
        });

        axios.get('http://localhost:3001/colors').then(({data})=>{
            setColors(data);
        });
    }, []);



    const removeItem = (itemId) =>{
        const newList = lists.filter(i => i.id!==itemId);
        axios.delete('http://localhost:3001/lists/' + itemId).then(({data})=>{
            setLists(newList);
        });
    };

   // debugger

    const addListItem = (newItem) =>{
      setLists([...lists, newItem]);
    };


    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List items={listItems}/>

                {lists ? <List toggleClick={(item)=>{setActiveList(item)}} removeItem={removeItem} items={lists} isRemovable/> : 'Waiting...'}

                <AddList addListItem={addListItem} colors={colors} />
            </div>
            <div className="todo__tasks">
                {activeList && <Tasks activeList={activeList}/> }
            </div>
        </div>
    );
};

export default App;
