import React from 'react';
import './Badge.scss'
import classNames from "classnames";


const Badge = ({color, onClick, active}) => {
    return (
        <span onClick={onClick} className={classNames('badge', `badge--${color}`, {'active': active})}></span>
    )
};

export default Badge;
