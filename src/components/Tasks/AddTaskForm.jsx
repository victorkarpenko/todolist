import React, {useState} from 'react';

import addIcon from "../../assets/img/add.svg";
import {tasksAPI} from "../../api";

const AddTaskForm = ({addTask, activeListId}) => {
    const [visibleInput, setVisibleInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const addTaskItem = () => {
        if (!!inputValue.length) {

            setIsLoading(true);

            const task = {
                listId: activeListId,
                text: inputValue,
                completed: false
            };

            tasksAPI.addTask(task).then(data => {
                addTask(data);
                closeInput();
            }).finally(() => {
                setIsLoading(false);
            })
        }

    };

    const closeInput = () => {
        setVisibleInput(false);
        setInputValue('');
    };

    return (
        <div className="tasks__form">

            {
                visibleInput ?

                    <div className="tasks__form-group">
                        <input type="text"
                               placeholder={'Текст задачи'}
                               className={'field'}
                               value={inputValue}
                               onChange={(event) => {
                                   setInputValue(event.target.value)
                               }}/>
                        <div className="tasks__button-wrp">
                            <button disabled={isLoading} type={'button'} className={'button'}
                                    onClick={addTaskItem}>{isLoading ? 'Добавление...' : 'Добавить задачу'}</button>
                            <button disabled={isLoading} type={'button'} className={'button button--gray'}
                                    onClick={closeInput}>{'Отменить'}</button>
                        </div>
                    </div>

                    :

                    <div className="tasks__form-new" onClick={() => {
                        setVisibleInput(true)
                    }}>
                        <img src={addIcon} alt=""/>
                        <span>Новая задача</span>
                    </div>
            }

        </div>
    )
};

export default AddTaskForm