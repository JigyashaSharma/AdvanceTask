import React, { createRef } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Card, Popup, Icon } from 'semantic-ui-react'
import styles from '../../../../css/TalentTheme.module.css';
import TalentCardDetail from './TalentCardDetail.jsx';
import Loading from '../Layout/Loading.jsx';

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {

        if (this.props.loadingFeedData) {
            <Loading />
        }else if (!this.props.feedData || !Array.isArray(this.props.feedData)) {
            return (
                <div className={`${styles.uiCenterAligned}`}>Problem fetching Talent Info. Try again!!</div>
            );
        } else if (this.props.feedData.length === 0 && !this.props.loadingFeedData) {
            return (
                <div className={`${styles.uiCenterAligned}` }>
                    <strong>There are no talents found for your recruitment company.</strong>
                </div>
            );
        }

        return (
            <Card.Group >
                {
                    this.props.feedData.map((card, index) => (
                        <TalentCardDetail
                            cardDetails={card}
                            handleToggleCardDisplay={this.props.handleToggleCardDisplay}
                            index={index}
                        />
                    ))}
            </Card.Group>
        );
    }
}

