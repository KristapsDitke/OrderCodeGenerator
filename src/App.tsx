import React, { useEffect, useState } from 'react';
import ItemBox from './Components/ItemBox/Index';
import Menu from './Components/Menu/Index';
import './App.css';
import {Item, Variety, SelectedItem, Position} from './Types/Index';

const App = () => {
  const [itemList, setItemList] = useState<Item[]>([])
  const [varietyList, setVarietyList] = useState<Variety[]>([])
  const [itemSelected, setItemSelected] = useState<SelectedItem | undefined>()
  const [orderCode, setOrderCode] = useState('')
  const [fullOrder, setFullOrder] = useState<string[]>([])
  const [arr, setArr] = useState<Position[]>([])

  const getData=()=>{
    fetch('sample.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        setVarietyList(myJson.varieties);
        setItemList(myJson.items)
      });
  }

  useEffect(()=>{
    getData()
  },[])

  const BackToMenu = () => {
    setItemSelected(undefined)
  }

  const GetChoices = (userChosenItem: Item) => {

    const newSelectedItem : SelectedItem = {
      code: userChosenItem.code,
      description: userChosenItem.description,
      varieties: []
    }   

    userChosenItem.varieties.forEach(variety => {
      
      varietyList.forEach(varietyFromList => {
        varietyFromList.code === variety && 
        newSelectedItem.varieties.push(varietyFromList)
      })
    })

    setItemSelected(newSelectedItem)
    const code : string = userChosenItem.code
    setOrderCode(code)

    let tempArr: Position[] = []

    newSelectedItem.varieties.map((v) => {
      const position: Position = {
        type: v.description,
        id: " - "
    }
    tempArr.push(position)
    setArr(tempArr)
    return(NaN)
    })
  }

  const AddSelection = (newCode: string) => {

    setItemSelected(undefined)
    const orderList : string[] = fullOrder
    orderList.push(newCode)
    setFullOrder(orderList)
    setOrderCode('')
  }

  const Clear = () => {
    const emptyArr : string[] = []
    setFullOrder(emptyArr)
  }

  return (

    <div className="App">
      <header className="App-header">
        <div className="Menu">
          {!itemSelected ? 
          itemList.map((item: Item, index) => (
                <ItemBox
                key={index} 
                name={item.description} 
                onClick={() => GetChoices(item)} type="button"/>
              )
          )
          : 
          <Menu 
            item={itemSelected}
            onSubmit={AddSelection}
            onReturn={BackToMenu}
            code={orderCode}
            arr={arr}
          />}
        </div>

        <div className="Order">
          {fullOrder.length > 0 && <h3>Pasūtījuma saraksts:</h3>}
            {fullOrder.map((item, index) => (
              <p key={index}>
                {item}
              </p>
            ))}
          {fullOrder.length > 0 && 
          <button type="button" onClick={Clear}>Notīrīt sarakstu</button>
          }
        </div>
        
      </header>
    </div>

  );
}

export default App;
