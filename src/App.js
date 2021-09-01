/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Table } from 'antd';
import { InputNumber } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import { Button } from "antd";
import axios from "axios";
import "./App.css";

const BACEND_URL = 'http://localhost:3001/';
let intervalId = -1;

function App() {
  const [trackTable, setTrackTable] = useState([]);
  const [price, setPrice] = useState(0);
  const [parity, setParity] = useState("usd");
  const [operation, setOperation] = useState("GREATER");


  
  const onSync = () => {
    console.log('sync started...')
    const path = 'sync';
    axios.get(BACEND_URL+path).then(res=>{
      setTrackTable(res.data)
    })
 
  }
  const startTrack = () => {
    clearInterval(intervalId);
    axios.get(BACEND_URL+'startBot').then(res=>{
      console.log(res.data)
    })
    intervalId = setInterval(() => {
      onSync()
    }, 1000*60*5);
  }
  const stopTrack = () => {
    clearInterval(intervalId);
    const path = 'stop';

    axios.get(BACEND_URL+path).then(res=>{
      console.log(res.data)
    })
   
  }
  const addParity = () => {
    const path = 'add';
    const reqParam = {parity,operation,price};

    axios.post(BACEND_URL+path,reqParam).then(res=>{
      setTrackTable(res.data)
    })
  }
  

  const { Option } = Select;
  const operationMenu = (
    <Select
      defaultValue="GREATER"
      style={{ width: 120 }}
      onChange={setOperation}
    >
      <Option value="GREATER">GREATER</Option>
      <Option value="LESS">LESS</Option>
    </Select>
  );

  const removeTrack = (key) => {
    const path = 'remove';
    console.log(key)
    axios.post(BACEND_URL+path,{key}).then(res=>{
      setTrackTable(res.data);
    })
  }
  
  const columns = [
    {
      title: 'Parity',
      dataIndex: 'parity',
      key: 'parity',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Condition',
      dataIndex: 'conditionDone',
      key: 'conditionDone',
      render: (text, record) => {
        let color = 'red';
        if(record.conditionDone){
          if(record.candleCloseCondition)
            color = 'green';
          else
            color = 'yellow';
        }
        return <div style={{width:'10px',height:'10px',backgroundColor: color}}>
        </div>
      }
    },
    {
      
      dataIndex: 'remove',
      key: 'remove',
      render: (text, record) => {
        return <Button  type="primary" danger onClick={()=> removeTrack(record.key)}> DELETE
        </Button>
      }
    }
    
  ]

  return (
    <div className="App">
      <div style={{display:'flex'}}>
      <Button className="setupButtons" type="primary" onClick={onSync}>SYNC</Button>
      <Button className="setupButtons" type="primary" onClick={startTrack}>Start Track</Button>
      <Button className="setupButtons" type="primary" onClick={stopTrack}>Stop Track</Button>
      </div>

      <div className="additionBox">
      <div className="additionMenu">
        <h3>Parity</h3>
        <h3>Operation</h3>
        <h3>Price</h3>
        <h3></h3>
      </div>
      <div className="additionMenu">
        <div>
          <Input placeholder="parity" onChange={(e)=> setParity(e.target.value)}></Input>
        </div>
        <div>{operationMenu}</div>
        <div>
        <InputNumber
              onChange={setPrice}
            />
        </div>
        <div>
        <Button  type="primary" onClick={addParity}>+</Button>
        </div>
      </div>
      </div>

      <div className="trackTable">
      <Table columns={columns} dataSource={trackTable} />
      </div>
    </div>
  );
}

export default App;
