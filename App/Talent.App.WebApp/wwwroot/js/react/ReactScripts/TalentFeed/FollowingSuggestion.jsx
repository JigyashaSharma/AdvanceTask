import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import styles from '../../../../css/TalentTheme.module.css';
export default class FollowingSuggestion extends React.Component {
    render() {
        return ( 
            <div className={`ui card ${styles.card}`}>
                <div className={`content ${styles.content}`}>
                    <div className="center aligned header">Follow Talent</div>
                        <div className="center aligned description">
                            <div className="ui items following-suggestion">
                                <div className="item">
                                    <div className="ui image">
                                        <img className="ui circular image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
                                    </div>
                                    <div>
                                        <a className="">Veronika Ossi</a><br />
                                    <button className={`ui primary basic button ${styles.leftMargin}`}><i className="icon user"></i>Follow</button>
                                    </div>
                                </div>
                        
                                <div className="item">
                                    <div className="ui image">
                                        <img className="ui circular image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
                                    </div>
                                    <div>
                                        <a className="">Veronika Ossi</a><br />
                                    <button className={`ui primary basic button ${styles.leftMargin}`}><i className="icon user"></i>Follow</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}