import React from 'react';
import { Card } from "semantic-ui-react";
import { Loader } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import styles from '../../../../css/TalentTheme.module.css';
import { FaEnvelope, FaImage, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import 'semantic-ui-css/semantic.min.css';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employerInfo: {
                name: '',
                location: '',
                phone: '',
                email: '',
                displayText: ''
            },
            backendError: false,
        }
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: `${profileApi}/profile/profile/getEmployerProfile`,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employerData = {};
                if (res.employer && res.employer.companyContact && typeof res.employer.companyContact === 'object') {
                    let tempContact = res.employer.companyContact;
                    employerData.name = tempContact.name ? tempContact.name : '';
                    employerData.location = tempContact.location && tempContact.location.city && tempContact.location.country ? `${tempContact.location.city}, ${tempContact.location.country}` : '';
                    employerData.displayText = "We currently do not have specific skills that we desire";
                    employerData.phone = tempContact.phone;
                    employerData.email = tempContact.email;

                    this.setState({
                        employerInfo: employerData,
                        backendError: false
                    })
                } else {
                    TalentUtil.notification.show("Server issue fetching information. No Employer info found,", "info", null, null);
                    this.setState({
                        backendError: true
                    })
                }
            }.bind(this),
            error: function (res) {
                TalentUtil.notification.show("Server error fetching information", "error", null, null);
                console.log(res.status)
                this.setState({
                    backendError: true
                })
            }.bind(this)
        })
    }

    render() {
        if (this.state.backendError) {
            return (
                <div className={`ui card ${styles.card}`} >
                    <div className={`content ${styles.content}`}>
                        Server Error fetching Company Details.Please try after some time.
                    </div>
                </div>
            );
        }
        return (
            <div className={`ui card ${styles.card}`} >
                <div className={`content ${styles.content}`}>
                    <div class="center aligned header">
                        <i className={`${styles.companyProfileCircle}`}>
                            <FaImage size={30} className={`${styles.imageIcon}`} />
                        </i>
                    </div>
                    <div className="center aligned description">
                        <strong >
                        {this.state.employerInfo.name || ''}
                        </strong>
                        <div>
                            <FaMapMarkerAlt size={5} className="text-grey" />
                            {this.state.employerInfo.location || ''}
                        </div>
                        <div>
                        {this.state.employerInfo.displayText || ''}
                        </div>
                    </div>
                </div>
                
                <div className="extra content">
                    <div>
                        <FaPhoneAlt size={5} className="text-grey" />
                        {` :${this.state.employerInfo.phone}`}
                    </div>
                    <div>
                        <FaEnvelope size={5} className="text-grey" />
                        {` :${this.state.employerInfo.email}`}
                    </div>
                </div>
            </div>
        );
    }
}