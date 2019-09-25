/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
// Import fusioncharts.js files from fusioncharts module
import FusionCharts from 'fusioncharts';
// Import the timeseries file from fusioncharts module
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
// Import ReactFusioncharts from react-fusioncharts module
// import ReactFC from 'react-fusioncharts';
import ReactFC from 'react-fusioncharts';
import { Row, Card, CardHeader, CardBody } from 'shards-react';
import FooterStat from './Footer';
import { Config } from '../../../configue';

// Add core FusionCharts module and TimeSeries module as dependecies in react-fusioncharts
ReactFC.fcRoot(FusionCharts, TimeSeries);

// This is the remote url to fetch the data.
// This is the remote url to fetch the schema.
const schemaFetch = [
  {
    name: 'Time',
    type: 'date',
    format: '%Y-%m-%d'
  },
  {
    name: 'progression',
    type: 'number'
  }
];
class ColumnChartTimeAxis extends Component {
  constructor(props) {
    super(props);
    this.state = {

      // Here timeseriesDs is the configuration object which we will pass as a prop to our ReactFC component.
      timeseriesDs: {
        type: 'timeseries',
        renderAt: 'container',
        width: '100%',
        dataSource: {
          chart: {
            showLegend: 0
          },
          caption: {
            text: 'statistique specifique '
          },
          yAxis: [
            {
              plot: {
                value: 'progression',
                type: 'column'
              },
              format: {
                suffix: 'g'
              },
              title: 'progression'
            }
          ],
          // Initially data is set as null
          data: null
        }
      }
    };

    // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
    // parameters, one is data another is schema. Check the method definition to get more info.
    this.createDataTable = this.createDataTable.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  createDataTable(dataFetch) {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });
    });
  }

  updateDataTable(dataFetch) {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });
    });
  }

  statistiquePostMethode = stat => {
    const post = JSON.stringify({
      idCow: JSON.stringify(stat.idCow),
      idDAC: JSON.stringify(stat.idDAC),
      startDate: JSON.stringify(stat.startDate),
      endDate: JSON.stringify(stat.endDate)
    });
    // eslint-disable-next-line no-useless-concat
    const formbody = [`${'post' + '='}${post}`];
    // eslint-disable-next-line no-undef
    const data = fetch(`${Config.url}/Log/stat`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then(responseText => {
        return responseText.json();
      })
      .catch(error => {
        console.error(error);
      });
    return data;
  };

  // We are creating the DataTable immidietly after the component is mounted
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    const v = { idCow: 0, idDAC: 0, startDate: '', endDate: '' };
    this.statistiquePostMethode(v).then(res => {
      this.createDataTable(res.data);
    });
  }

  dataSet = data => {
    console.log('data');
    console.log(data);
    this.updateDataTable(data);
  };

  render() {
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">statisque sur le systeme</h6>
        </CardHeader>
        <br />
        <br />
        <br />
        <CardBody className="pt-0">
          <Row>
            <div className="App">
              <ReactFC {...this.state.timeseriesDs} />
            </div>
          </Row>
        </CardBody>
        <FooterStat dataSet={this.dataSet} />
      </Card>
    );
  }
}

export default ColumnChartTimeAxis;
