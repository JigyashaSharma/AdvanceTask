/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { Button, Popup, Segment, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import styles from '../../../../css/TalentTheme.module.css';


const socialMediaAccountTypes = ["LinkedIn", "GitHub"];

export default class SocialMediaLinkedAccount extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showEditSection: false,
            newlinkedAccounts: this.props.linkedAccounts
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.saveLinkedAccounts = this.saveLinkedAccounts.bind(this);
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    // Sync state with props when the component is updated
    componentDidUpdate(prevProps) {
        // Check if the linkedAccounts prop has changed
        if (prevProps.linkedAccounts !== this.props.linkedAccounts) {
            // Update the state with the new linkedAccounts prop
            this.setState({ newlinkedAccounts: this.props.linkedAccounts });
        }
    }

    handleEdit() {
        const details = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newlinkedAccounts: details
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newlinkedAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            newlinkedAccounts: data
        })
    }

    saveLinkedAccounts() {
        //do not want linkedIn and Github URl to be necessary
        if (!this.props.validateFunc(this.state.newlinkedAccounts, [])) {
            return;
        }
        let data = Object.assign({}, this.state.newlinkedAccounts)
        this.props.saveProfileData(this.props.componentId, data);
        this.closeEdit()
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    handleClick(e) {
        const accountname = e.currentTarget.getAttribute("data-name");

        switch (accountname) {
            case socialMediaAccountTypes[0]:
                
                if (this.state.newlinkedAccounts.linkedIn) {
                    break;
                }
                // Prevent default link behavior (if link is null or invalid)
                e.preventDefault();

                // Display error message
                TalentUtil.notification.show("Link not yet set, Please set the Linked url.", "error", null, null);
                break;
            case socialMediaAccountTypes[1]:
                if (this.state.newlinkedAccounts.github) {
                    break;
                }
                // Prevent default link behavior (if link is null or invalid)
                e.preventDefault();

                // Display error message
                TalentUtil.notification.show("Link not yet set, Please set the GitHub url.", "error", null, null);
                break;
            default: break;
        }
    };

    renderEdit() {
        return (
        <div className="row">
            <div className="ui sixteen wide column">
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newlinkedAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid Linked Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newlinkedAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a valid GitHub Url"
                />
                    <button type="button" className="ui black button" onClick={this.saveLinkedAccounts}>Save</button>
                    <button type="button" className="ui grey button" onClick={this.closeEdit}>Cancel</button>
            </div>
            </div>
        )
    }

    renderDisplay() {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <Button as="a"
                        href={this.props.linkedAccounts.linkedIn}
                        target="_blank"
                        primary icon labelPosition="left"
                        onClick={this.handleClick}
                        data-name={socialMediaAccountTypes[0]}
                    >
                    <div className="ui grid">
                        <div className="row">
                            <div className="column">
                                <FaLinkedin size={15} />
                            </div>
                            <div className="column">
                                LinkedIn
                            </div>
                        </div>
                    </div>
                    </Button>
                    <Button as="a"
                        href={this.props.linkedAccounts.github}
                        target="_blank" labelPosition="left"
                        className="ui black icon"
                        onClick={this.handleClick}
                        data-name={socialMediaAccountTypes[1]}
                    >
                    <div className="ui grid">
                        <div className="row">
                            <div className="column">
                                <FaGithub size={15} />
                            </div>
                            <div className="column">
                                GitHub
                            </div>
                        </div>
                    </div>
                    </Button>
                    <Button
                        className="ui black right floated "
                        onClick={this.handleEdit}
                    >
                    Edit
                    </Button>
                </div>
            </div>
        )
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
}