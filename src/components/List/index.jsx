import React, {useState} from 'react';
import classNames from 'classnames';
import {Badge} from '../../components';

import closeIcon from '../../assets/img/remove.svg'
import './list.scss';


const List = ({removeItem, isRemovable, items, toggleClick}) => {
    const [activeLink, setActiveLink] = useState(items[0].id ? items[0].id : false);

    const onLinkClick = (item) =>{

        if(activeLink){
            setActiveLink(item.id);
            toggleClick(item);
        } else{
            toggleClick();
        }

    };

    const removeList = (id) => {
        if(window.confirm('Вы действительно хотите удалить список?')){
            removeItem(id);
        }
    };

    return (
        <ul className='list'>
            {
                items.map(i=>(
                    <li className={classNames(i.className, {'active': activeLink===i.id} )} key={i.name} onClick={()=> onLinkClick(i)}>
                        {!i.color ? <img className={'list__icon'} src={i.icon} alt=""/> : <Badge color={i.color.name}/>}
                        <span className={'list__text'}>{i.name}</span>

                        {isRemovable && <img src={closeIcon} onClick={()=>{removeList(i.id)}} className={'list__remove-btn'} alt=""/>}
                    </li>
                ))
            }
        </ul>
    )
};

export default List;