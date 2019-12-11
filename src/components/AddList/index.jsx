import React, {useEffect, useState} from 'react';
import {Badge} from '../../components';
import axios from 'axios';

import './AddList.scss'
import addIcon from "../../assets/img/add.svg";
import closeIcon from '../../assets/img/close.svg';


const listItem = {
    className: 'list__add-btn',
    icon: addIcon,
    name: "Добавить список"
};

const AddButtonList = ({addListItem, colors}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);

    const [activeColor, setActiveColor] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [inputValue, setInputValue] = useState('');

    useEffect(()=>{
        if(colors){
            setActiveColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () =>{
        setVisiblePopup(false);
        setInputValue('');
        setActiveColor(colors[0].id);
    };

    const addList = (e) => {
        e.preventDefault();

        if (!inputValue) {
            return;
        }

        setIsLoading(true);
        const color = colors.find(color => color.id === activeColor);
        axios.post('http://localhost:3001/lists', {name: inputValue, colorId:activeColor}).then(({data}) => {
            addListItem({...data, color});
            onClose();
        }).finally(()=>{
            setIsLoading(false);
        });
    };

    return (
        <div className={'add-list'}>

            <ul className='list' onClick={() => {
                setVisiblePopup(!visiblePopup)
            }}>
                <li className={listItem.className}>
                    <img className={'list__icon'} src={listItem.icon} alt=""/>
                    <span className={'list__text'}>{listItem.name}</span>
                </li>
            </ul>

            {
                visiblePopup && <div className="add-list__popup">
                    <img src={closeIcon} onClick={onClose} className={'add-list__popup-close'} alt=""/>
                    <input type="text"
                           placeholder={'Название списка'}
                           className={'field'}
                           value={inputValue}
                           onChange={(event) => {
                               setInputValue(event.target.value)
                           }}/>
                    <div className="add-list__colors">
                        {colors.map(color => <Badge key={color.id} onClick={() => {
                            setActiveColor(color.id)
                        }} active={color.id === activeColor} color={color.name}/>)}
                    </div>
                    <button type={'button'} className={'button'} onClick={addList}>{isLoading ? 'Добавление...' : 'Добавить'}</button>
                </div>
            }
        </div>
    )
};

export default AddButtonList;