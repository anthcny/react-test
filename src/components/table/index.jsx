import React from 'react';
import {active, table, searchArea, bySmaller, byBigger} from './style.scss';
import {TableNav} from '../tableNav';
import {SearchInTable} from '../search';
import { InfoBox } from '../infoBox';
import classNames from 'classnames';


export default class Table extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ...this.getInitialState(),
            ...this.props
        }
        this.sortDataBy = this.sortDataBy.bind(this);
        this.switchPage = this.switchPage.bind(this);
        this.onFound = this.onFound.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.getActualData = this.getActualData.bind(this);
        this.sortDataByAsc = this.sortDataByAsc.bind(this);
        this.sortDataByDesc = this.sortDataByDesc.bind(this);
        this.unSortData = this.unSortData.bind(this);
    }

    getInitialState(){
        return {
            data: null,
            activePageNumber: 0,
            fields: [],
            activeFieldIndex: 0,
            pageCount: 0,
            isStateDataActual: false,
            selectedPerson: '',
            sortTypes: [bySmaller, byBigger, ''],
            sortBy: ''
        }
    };

    switchPage(event){
        const pointer = event.target.value;
        if(!isNaN(pointer)){
            if (pointer < 1 || pointer > this.state.pageCount) return;
            this.setState({activePageNumber: pointer-1, isStateDataActual: true});
        }
        else if (pointer === 'Previous'){
            if (this.state.activePageNumber <= 0) return;
            this.setState({activePageNumber: this.state.activePageNumber - 1, isStateDataActual: true})
        }
        else if (pointer === 'Next'){
            if (this.state.activePageNumber >= this.state.pageCount-1) return;
            this.setState({activePageNumber: this.state.activePageNumber + 1, isStateDataActual: true})
        }
        else if (pointer === ''){
            this.setState({activePageNumber: this.state.activePageNumber, isStateDataActual: true})
        }
    }

    sortDataBy(event){
        const field = event.target.innerText;
        const fieldIndex = this.state.fields.indexOf(field);
        const sortType = this.toggleSort(fieldIndex);

        let data;
        if(sortType === ''){
            data = this.unSortData();
        }
        else if(sortType === bySmaller){
            data = this.sortDataByAsc(field);
        }
        else{
            data= this.sortDataByDesc(field);
        }
        

        this.setState({
            data: data,
            activeFieldIndex: fieldIndex,
            isStateDataActual: true
        });
    }

    sortDataByAsc(field){
        let sortFunc;
        const data = this.state.data;
        if(typeof data[0][field] === 'number'){
            sortFunc = (a,b) => a[field] - b[field];
        }
        else{
            sortFunc = (a,b) => {
                if(a[field] === b[field]) 
                    return 0;

                return a[field] < b[field] ? -1 : 1;
            }
        }
        return data.sort(sortFunc);
    }

    sortDataByDesc(field){
        return this.sortDataByAsc(field).reverse();
    }

    unSortData(){
        const data = this.state.data;
        return data.sort((a ,b) => a.uid - b.uid);
    }

    toggleSort(fieldIndex){
        if(fieldIndex !== this.state.activeFieldIndex){
            this.state.sortBy = this.state.sortTypes[0];
        } 
        else {
            let curIndex = this.state.sortTypes.indexOf(this.state.sortBy);
            curIndex = curIndex === 2 ? 0 : ++curIndex;
            this.state.sortBy = this.state.sortTypes[curIndex];
        }
        return this.state.sortBy;
    }

    onFound(data){
        this.setState({data: data, isStateDataActual: true});
    }

    showInfo(event){
        let selectedPersonUid = event.currentTarget.dataset.uid;
        let person = null;
        let data = this.state.data;
        for(let i=0; i<data.length; i++){
            if(data[i].uid === +selectedPersonUid){
                person = data[i];
                break;
            }
        }
        person = this.toString(person, 0);
        this.setState({selectedPerson: person, isStateDataActual: true});
    }

    toString(obj, dir){
        let tab = '';
        for(let i=0; i<dir; i++){
            tab+='\t'
        }
        if(!obj) return;
        return Object.entries(obj).map(([key, value]) => {
            if(typeof value === 'object'){
                value = '\n \t' + this.toString(value, ++dir);
            }
            if(key === 'uid') return '';
            return `${key}: ${value}`
        })
        .join('\n'+tab);
    }

    generateUid(data){
        let i = 0;
        console.log(data);
        if(typeof data === 'string'){
            console.log('sdfasg');
            return data;
        }
        return data = data.map(el => {
            el.uid = i++;
            return el;
        });
    }
    
    getActualData(){
        let data;
        if(this.state.isStateDataActual){
            data = this.state.data;
            this.state.isStateDataActual = false;
        }
        else{
            data = this.props.data;
            data = this.generateUid(data);
            this.state.data = data;
            this.state.activePageNumber = 0;
            this.state.selectedPerson = '';
        }
        this.state.pageCount = Math.ceil(data.length / this.props.maxTableLength);

        if(this.props.loading){
            return data = 'loading data...'
        }

        if(data.length === 0){ 
            return data = 'Select size of data';
        }

        if(this.state.pageCount > 1){
            let currentIndex = this.state.activePageNumber * this.props.maxTableLength;
            data = data.slice(currentIndex, currentIndex + this.props.maxTableLength + 1)
        }

        return data;
    }

    render(){
        const {fields} = this.props;
        const data = this.getActualData(); 
        const {activePageNumber, activeFieldIndex, pageCount, selectedPerson, sortBy} = this.state;

        if(typeof data === 'string'){
            return (
                <div className={searchArea}>
                    <SearchInTable tableData={this.props.data} onFound={this.onFound}/>
                    <p></p>
                    <p>{data}</p>
                </div>
            );
        }
        
        return (
            <div>
                <SearchInTable tableData={this.props.data} onFound={this.onFound}/>
                <div className={table}>
                    <table>
                        <thead>
                        <tr>
                        {
                            fields.map(field => {
                                return <th className={(fields[activeFieldIndex]===field && sortBy !== '') ? active : ''}
                                        onClick={this.sortDataBy}>
                                            {field}
                                        <i className={fields[activeFieldIndex]===field ? sortBy : ''}></i>
                                        </th>
                            })
                        }
                        </tr>
                        </thead>
                        
                        <tbody>
                        {
                                data.map(person => {
                                    return <tr onClick={this.showInfo} data-uid={person.uid}>  
                                        {
                                            fields.map(field => 
                                                <td>{person[field]}</td>
                                                )
                                        }
                                    </tr>
                                })
                        }
                        </tbody>
                        
                    </table>
                </div>
                {
                    (() => {
                        if(pageCount > 1)
                        return <TableNav onSwitchPage={this.switchPage} pageCount={pageCount} currentPageNum={activePageNumber}/>
                    })()
                }
                <InfoBox person={selectedPerson}/>
            </div>
        );
    }
}