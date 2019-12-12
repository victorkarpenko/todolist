import React from 'react';
import axios from "axios";
import AddTaskForm from "./AddTaskForm";

import editIcon from '../../assets/img/edit.svg';
import './Tasks.scss'


const Tasks = ({activeList, onEditTitle, addTask}) => {

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
            <h1 className={"tasks__title"}>
                {activeList.name}
                <img className={'tasks__edit-title'} src={editIcon} alt="" onClick={editTitle}/>
            </h1>

            {(activeList.tasks.length > 0) ?
                <div className="tasks__items">
                    {
                        activeList.tasks.map(task => (
                            <div className="tasks__item" key={task.id}>
                                <div className="checkbox">
                                    <input type="checkbox" defaultChecked={task.completed} id={task.id}
                                           className={'checkbox__hidden'}/>
                                    <label htmlFor={task.id} className="checkbox__label">
                                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                                                  stroke="white"
                                                  strokeWidth="1.5" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </svg>
                                    </label>
                                </div>
                                <span className={'tasks__item-text'}>
                                            <input type="text" onChange={e => e.preventDefault()} value={task.text}/>
                                        </span>
                            </div>
                        ))
                    }
                </div>
                :
                <h2 className={'tasks__empty'}>Задачи отсутствуют</h2>
            }

            <AddTaskForm addTask={addTask} activeListId={activeList.id}/>
        </div>
    )
};

export default Tasks;