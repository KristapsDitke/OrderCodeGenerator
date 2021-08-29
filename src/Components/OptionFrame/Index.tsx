import React, { FC } from 'react';
import './Styles.css';
import {OptionFrameProps} from '../../Types/Index';

const OptionFrame: FC<OptionFrameProps> = ({variety, updateCode}) => {

    return(
    <div className="optionFrame">
        <p>{variety.description}</p>

        {variety.options.map((opt, index) => (
        <div key={index}>

            <input
            type="radio" 
            value={opt.description} 
            name={variety.description} 
            id={opt.code} 
            onChange={(e) => {updateCode(e.target.id, e.target.name)}} 
            required/> 
            <label htmlFor={opt.code}>
                {opt.description}
            </label>
                            
        </div>                
        ))} 

    </div>         
    )
}

export default OptionFrame