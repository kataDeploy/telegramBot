import React, { useState } from "react";
import axios from "axios";
import * as line from "./SRline.js";
import { List } from "antd";
import { InputNumber } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import "./TechnicalRequirements.css";

const TechnicalRequirements = () => {
  const [market, setMarket] = useState("BTCUSDT");
  const [tickInterval, setTickInterval] = useState("1d");
  const [tickCount, setTickCount] = useState(100);
  const [pineEditorOutput, setPineEditorOutput] = useState([
    'study(title="SRLine", shorttitle="SRLine", overlay=true)',
  ]);

  const [percentage, setPercentage] = useState(5);
  const [strengthLevel, setStrengthLevel] = useState(1);
  const [candleSequence, setCandleSeuqence] = useState(10);

  const SRColors = {
    "1M": "orange",
    "1w": "green",
    "1d": "blue",
    "4h": "yellow",
    "1h": "red"
  };
  const getBinanceData = () => {
    const url =
      "https://api.binance.com/api/v3/klines?symbol=" +
      market +
      "&interval=" +
      tickInterval +
      "&limit=" +
      tickCount;
    axios.get(url).then((res) => {
      const arr = [];
      const arr2 = [];
      const arr3 = [];
      const arrClose = [];
      for (let i = 0; i < res.data.length; i++) {
        const a = {
          date: new Date(res.data[i][0]).toString(),
          open: parseFloat(res.data[i][1]),
          high: parseFloat(res.data[i][2]),
          low: parseFloat(res.data[i][3]),
          close: parseFloat(res.data[i][4]),
        };
        arr.push(a);
        arr2.push(a.low);
        arr3.push(a.high);
        arrClose.push(a.close);
      }
      const minMean = line.SupLine(arr2, candleSequence, percentage, strengthLevel);
      const maxMean = line.ResLine(arr3, candleSequence, percentage, strengthLevel);
      minMean.push({ mean: Math.min(...arr2), strength: 99 });
      maxMean.push({ mean: Math.max(...arr3), strength: 99 });
      const eliminatedMin = eliminateCloseSR(minMean);
      const eliminatedMax = eliminateCloseSR(maxMean);
      const concatArr = eliminateCloseSR(
        concatArray(eliminatedMin, eliminatedMax)
      );

      concatArr.forEach((el) => {
        setPineText(
          `hline(${el.mean}, title="none", color=color.${SRColors[tickInterval]}, linestyle=hline.style_solid)`
        );
        //concatArrSimple.push(el.mean);
      });
    });
  };

  const findPercentageDif = (initVal, lastVal) => {
    const dif = initVal - lastVal;
    const perc = parseFloat(dif / initVal) * 100;
    return perc;
  };
  const concatArray = (arr1, arr2) => {
    return arr1.concat(arr2);
  };
  const eliminateCloseSR = (arr) => {
    const removedElements = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = i; j < arr.length; j++) {
        if (
          Math.abs(findPercentageDif(arr[i].mean, arr[j].mean)) < 0.3 &&
          findPercentageDif(arr[i].mean, arr[j].mean) !== 0 &&
          !removedElements.includes(j) &&
          !removedElements.includes(i)
        ) {
          if (arr[i].strength > arr[j].strength) {
            removedElements.push(j);
          } else {
            removedElements.push(i);
          }
        }
      }
    }
    return arr.filter((el, index) => !removedElements.includes(index));
  };

  const setPineText = (text) => {
    setPineEditorOutput((prev) => [...prev, text]);
  };
  const clearPineText = () => {
    setPineEditorOutput(['study(title="SRLine", shorttitle="SRLine", overlay=true)']);
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
          <div>

        <Button
          className="setupButtons"
          type="primary"
          onClick={getBinanceData}
        >
          CREATE PINE OUTPUT
        </Button>
        <Button
          className="setupButtons"
          type="primary"
          onClick={clearPineText}
        >
          CLEAR
        </Button>
          </div>
        <div className="selectionBox">
          <Input
            placeholder="Parity"
            onChange={(e) => setMarket(e.target.value.toUpperCase())}
            style={{'text-transform':'uppercase'}}
          ></Input>
          <Input
            placeholder="Tick interval (1m,1w,1d,etc.)"
            onChange={(e) => setTickInterval(e.target.value)}
          ></Input>
          <Input
            placeholder="Tick Count"
            onChange={(e) => setTickCount(e.target.value)}
          ></Input>
          <Input
            placeholder="SR gap percentage"
            onChange={(e) => setPercentage(parseFloat(e.target.value))}
          ></Input>
          <Input
            placeholder="SR strength level"
            onChange={(e) => setStrengthLevel(parseInt(e.target.value))}
          ></Input>
          <Input
            placeholder="SR candle sequence"
            onChange={(e) => setCandleSeuqence(parseInt(e.target.value))}
          ></Input>
        </div>
      </div>
      <List
        size="small"
        header={<div>//@version=4</div>}
        footer={<div>plot(close)</div>}
        bordered
        dataSource={pineEditorOutput}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

export default TechnicalRequirements;
