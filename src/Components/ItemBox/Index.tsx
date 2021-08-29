import React, { FC } from 'react';
import {ItemBoxProps} from '../../Types/Index';
import './Styles.css';

const ItemBox: FC<ItemBoxProps> = ({name, onClick, type="button"}) => (
        <button className="Item" onClick={onClick} type={type}>
            {name}
        </button>
)

export default ItemBox