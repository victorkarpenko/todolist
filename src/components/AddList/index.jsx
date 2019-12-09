import React, {useState} from 'react';
import List from "../List";
import Badge from "../Badge";

import './AddList.scss'
import addIcon from "../../assets/img/add.svg";
import closeIcon from '../../assets/img/close.svg';


const listItems3 = [
    {
        className: 'list__add-btn',
        icon: addIcon,
        name: "Добавить список"
    }
];

const AddButtonList = ({addListItem, colors}) => {
    let [visiblePopup, setVisiblePopup] = useState(false);

    let [activeColor, setActiveColor] = useState(colors[0].id);

    let [inputValue, setInputValue] = useState('');

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

        const color = colors.find(color => color.id === activeColor).name;
        addListItem({id: Math.random(), name: inputValue, color});
        onClose()
    };

    return (
        <div className={'add-list'}>
            <List items={listItems3} toggleClick={() => {
                setVisiblePopup(!visiblePopup)
            }}/>
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
                    <button type={'button'} className={'button'} onClick={addList}>Добавить</button>
                </div>
            }
        </div>
    )
};

export default AddButtonList;