import React from 'react';
import {Tabs} from '../tabs';
import {getData} from '../../apiService';
import Table from '../table';
import {container, tableArea, menu} from './style.scss'


const state = {
    tabs: [
      { id: 1, name: 'Small', rows: 50, order: 1},
      { id: 2, name: 'Middle', rows: 350, order: 2},
      { id: 3, name: 'Big', rows: 1000, order: 3},
    ],
    activeTabId: 1 
  };

export class App extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        ...this.getInitialState()
      };
      this.getDataFromApi = this.getDataFromApi.bind(this);
    };

    componentDidMount(){
      this.getDataFromApi(state.tabs[0]);
    }
    
    getInitialState(){
      return {
        loading: false,
        tableData: [],
        fields: ['id', 'firstName', 'lastName', 'email', 'phone'],
        maxTableLength: 50
      }
    }


    
    getDataFromApi(tab) {
        this.setState({loading: true})
        getData(tab.rows).then(data => {
          if(typeof data === 'undefined'){
            data = 'Service unavailable, please try later';
          }
          this.setState({tableData: data, loading: false});
        });
    };


    render() {
        const {loading, tableData, fields, maxTableLength} = this.state;

        return (
            <div className={container}>
              <nav className={menu}>
                <Tabs state={state} onClickGetData={this.getDataFromApi}/>
              </nav>
              <main className={tableArea}>
                <Table data={tableData} loading={loading} fields={fields} maxTableLength={maxTableLength} />
              </main>
            </div>
        );
    }
}