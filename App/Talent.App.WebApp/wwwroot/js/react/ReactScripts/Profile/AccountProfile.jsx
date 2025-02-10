import React from 'react';
import Cookies from 'js-cookie';
import SocialMediaLinkedAccount from './SocialMediaLinkedAccount.jsx';
import { IndividualDetailSection } from './ContactDetail.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { Address, Nationality } from './Location.jsx';
import Language from './Language.jsx';
import Skill from './Skill.jsx';
import Education from './Education.jsx';
import Certificate from './Certificate.jsx';
import VisaStatus from './VisaStatus.jsx';
import PhotoUpload from './PhotoUpload.jsx';
import VideoUpload from './VideoUpload.jsx';
import CVUpload from './CVUpload.jsx';
import SelfIntroduction from './SelfIntroduction.jsx';
import Experience from './Experience.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { LoggedInNavigation } from '../Layout/LoggedInNavigation.jsx';
import TalentStatus from './TalentStatus.jsx';
import { fieldValidationRules } from './ValidationRules.jsx';

export default class AccountProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profileData: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: {},
                nationality: '',
                education: [],
                languages: [],
                skills: [],
                experience: [],
                certifications: [],
                visaStatus: '',
                visaExpiryDate: '',
                ProfilePhotoUrl: '',
                linkedAccounts: {
                    linkedIn: "",
                    github: ""
                },
                jobSeekingStatus: {
                    status: "",
                    availableDate: null
                }
            },
            loaderData: loaderData,
            errorCount: 0
        }

        this.updateWithoutSave = this.updateWithoutSave.bind(this)
        this.updateAndSaveData = this.updateAndSaveData.bind(this)
        this.updateForComponentId = this.updateForComponentId.bind(this)
        this.saveProfile = this.saveProfile.bind(this)
        this.loadData = this.loadData.bind(this)
        this.init = this.init.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.deleteComponentValues = this.deleteComponentValues.bind(this);
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
    };

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: `${profileApi}/profile/profile/getTalentProfile`,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                this.updateWithoutSave(res.data)
            }.bind(this)
        })
        this.init()
    }
    //updates component's state without saving data
    updateWithoutSave(newValues) {
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        this.setState({
            profileData: newProfile
        })
    }

    //updates component's state and saves data
    updateAndSaveData(newValues) {
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        this.setState({
            profileData: newProfile
        }, this.saveProfile)
    }

    updateForComponentId(componentId, newValues) {
        let data = {};
        data[componentId] = newValues;
        this.updateAndSaveData(data)
    }

    /*Function will send delete request to profile server */
    sendDeleteRequest(link, data, componentId) {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(data),
            success: function (res) {
                if (res.success == true) {
                    //reload the components
                    this.loadData();
                    //resetting the error count in case we succeed after some errors
                    if (this.state.errorCount > 0) {
                        this.setState({
                            errorCount: 0
                        })
                    }
                    TalentUtil.notification.show(`${componentId} deleted successfully`, "success", null, null);
                } else {
                    TalentUtil.notification.show(`${componentId} did not delete successfully`, "error", null, null);
                }

            }.bind(this),
            error: function (res, a, b)  {
                //trying to re-fetch data in case of error to make UI and backend consistent
                const count = this.state.errorCount;
                if (count < 5) {
                    this.loadData();
                    this.setState({
                        errorCount: count + 1
                    })
                }
            }.bind(this)
        })
    }

    /*Function to get the link and other details needed by sendDeleteRequest based on componentID*/
    deleteComponentValues(componentId, data) {
        switch (componentId) {
            case "languages":
                let link = `${profileApi}/profile/profile/deleteLanguage`;
                this.sendDeleteRequest(link, data, componentId);
                break;
            case "skills":
                link = `${profileApi}/profile/profile/deleteSkill`;
                this.sendDeleteRequest(link, data, componentId);
                break;
            case "experience":
                link = `${profileApi}/profile/profile/deleteExperience`;
                this.sendDeleteRequest(link, data, componentId);
                break;
            case "education":
                link = `${profileApi}/profile/profile/deleteEducation` ;
                this.sendDeleteRequest(link, data, componentId);
                break;
            case "certifications":
                link = `${profileApi}/profile/profile/deleteCertification`;
                this.sendDeleteRequest(link, data, componentId);
                break;
            default:
                break;
        }

    }

    /*Currently added some minimal validation for input format*/
    validateInput(fields) {
        let valuesValid = true;

        for (let fieldName of Object.keys(fields)) {
            const fieldRule = fieldValidationRules.find(rule => rule.field === fieldName);

            //check if fields are not null
            
            if (!fields[fieldName] && fieldName !== 'id') {
                const errorMsg = fieldRule ? fieldRule.errorMessage : `Provide valid value for ${fieldName}`;
                TalentUtil.notification.show(errorMsg, "error", null, null);
                return false;
            } 
            //Minimal check for the validity of the field
            if (fieldRule) {
                const valid = fieldRule.regex.test(fields[fieldName]);
                if (!valid) {
                    TalentUtil.notification.show(fieldRule.errorMessage, "error", null, null);
                    valuesValid = valid;
                    break;
                }
            }
        }

        return valuesValid;
    }
    saveProfile() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: `${profileApi}/profile/profile/updateTalentProfile`,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.profileData),
            success: function (res) {
                this.loadData();
                //resetting the error count in case we succeed after some errors
                if (this.state.errorCount > 0) {
                    this.setState({
                        errorCount: 0
                    })
                }
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                //trying to re-fetch data in case of error to make UI and backend consistent
                const count = this.state.errorCount;
                if (count < 5) {
                    this.loadData();
                    this.setState({
                        errorCount: count + 1
                    })
                }
            }.bind(this)
        })
    }

    render() {
        const profile = {
            firstName: this.state.profileData.firstName,
            lastName: this.state.profileData.lastName,
            email: this.state.profileData.email,
            phone: this.state.profileData.phone
        }
        return (
            <BodyWrapper reload={this.loadData} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui container">
                            <div className="profile">
                                <form className="ui form">
                                    <div className="ui grid">
                                        <FormItemWrapper
                                            title='Linked Accounts'
                                            tooltip='Linking to online social networks adds credibility to your profile'
                                        >
                                            <SocialMediaLinkedAccount
                                                linkedAccounts={this.state.profileData.linkedAccounts}
                                                componentId="linkedAccounts"
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateForComponentId}
                                                validateFunc={this.validateInput }
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Description'
                                            tooltip='Provide self introduction.'
                                        >
                                            <SelfIntroduction
                                                summary={this.state.profileData.summary}
                                                description={this.state.profileData.description}
                                                updateProfileData={this.updateAndSaveData}
                                                updateWithoutSave={this.updateWithoutSave}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='User Details'
                                            tooltip='Enter your contact details'
                                        >
                                            <IndividualDetailSection
                                                controlFunc={this.updateAndSaveData}
                                                details={profile}
                                                validateFunc={this.validateInput}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Address'
                                            tooltip='Enter your current address'>
                                            <Address
                                                addressData={this.state.profileData.address}
                                                componentId="address"
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateForComponentId}
                                                validateFunc={this.validateInput}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Nationality'
                                            tooltip='Select your nationality'
                                        >
                                            <Nationality
                                                nationalityData={this.state.profileData.nationality}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Languages'
                                            tooltip='Select languages that you speak'
                                        >
                                            <Language
                                                languageData={this.state.profileData.languages}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Skills'
                                            tooltip='List your skills'
                                        >
                                            <Skill
                                                skillData={this.state.profileData.skills}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Work experience'
                                            tooltip='Add your work experience'
                                        >
                                            <Experience
                                                experienceData={this.state.profileData.experience}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Education'
                                            tooltip='Add your educational background'
                                        >
                                            <Education
                                                educationData={this.state.profileData.education}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Certification'
                                            tooltip='List your certificates, honors and awards'
                                        >
                                            <Certificate
                                                certificateData={this.state.profileData.certifications}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Visa Status'
                                            tooltip='What is your current Visa/Citizenship status?'
                                        >
                                            <VisaStatus
                                                visaStatus={this.state.profileData.visaStatus}
                                                visaExpiryDate={this.state.profileData.visaExpiryDate}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Status'
                                            tooltip='What is your current status in jobseeking?'
                                        >
                                            <TalentStatus
                                                status={this.state.profileData.jobSeekingStatus}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Profile Photo'
                                            tooltip='Please upload your profile photo'
                                            hideSegment={true}
                                        >
                                            <PhotoUpload
                                                imageId={this.state.profileData.profilePhotoUrl}
                                                updateProfileData={this.updateWithoutSave}
                                                savePhotoUrl='http://localhost:60290/profile/profile/updateProfilePhoto'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Profile Video'
                                            tooltip='Upload a brief self-introduction video'
                                            hideSegment={true}
                                        >
                                            <VideoUpload
                                                videoName={this.state.profileData.videoName}
                                                updateProfileData={this.updateWithoutSave}
                                                saveVideoUrl={'http://localhost:60290/profile/profile/updateTalentVideo'}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='CV'
                                            tooltip='Upload your CV. Accepted files are pdf, doc & docx)'
                                            hideSegment={true}
                                        >
                                            <CVUpload
                                                cvName={this.state.profileData.cvName}
                                                cvUrl={this.state.profileData.cvUrl}
                                                updateProfileData={this.updateWithoutSave}
                                                saveCVUrl={'http://localhost:60290/profile/profile/updateTalentCV'}
                                            />
                                        </FormItemWrapper>
                                        <SelfIntroduction
                                            summary={this.state.profileData.summary}
                                            description={this.state.profileData.description}
                                            updateProfileData={this.updateAndSaveData}
                                            updateWithoutSave={this.updateWithoutSave}
                                        />
                                    </div>
                                </form>
                            </div >
                        </div>
                    </div>
                </section>
            </BodyWrapper>
        )
    }
}
