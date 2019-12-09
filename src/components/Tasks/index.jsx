import React from 'react';

import editIcon from '../../assets/img/edit.svg';
import './Tasks.scss'

const Tasks = (props) => {
    return(
        <div className="tasks">
            <h1 className={"tasks__title"}>Frontend <img className={'tasks__edit-title'} src={editIcon} alt=""/></h1>

            <div className="tasks__items">
                <div className="tasks__item">
                    <div className="checkbox">
                        <input type="checkbox" id={'checkbox1'} className={'checkbox__hidden'}/>
                        <label htmlFor="checkbox1" className="checkbox__label">
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </label>
                    </div>
                    <span className={'tasks__item-text'}>ывавыа</span>
                </div>

            </div>
        </div>
    )
};

export default Tasks;