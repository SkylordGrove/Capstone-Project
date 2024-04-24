import React, { PureComponent } from "react";
import ExampleChart from "./ExampleChart";
import FetchArduinoButton from "./FetchArduinoButton";

import datasets from "../datasets";
import type { Dataset } from "../datasets";

type Props = {};

class ModalDatasetState extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  
    this.state = {
      modalDataset: datasets["360"],
    };
    (this: any).updateModalDataset = this.updateModalDataset.bind(this);
  }
  
  updateModalDataset = (dataset: Dataset) => {
    this.setState({
      modalDataset: dataset
    });
  }

  updateDatasets = () => {
    this.props.updateModalDataset(this.state.modalDataset);
  }

  render() {
    const { modalDataset } = this.state;
    return(
      <h3>
        <FetchArduinoButton updateModalDataset={this.updateModalDataset} updateDatasets={this.updateDatasets}/>
        <ExampleChart data={[modalDataset.data]} />
      </h3>
    );
  }
}

export default ModalDatasetState;