import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx'
import TalentCardDetail from '../TalentFeed/TalentCardDetail.jsx';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import styles from '../../../../css/TalentTheme.module.css';
import TalentCard from './TalentCard.jsx';
export default class TalentDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newFeed: [],
        }
        this.lastScrollTop = 0;
        this.removingCardId = '';
        this.newCardId = '';
        this.containerRef = createRef();
        this.loadInitialData = this.loadInitialData.bind(this);
        this.loadMoreData = this.loadMoreData.bind(this);
        this.handleScroll = _.debounce(this.handleScroll.bind(this), 200);
        this.scrollDownUpdateFeedData = this.scrollDownUpdateFeedData.bind(this);
    }

    componentDidMount() {
        this.loadInitialData()
        const container = this.containerRef.current;
        if (container) {
            container.addEventListener('scroll', this.handleScroll);
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Save the scroll position before the update
        return this.containerRef.current.scrollTop;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Restore the scroll position after the update
        if (snapshot !== null) {
            this.containerRef.current.scrollTop = snapshot;
        }
    }

    componentWillUnmount() {
        const container = this.containerRef.current;
        if (container) {
            container.removeEventListener('scroll', this.handleScroll);
        }
    }

    loadInitialData() {
        this.props.setLoadingFeedData(true);
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: `${profileApi}/profile/profile/getTalent?position=${this.props.loadPosition}&number=${this.props.loadNumber}`,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: 'GET',
            contentType: "application/json",
            datatype: 'json',
            success: function (res) {
                let tempFeed = [];
                if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                    tempFeed = res.data;
                    tempFeed = tempFeed.map(user =>
                        Object.assign({}, user, { isVideoActive: true })
                    );

                    this.props.updateFeedData(tempFeed);
                }
                else {
                    TalentUtil.notification.show("No Users to display.", "info", null, null);
                    this.props.setLoadingFeedData(false);
                }
            }.bind(this),
            error: function (error) {
                TalentUtil.notification.show("Server Error, No Users to display.", "error", null, null);
                this.props.setLoadingFeedData(false);
            }.bind(this)
        });
    }

    loadMoreData() {
        this.props.setLoadingFeedData(true);
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: `${profileApi}/profile/profile/getTalent?position=${this.props.loadPosition}&number=${this.props.loadNumber}`,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: 'GET',
            contentType: "application/json",
            datatype: 'json',

            success: function (res) {
                let newFeedData = [];

                if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                    newFeedData = res.data;
                    newFeedData = newFeedData.map(user =>
                        Object.assign({}, user, { isVideoActive: true })
                    );

                    this.scrollDownUpdateFeedData(newFeedData);

                    // Restore scroll position after feed update
                    setTimeout(() => {
                        if (this.containerRef) this.containerRef.current.scrollTop = this.lastScrollTop;
                    }, 0);
                } else {
                    TalentUtil.notification.show("No more Users to display.", "info", null, null);
                    this.props.setLoadingFeedData(false);
                }
            }.bind(this),
            error: function (error) {
                TalentUtil.notification.show("Error occured while fetching User details.", "error", null, null);
                this.props.setLoadingFeedData(false);
            }.bind(this)
        })

    }

    scrollDownUpdateFeedData(newFeed) {
        let tempFeedData = this.props.feedData;
        const newCard = newFeed.shift(); //remove the first card from newFeed
        tempFeedData.push(newCard);
        this.setState({
            newFeed: newFeed
        });
        this.removingCardId = tempFeedData[0].id;
        this.newCardId = tempFeedData.at(-1).id;
        this.props.updateFeedData(tempFeedData);
    }
    handleScroll(event) {
        const { scrollTop, scrollHeight, clientHeight } = this.containerRef.current;
        let skip = this.props.loadPosition;
        let limit = this.props.loadNumber;
        let newFeed = this.state.newFeed || [];

        if (this.lastScrollTop < scrollTop) {
            if (newFeed.length > 0) {
            //we have fetched the newFeed iterate over it and replace it in actual feedData to display
            //Since we are scrolling down remove the first/oldest element
            //add the new element in the last.
                this.scrollDownUpdateFeedData(newFeed);
            } else if (scrollTop + clientHeight >= scrollHeight - 5) {
                //newFeed will change now so reset if any older values were there
                newFeed = [];
                this.setState({
                    newFeed: [],
                });
                this.props.setPaginationParams((skip + limit), () => { this.loadMoreData() });
            }
        }
        this.lastScrollTop = scrollTop;
    };
    
    render() {
        return (
            <div ref={this.containerRef} onScroll={this.handleScroll} className={`${styles.scroll}`}>
                <TalentCard
                    feedData={this.props.feedData}
                    loadingFeedData={this.props.loadingFeedData}
                    handleToggleCardDisplay={this.props.handleToggleCardDisplay}
                    removingCardId={this.state.removingCardId || ''}
                    newCardId={this.state.newCardId || ''}
                />
            </div>
        )
    }
}