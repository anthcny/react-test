import React from 'react';
import classNames from 'classnames';
import { tab, active } from './style.scss';

export class Tab extends React.Component {
    constructor(...props) {
        super(...props);
        this.onTabClick = () => {
            this.props.onTabClick(this.props.tab);
        }
    }
    render() {
        return (
            <div onClick={this.onTabClick} 
                 className={this.props.active ? classNames(tab, active) : tab}>
                {this.props.tab.name}
            </div>
        );
    }
}