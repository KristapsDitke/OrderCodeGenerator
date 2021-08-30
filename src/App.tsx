import React, { useEffect, useState } from 'react';
import ItemBox from './Components/ItemBox/Index';
import ItemMenu from './Components/ItemMenu/Index';
import './App.css';
import {Item, Variety, SelectedItem, CodePart} from './Types/Index';

const App = () => {
  const [itemList, setItemList] = useState<Item[]>([])
  const [varietyList, setVarietyList] = useState<Variety[]>([])
  const [itemSelected, setItemSelected] = useState<SelectedItem | undefined>()
  const [orderCode, setOrderCode] = useState('')
  const [fullOrder, setFullOrder] = useState<string[]>([])
  const [codeParts, setCodeParts] = useState<CodePart[]>([])

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
    const startingCode : string = userChosenItem.code
    setOrderCode(startingCode)

    let codePartCollection: CodePart[] = []

    newSelectedItem.varieties.forEach(variety => {
      const part: CodePart = {
        type: variety.description,
        id: " - "
    }
    codePartCollection.push(part)
    setCodeParts(codePartCollection)    
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
          <ItemMenu 
            item={itemSelected}
            onSubmit={AddSelection}
            onReturn={BackToMenu}
            code={orderCode}
            codeParts={codeParts}
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
