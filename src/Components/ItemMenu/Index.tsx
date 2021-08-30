import React, { FC, useState } from 'react';
import './Styles.css';
import {Inputs, ItemMenuProps} from '../../Types/Index';
import OptionFrame from '../OptionFrame/Index';
import { useForm, SubmitHandler } from "react-hook-form";

const ItemMenu: FC<ItemMenuProps> = ({item, onSubmit, onReturn, code, codeParts}) => {
    
    const [orderCode, setOrderCode] = useState<string>(code)
    const {register, handleSubmit} = useForm<Inputs>()
    
    const updateCode = (id : string, name : string) => {

        codeParts.forEach(part => {
            if(part.type === name){
                part.id = id
        }})
        
        let codeResult : string = code
        codeParts.forEach(element => {
            codeResult += "-" + element.id
        });
        
        setOrderCode(codeResult)
    }

    const localSubmit: SubmitHandler<Inputs> = data => {

        onSubmit(orderCode + " / " + data.amount + " gab.")
    }
        
    return(
    <div className="outLine">
        <form className="orderForm" onSubmit={handleSubmit(localSubmit)}>
            <h3>{item.description}</h3>
            {item.varieties.map((variety, index) => {
                return(
                    <OptionFrame
                    key={index}
                    variety={variety}
                    updateCode={updateCode}/>             
            )})}
            
            <div className="one">
                <label htmlFor="amount">Daudzums</label>
                <input type="number"  {...register("amount", {required: true, min: 1})}/>    
            </div>      

            <div className="codePreview">Pasūtījuma kods - {orderCode}</div>

            <button type="button" onClick={onReturn}>
                Atgriezties pie izvēlnes
            </button>
            <button type="submit">
                Apstiprināt izvēli
            </button>
        </form>
    </div>        
)}

export default ItemMenu