// @flow
import React, { PureComponent } from "react";
import DataTable from "react-data-table-component";

import ModalTrigger from "./ModalTrigger";
import Autocomplete from "./Autocomplete";
import ExampleChart from "./ExampleChart";


import datasets from "../datasets";
import type { Dataset } from "../datasets";

import "./App.css";

type Props = {};

type State = {
  datasetOne: Dataset,
  datasetTwo: Dataset,
};

class App extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      datasetOne: datasets["360"],
      datasetTwo: datasets["361"],
    };

    (this: any).updateOne = this.updateOne.bind(this);
    (this: any).updateTwo = this.updateTwo.bind(this);
  }

  updateOne(dataset: Dataset) {
    this.setState({
      datasetOne: dataset,
    });
  }

  updateTwo(dataset: Dataset) {
    this.setState({
      datasetTwo: dataset,
    });
  }

  render() {
    const { datasetOne, datasetTwo } = this.state;
    const columns =[ 
      {
      name: 'time',
      selector: row => row.time},
      {name: 'value',
      selector: row => row.value}    
    
  ];
  const data2 = [
    {
    id:1,
    time:datasetTwo.time[0],
    value:datasetTwo.data[0]
    },
    {
    id:2,
    time:datasetTwo.time[1],
    value:datasetTwo.data[1]
    },
    {
    id:3,
    time:datasetTwo.time[2],
    value:datasetTwo.data[2]
    },
    {
      id:4,
      time:datasetTwo.time[3],
      value:datasetTwo.data[3]
    },
    {
      id:5,
      time:datasetTwo.time[4],
      value:datasetTwo.data[4]
    },
    {
      id:6,
      time:datasetTwo.time[5],
      value:datasetTwo.data[5]
    },
    {
      id:7,
      time:datasetTwo.time[6],
      value:datasetTwo.data[6]
    },
    {
      id:8,
      time:datasetTwo.time[7],
      value:datasetTwo.data[7]
    },
    {
      id:9,
      time:datasetTwo.time[8],
      value:datasetTwo.data[8]
    },
    {
      id:10,
      time:datasetTwo.time[9],
      value:datasetTwo.data[9]
    }
  ]
    return (
      <div className="App">
        <div>
        <DataTable
          columns = {columns}
          data = {data2}
            />
        </div>
        <div>
          <ModalTrigger id="blue" label={`Blue: ${datasetOne.label}`}>
            <h3>
              Comparing <br />
              {datasetTwo.label}
              <br /> to:
            </h3>
            <Autocomplete name="autocomplete" onUpdate={this.updateOne} />
          </ModalTrigger>
          <ModalTrigger id="red" label={`Red: ${datasetTwo.label}`}>
            <h3>
              Comparing <br />
              {datasetOne.label}
              <br /> to:
            </h3>
            <Autocomplete name="autocomplete" onUpdate={this.updateTwo} />
          </ModalTrigger>
          <ExampleChart data={[datasetOne.data, datasetTwo.data]} />
        </div>
      </div>
    );
  }
}

export default App;
