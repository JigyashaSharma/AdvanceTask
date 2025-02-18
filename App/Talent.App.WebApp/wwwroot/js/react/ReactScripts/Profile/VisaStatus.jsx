import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import styles from '../../../../css/TalentTheme.module.css';

const VisaType = ["Citizen", "Permanent Resident", "Work Visa", "Student Visa"];
export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visa: {
                visaStatus: this.props.visaStatus || '',
                visaExpiryDate: this.props.visaExpiryDate || ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.renderVisaExpiryDate = this.renderVisaExpiryDate.bind(this);
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.visaStatus !== this.props.visaStatus) || (prevProps.visaExpiryDate !== this.props.visaExpiryDate)) {
            this.setState({
                visa: {
                    visaStatus: this.props.visaStatus,
                    visaExpiryDate: this.props.visaExpiryDate,
                }
            });
        }
    }

    handleDateChange(date) {

        let data = Object.assign({}, this.state.visa);
        data.visaExpiryDate = date;

        this.setState({
            visa: data
        })
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        let data = Object.assign({}, this.state.visa);
        data[name] = value;

        switch (value) {
            case VisaType[0]:
            case VisaType[1]:
                data.visaExpiryDate = '';
                this.setState({
                    visa: data
                });
                this.props.saveProfileData(data); //no expiry date save the visa status in DB
                break;
            case VisaType[2]:
            case VisaType[3]:
                this.setState({
                    visa: data
                });
                break;
            default:
        }
    }

    handleSave() {
        const data = this.state.visa;
        const visaExpiryDateLocal = new Date(data.visaExpiryDate);
        //validating date, visa type is already validated in handleChange
        if (visaExpiryDateLocal instanceof Date && !isNaN(visaExpiryDateLocal)) {
            this.props.saveProfileData(data);
            return;
        }
        TalentUtil.notification.show("Visa Expiry date not valid", "error", null, null);
    }

    renderVisaExpiryDate() {
        const selectedVisaType = this.state.visa.visaStatus;
        let visaExpiryDate = this.state.visa.visaExpiryDate;

        if ((selectedVisaType) && (selectedVisaType === VisaType[2] || selectedVisaType === VisaType[3])) {
            const selectedDate = visaExpiryDate && moment(visaExpiryDate).isValid() ? moment(visaExpiryDate).toDate() : moment().toDate();
            const currentDate = moment().toDate();
            const formattedDate = moment(currentDate).format("DD/MM/YYYY");
            return (
                <div className={`ui ${styles.topMargin} ${styles.bottomMargin} ten wide column field`}>
                    <div className="ui grid">
                        <div className={`ui  six wide column field`}>
                            <label htmlFor="visaExpiryDate">Visa expiry date</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => this.handleDateChange(date)} // Handle date change
                                placeholderText={formattedDate}
                                className="form-control"
                                dateFormat="dd/MM/yyyy" // Customize date format
                                name="visaExpiryDate"
                                minDate={currentDate}

                            />
                        </div>
                        <div className='ui  four wide column'>
                            <br />
                            <button type="button" className={`ui black button ${styles.saveVisaStatus}`} onClick={this.handleSave}>Save</button>
                        </div>
                    </div>
                </div>);
        } else { 
            return null;
        }
    }
    render() {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <div className="ui grid">
                        <div className={`ui ${styles.topMargin} ${styles.bottomMargin} six wide column field`} >
                            <label>Visa type</label>
                            <select className="ui right labeled dropdown"
                                placeholder="VisaType"
                                value={this.state.visa.visaStatus || ''}
                                onChange={this.handleChange}
                                name="visaStatus"
                                className={styles.dropdown}
                            >
                                <option value="">Select your visa type</option>
                                {VisaType.map((visa, index) => (
                                    <option key={index} value={visa}>{visa}</option>
                                )
                                )}
                            </select>
                        </div>
                        {this.renderVisaExpiryDate()}
                    </div>
                </div>
            </div>
        )
    }
}