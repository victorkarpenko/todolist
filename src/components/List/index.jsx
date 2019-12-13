import React from 'react';
import classNames from 'classnames';
import {Badge} from '../../components';

import closeIcon from '../../assets/img/remove.svg'
import './list.scss';


const List = ({
      removeItem,
      isRemovable,
      items,
      onClickItem,
      activeItem
    }) => {

    const removeList = (id) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            removeItem(id);
        }
    };

    return (
        <ul className='list'>
            {
                items.map(i => (<li className={classNames(i.className, {
                        active: i.active
                            ? i.active
                            : activeItem && activeItem.id === i.id
                    })} key={i.name}
                                    onClick={onClickItem ? () => {
                                        onClickItem(i)
                                    } : null}>
                        {!i.color ? <img className={'list__icon'} src={i.icon} alt=""/> : <Badge color={i.color.name}/>}
                        <span
                            className={'list__text'}>{i.name} {i.tasks && !!i.tasks.length && `(${i.tasks.length})`}</span>

                        {isRemovable && <img src={closeIcon} onClick={(e) => {
                            e.stopPropagation();
                            removeList(i.id)
                        }} className={'list__remove-btn'} alt=""/>}
                    </li>
                ))
            }
        </ul>
    )
};

export default List;