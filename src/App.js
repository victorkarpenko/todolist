import React from 'react';
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

const listItems2 = [
    {
        color: 'green',
        name: 'Покупки'
    },
    {
        color: 'blue',
        name: 'Фронтенд',
        active: true
    },
    {
        color: 'pink',
        name: 'Фильмы и сериалы'
    }
];


const App = () => {
    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List items={listItems}/>
                <List items={listItems2} isRemovable/>

                <AddList colors={DB.colors} />
            </div>
            <div className="todo__tasks">

            </div>
        </div>
    );
};

export default App;
