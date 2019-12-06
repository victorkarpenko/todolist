import React, {useState} from 'react';
import List from "../List";
import Badge from "../Badge";

import './AddList.scss'
import addIcon from "../../assets/img/add.svg";
import closeIcon from '../../assets/img/close.svg';


const listItems3= [
    {
        className: 'list__add-btn',
        icon: addIcon,
        name: "Добавить список"
    }
];

const AddButtonList = ({colors}) => {
    let [visiblePopup, setVisiblePopup] = useState(true);

    let [activeColor, setActiveColor] = useState(colors[0].id);

    return (
        <div className={'add-list'}>
            <img src="" alt=""/>
            <List items={listItems3} toggleClick={() => {setVisiblePopup(!visiblePopup)}}/>
            {
                visiblePopup && <div className="add-list__popup">
                    <img src={closeIcon} onClick={()=>{setVisiblePopup(false)}} className={'add-list__popup-close'} alt=""/>
                    <input type="text" placeholder={'Название списка'} className={'field'}/>
                    <div className="add-list__colors">
                        {colors.map(color => <Badge key={color.id} onClick={() =>{setActiveColor(color.id)}} active={color.id===activeColor} color={color.name}/>)}
                    </div>
                    <button className={'button'}>Добавить</button>
                </div>
            }
        </div>
    )
};

export default AddButtonList;