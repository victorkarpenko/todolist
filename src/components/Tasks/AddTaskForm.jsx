import React, {useState} from 'react';

import addIcon from "../../assets/img/add.svg";
import axios from "axios";

const AddTaskForm = ({addTask, activeListId}) => {
    const [visibleInput, setVisibleInput] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const addTaskItem = () => {
        if(!!inputValue.length){

            const task = {
                listId: activeListId,
                text: inputValue,
                completed: false
            };

            axios.post(`http://localhost:3001/tasks`, task).then(data=>{
                debugger
                addTask(data.data);
                closeInput();
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
                               <button type={'button'} className={'button'}
                                       onClick={addTaskItem}>{'Добавить задачу'}</button>

                               <button type={'button'} className={'button button--gray'}
                                       onClick={closeInput}>{'Отменить'}</button>
                           </div>

                    </div>

                    :


                        <div className="tasks__form-new" onClick={()=>{setVisibleInput(true)}}>
                            <img src={addIcon} alt=""/>
                            <span>Новая задача</span>
                        </div>

            }

        </div>
    )
};

export default AddTaskForm