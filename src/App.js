import React, {useState} from 'react';
import List from "./components/List";
import AddList from './components/AddList'

import listIcon from "./assets/img/list.svg";
import DB from './assets/db';

const listItems = [
    {
        icon: listIcon,
        name: "Все задачи"
    }
];


const App = () => {

    const [lists, setLists] = useState(DB.lists.map(item => {
        item.color=DB.colors.find(color => color.id===item.colorId).name;
        return item;
    }));

   // debugger

    const addListItem = (newItem) =>{
      setLists([...lists, newItem]);
    };

    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List items={listItems}/>
                <List items={lists} isRemovable/>

                <AddList addListItem={addListItem} colors={DB.colors} />
            </div>
            <div className="todo__tasks">

            </div>
        </div>
    );
};

export default App;
