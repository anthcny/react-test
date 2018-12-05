import React from 'react';
import {container, searchline, searchbutton} from './style.scss';

export class SearchInTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: ''
        };
        this.onInputText = this.onInputText.bind(this);
        this.updateState = this.updateState.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount(){
        this.setState({searchText: ''});
    }

    updateState(){
        this.state = {
            ...this.state,
            ...this.props,
        }
    }

    onInputText(event){
        this.setState({searchText: event.target.value});
    }

    search(){
        if (this.state.searchText === ''){
            return this.props.onFound(this.state.tableData)  
        }
        const data = this.state.tableData || [];
        let result = data.filter((person)=>{
            for (let key in person){
                if (String(person[key]).toLowerCase().includes(this.state.searchText.toLowerCase()))
                    return true;
            }
            return false;
        });
        if (result.length === 0) result = 'not found';
        this.props.onFound(result);
    }

    render(){
        this.updateState();
        return (
            <div className={container}> 
                <input className={searchline} type="text" placeholder="&#61442;" onInput={this.onInputText} defaultValue={this.state.searchText}/>
                <input className={searchbutton} type="submit" value='Search' onClick={this.search}/>
            </div>
        );
    }
}