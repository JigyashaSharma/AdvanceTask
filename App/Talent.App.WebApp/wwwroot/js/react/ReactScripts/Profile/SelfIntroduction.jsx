/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';


const summaryCharacterLimit = 150;
const descriptionCharacterMinlimit = 150;
const descriptionCharacterMaxlimit = 600;
export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: this.props.summary || '',
            description: this.props.description || '',
            summaryCharacters: this.props.summary ? this.props.summary.length : 0,
            descriptionCharacters: this.props.description ? this.props.description.length : 0
        };
        this.validateInput = this.validateInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.descriptionMessage = this.descriptionMessage.bind(this);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.summary !== this.props.summary) {
            this.setState({
                summary: this.props.summary,
                summaryCharacters: this.props.summary ? this.props.summary.length : 0,
            });
        }
        if (prevProps.description !== this.props.description) {
            this.setState({
                description: this.props.description,
                descriptionCharacters: this.props.description ? this.props.description.length : 0
            });
        }
    }
    handleChange(event) {
        switch (event.target.name) {
            case "summary":
                if (event.target.value.length >= summaryCharacterLimit) {
                    this.setState({
                        summaryCharacters: event.target.value.length
                    })
                } else {
                    this.setState({
                        summary: event.target.value,
                        summaryCharacters: event.target.value.length
                    })
                }
                break;
            case "description":
                if (event.target.value.length >= descriptionCharacterMaxlimit) {
                    this.setState({
                        descriptionCharacters: event.target.value.length
                    })
                } else {
                    this.setState({
                        description: event.target.value,
                        descriptionCharacters: event.target.value.length
                    })
                }
                break;
        }
    }
    validateInput() {
        if (this.state.summaryCharacters === 0 || this.state.descriptionCharacters === 0) {
            TalentUtil.notification.show("Please provide summary and description before save!!", "error", null, null);
            return false;
        } else if(this.state.descriptionCharacters < descriptionCharacterMinlimit) {
            TalentUtil.notification.show("Description characters less than 150!!! Provide it between 150-600.", "error", null, null);
            return false;
        }
        return true;
    }
    handleSave() {
        if (!this.validateInput()) {
            return;
        }
        const data = {
            summary: this.state.summary,
            description: this.state.description
        }
        this.props.updateProfileData(data);
    }

    descriptionMessage() {
        if (!this.state.descriptionCharacters || (this.state.descriptionCharacters < 600)) {
            return (<p>Description must be between 150-600 characters.</p>);
        }
        else if (this.state.descriptionCharacters >= 600) {
            return (<p className="ui red header">Limit of 600 characters reached!!!</p>)
        }
        
    }
    render() {
        return (
            <React.Fragment>
                <div className="sixteen wide column">
                    <div className="field" >
                        <input
                            type="text"
                            maxLength={summaryCharacterLimit}
                            name="summary"
                            placeholder="Please provide a short summary about yourself"
                            value={this.state.summary || ''}
                            onChange={this.handleChange} >
                        </input>
                    </div>
                    {this.state.summaryCharacters < summaryCharacterLimit
                        ? <p>Summary must be no more than 150 characters.</p>
                        : <p className="ui red header">Limit of 150 characters reached!!!</p>}
                </div>
                <div className="sixteen wide column">
                    <div className="field" >
                        <textarea
                            maxLength={descriptionCharacterMaxlimit}
                            name="description"
                            placeholder="Please tell us about any hobbies, additional expertise, or anything else you'd like to add."
                            value={this.state.description || ''}
                            onChange={this.handleChange} >
                        </textarea>
                    </div>
                    {this.descriptionMessage() }
                </div>
                <div className="sixteen wide column">
                    <button type="button" className="ui black button right floated" onClick={this.handleSave}>Save</button>
                </div>
            </React.Fragment>
        )
    }
}



