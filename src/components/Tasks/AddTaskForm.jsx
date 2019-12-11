import React from 'react';
import addIcon from "../../assets/img/add.svg";

const AddTaskForm = (props) => {
    return (
        <div className="tasks__form">
            <div className="tasks__form-new">
                <img src={addIcon} alt=""/>
                <span>Новая задача</span>
            </div>
        </div>
    )
};

export default AddTaskForm