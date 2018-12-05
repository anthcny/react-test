import React from 'react';
import {tablenav, switchButton, switchInput, pageState} from './style.scss';

export class TableNav extends React.Component{
    
    render(){
        return (
            <nav className={tablenav}>
                <input className={switchButton} type="submit" value='Previous' onClick={this.props.onSwitchPage} />

                <span className={pageState}>Page {this.props.currentPageNum+1} of {this.props.pageCount}</span>
                <span className={pageState}>
                    <span>Find page number</span>
                    <input className={switchInput} type="number" min='1' max={this.props.pageCount} 
                            onInput={this.props.onSwitchPage}
                            placeholder='#'
                            defaultValue={this.props.currentPageNum+1}/>
                </span>

                <input className={switchButton} type="submit" value='Next' onClick={this.props.onSwitchPage} />
            </nav>
        );
    }
}