import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentDetail from '../TalentFeed/TalentDetail.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import styles from '../../../../css/TalentTheme.module.css';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: true,
            companyDetails: null,
        }

        this.init = this.init.bind(this);
        this.updateFeedData = this.updateFeedData.bind(this);
        this.setLoadingFeedData = this.setLoadingFeedData.bind(this);
        this.handleToggleCardDisplay = this.handleToggleCardDisplay.bind(this);
        this.setPaginationParams = this.setPaginationParams.bind(this);
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        this.init()
    };

    updateFeedData(newValues) {
        this.setState({
            feedData: newValues,
            loadingFeedData: false
        })
    }

    setLoadingFeedData(value) {
        this.setState({
            loadingFeedData: value
        })
    }

    setPaginationParams(value, callback) {
        this.setState({
            loadPosition: value,
        },callback);
    }
    
    handleToggleCardDisplay(id, value) {
        let updatedFeedData = this.state.feedData.map(card => {
            if (card.id === id) {
                return (Object.assign({}, card, { isVideoActive: value }));
            }
            return card;
        });

        this.setState({
            feedData: updatedFeedData
        })
    }
    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <section className="page-body" >
                    <div className={`${styles.talentFeedMain}`}>
                        <div className={`${styles.talentFeedSideDiv}`}>
                            <CompanyProfile />
                        </div>
                        <div className={`${styles.talentFeedCardDiv}`}>
                           <TalentDetail
                                    feedData={this.state.feedData}
                                        newFeedData={this.state.newFeedData}
                                        updateFeedData={this.updateFeedData}
                                        loadingFeedData={this.state.loadingFeedData}
                                        setLoadingFeedData={this.setLoadingFeedData}
                                        loadPosition={this.state.loadPosition}
                                        loadNumber={this.state.loadNumber}
                                        handleToggleCardDisplay={this.handleToggleCardDisplay}
                                        setPaginationParams={this.setPaginationParams}
                            />
                        </div>
                        <div className={`${styles.talentFeedSideDiv}`}>
                            <FollowingSuggestion />
                        </div>
                    </div>
                    </section >
            </BodyWrapper>
        )
    }
}