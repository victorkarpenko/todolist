import React from 'react';
import Index from "./components/List";

import listIcon from "./assets/img/list.svg";

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

function App(props) {
    return (
        <div className="todo">
            <div className="todo__sidebar">
                <Index items={listItems}/>

                <Index items={listItems2}/>
            </div>
            <div className="todo__tasks">

            </div>
        </div>
    );
}

export default App;
