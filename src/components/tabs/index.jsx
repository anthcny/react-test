import React from 'react';
import {Tab} from '../tab';
import {tabs as tabstyle} from './style.scss';

/**
 * config:
 * {
 *  tabs: [
 *      { id: '1', name: 'tab 1', rows: 50, order: 1},
 *      { id: '2', name: 'tab 2', rows: 1000, order: 2},
 *  ],
 *  active: 2 //id табы активной
 * }
 */

export class Tabs extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            ...this.getInitialState(),
            ...this.props.state
        }
        this.changeActive = this.changeActive.bind(this);      
    }

    getInitialState() {
        return {
            tabs: {},
            activeTabId: null,
        };
    }

    changeActive(tab){
        this.props.onClickGetData(tab);
        this.setState({
            ...this.state,
            activeTabId: tab.id
        })
    }


    render() {
        const { tabs, activeTabId } = this.state;
        return (
            <div className={tabstyle}>
            {
                tabs.map(tab => 
                    <Tab key={tab.id} 
                        tab={tab} 
                        active={tab.id === activeTabId}
                        onTabClick={this.changeActive} />
                )
            }
            </div>
        );
    }
}