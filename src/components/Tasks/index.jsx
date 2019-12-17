import React from 'react';
import {Link} from "react-router-dom";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

import editIcon from '../../assets/img/edit.svg';
import './Tasks.scss'


const Tasks = ({activeList, onEditTitle, addTask, withoutEmpty, removeTask, onEditTask, onCompletedTask}) => {
        return (
        <div className="tasks">

            <h1 className={"tasks__title"} style={{color: activeList.color.hex}}>
                <Link to={`/lists/${activeList.id}`}>
                    {activeList.name}
                </Link>

                <img className={'tasks__edit-title'} src={editIcon} alt="" onClick={()=>{onEditTitle(activeList)}}/>
            </h1>

            {(activeList.tasks.length > 0) ?
                <div className="tasks__items">
                    {
                        activeList.tasks.map(task => (
                           <Task key={task.id}
                                 list={activeList}
                                 onCompleted={onCompletedTask}
                                 onEdit={onEditTask}
                                 onRemove={removeTask}
                                 task={task}/>
                        ))
                    }
                </div>
                :
                !withoutEmpty && <h2 className={'tasks__empty'}>Задачи отсутствуют</h2>
            }

            <AddTaskForm key={activeList.id} addTask={addTask} activeListId={activeList.id}/>
        </div>
    )
};

export default Tasks;