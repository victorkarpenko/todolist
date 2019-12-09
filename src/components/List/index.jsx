import React from 'react';
import classNames from 'classnames';

import closeIcon from '../../assets/img/remove.svg'

import './list.scss';
import Badge from "../Badge";

const List = ({removeItem, isRemovable, items, toggleClick}) => {
    const removeList = (id) => {
        if(window.confirm('Вы действительно хотите удалить список?')){
            removeItem(id);
        }
    };

    return (
        <ul className='list'>
            {
                items.map(i=>(
                    <li className={classNames(i.className, {'active': i.active} )} key={i.name} onClick={toggleClick}>
                        {!i.color ? <img className={'list__icon'} src={i.icon} alt=""/> : <Badge color={i.color}/>}
                        <span className={'list__text'}>{i.name}</span>

                        {isRemovable && <img src={closeIcon} onClick={()=>{removeList(i.id)}} className={'list__remove-btn'} alt=""/>}
                    </li>
                ))
            }
        </ul>
    )
};

export default List;