import React from 'react';
import {infobox, title} from './style.scss';


export class InfoBox extends React.Component {
   
    render() {
        return (
            <div>
                <div className={title}>Info about selected person</div>
                <textarea readOnly='readonly' className={infobox} value={this.props.person}></textarea>
            </div>
        );
    }
}