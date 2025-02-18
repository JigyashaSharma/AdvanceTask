import React from 'react'
import { Form, Checkbox, Label, Input } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';
import styles from '../../../../css/TalentTheme.module.css';

const JobSeekingStatus = [
    "Actively looking for a job",
    "Not Looking for a job at the moment",
    "Currently employed but open to offers",
    "Will be available on later date"
];
export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            showSaveButton: false
        }
    }

    handleChange(event) {
        let data = Object.assign({}, this.props.talentStatus);
        data.status = event.target.value;
        if (data.status !== this.props.status) {
            this.props.updateProfileData(this.props.componentId, data);
        }
    }

    render() {

        const jobSeekingStatus = this.props.talentStatus ? this.props.talentStatus.status : null;
        return (
            <div className="ui row">
                <div className="ui sixteen wide column">
                    <h3>Current Status</h3>
                    {JobSeekingStatus &&  JobSeekingStatus.map(status => {
                        return (
                            <div>
                                <Label className={styles.radioLabel}>
                                <Input
                                    type="radio"
                                    name="status"
                                    value={status}
                                    checked={status === jobSeekingStatus}
                                    onChange={this.handleChange}
                                    className={styles.radioInput}
                                />
                                {status}
                                </Label>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}