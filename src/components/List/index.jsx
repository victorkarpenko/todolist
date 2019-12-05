import React from 'react';

import c from './list.module.scss';

const List = ({items}) => {
    return (
        <ul className={c.list}>
            {
                items.map(i=>(
                    <li className={i.active && c.active} key={i.name}>
                        <i>{!i.color ? <img src={i.icon} alt=""/> : <span className={`badge badge--${i.color}`}></span>}</i>
                        <span>{i.name}</span>
                    </li>
                ))
            }
        </ul>
    )
};

export default List;