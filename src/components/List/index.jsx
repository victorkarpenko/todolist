import React from 'react';
import classNames from 'classnames';

import './list.scss';
import Badge from "../Badge";

const List = ({isRemovable, items, toggleClick}) => {
    return (
        <ul className='list'>
            {
                items.map(i=>(
                    <li className={classNames(i.className, {'active': i.active} )} key={i.name} onClick={toggleClick}>
                        {!i.color ? <img src={i.icon} alt=""/> : <Badge color={i.color}/>}
                        <span>{i.name}</span>
                    </li>
                ))
            }
        </ul>
    )
};

export default List;