import React, { FC, useState } from 'react';
import './Styles.css';
import {Inputs, MenuProps} from '../../Types/Index';
import OptionFrame from '../OptionFrame/Index';
import { useForm, SubmitHandler } from "react-hook-form";

const Menu: FC<MenuProps> = ({item, onSubmit, onReturn, code, arr}) => {
    
    const [orderCode, setOrderCode] = useState<string>(code)
    const {register, handleSubmit} = useForm<Inputs>()
    
    const updateCode = (id : string, name : string) => {

        arr.forEach(element => {
            if(element.type === name){
                element.id = id
        }})
        
        let result : string = code
        arr.forEach(element => {
            result += "-" + element.id
        });
        
        setOrderCode(result)
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
                Atgriezties pie saraksta
            </button>
            <button type="submit">
                Apstiprināt izvēli
            </button>
        </form>
    </div>        
)}

export default Menu