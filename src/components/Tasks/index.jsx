import React from 'react';
import axios from "axios";
import AddTaskForm from "./AddTaskForm";

import editIcon from '../../assets/img/edit.svg';
import './Tasks.scss'
import Task from "./Task";


const Tasks = ({activeList, onEditTitle, addTask, withoutEmpty}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Название списка ', activeList.name);
        if (newTitle) {
            onEditTitle(activeList.id, newTitle);
            axios.patch(`http://localhost:3001/lists/${activeList.id}`, {
                name: newTitle
            }).catch(() => {
                    alert('Не удалось обновить название списка');
                }
            )
        }
    };

    return (
        <div className="tasks">
            <h1 className={"tasks__title"} style={{color: activeList.color.hex}}>
                {activeList.name}
                <img className={'tasks__edit-title'} src={editIcon} alt="" onClick={editTitle}/>
            </h1>

            {(activeList.tasks.length > 0) ?
                <div className="tasks__items">
                    {
                        activeList.tasks.map(task => (
                           <Task key={task.id} {...task}/>
                        ))
                    }
                </div>
                :
                !withoutEmpty && <h2 className={'tasks__empty'}>Задачи отсутствуют</h2>
            }

            <AddTaskForm addTask={addTask} activeListId={activeList.id}/>
        </div>
    )
};

export default Tasks;