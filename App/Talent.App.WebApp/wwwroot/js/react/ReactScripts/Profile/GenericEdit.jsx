import React from "react";
import styles from '../../../../css/TalentTheme.module.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
export default class EditItem extends React.Component {
    constructor(props) {
        super(props);

        this.renderInputField = this.renderInputField.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(event) {
        const data = Object.assign({}, this.props.value);
        data[event.target.name] = event.target.value;
        this.props.setEditState(data);
    }

    handleDateChange(date, name) {
        const data = Object.assign({}, this.props.value);
        data[name] = date;
        this.props.setEditState(data);
    }

    handleUpdate() {
        //Can change the 'keys' array if any field it not required
        const keys = this.props.header.map(item => item.name);
        if (!this.props.validateFunc(this.props.value, keys)) {
            return;
        }

        const data = [...this.props.fullData];
        const editKeys = this.props.header.map(item => item.name);
        for (let item of data) {
            if (item.id === this.props.value.id) {
                //update the item in the actual object
                editKeys.forEach(key => {
                    if (item.hasOwnProperty(key)){
                        item[key] = this.props.value[key];
                    }
                });
                this.props.updateProfileData(this.props.componentId, data);
                break;
            }
        }

        this.props.setEditState({});
        this.props.handleCancel();
    }
    renderInputField(item) {
        const { name, type, label, placeholder, options, columnWidth } = item;
        const value = this.props.value; //value of the items that is being edited

        switch (type) {
            case "text":
                return (
                    <div key={name} className={`ui ${columnWidth} ${styles.topMargin} ${styles.bottomMargin} wide column field`}> {/* Each input takes 4 out of 16 columns */}
                        {label && <label htmlFor={name}>{label}</label>}
                        <input
                            type={type}
                            name={name}
                            value={value[name] || ""}
                            onChange={this.handleChange}
                            placeholder={placeholder || ""}
                            className="form-control"
                        />
                    </div>
                );
            case "date":
                const selectedDate = value[name] && moment(value[name]).isValid() ? moment(value[name]).toDate() : moment().toDate();

                return (
                    <div key={name} className={`ui ${columnWidth} ${styles.topMargin} ${styles.bottomMargin} wide column field`}> 
                        {label && <label htmlFor={name}>{label}</label>}
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => this.handleDateChange(date, name)}
                            placeholderText={placeholder || "Select a date"}
                            className="form-control"
                            dateFormat="dd/MM/yyyy" // Customize date format
                            name={name}
                        />
                    </div>
                );
            case "dropdown":
                return (
                    <div key={name} className={`ui ${columnWidth} ${styles.topMargin} ${styles.bottomMargin} wide column field`}>
                        {label && <label htmlFor={name}>{label}</label>}
                        <select
                            name={name}
                            value={value[name] || ''}
                            onChange={this.handleChange}
                            className="form-control"
                        >
                            <option value="">{placeholder}</option>
                            {options &&
                                options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                        </select>
                    </div>
                );
            case "number":
                return (
                    <div key={name} className={`ui ${columnWidth} ${styles.topMargin} ${styles.bottomMargin} wide column field`}>
                        {label && <label htmlFor={name}>{label}</label>}
                        <input
                            type="number"
                            min={item.min || 0}
                            max={item.max || undefined}
                            value={value[name] || item.min}
                            onChange={this.handleChange}
                            step={1}
                            name={name}
                        />
                    </div>
                );
            default:
                return null;
        }
    }
    render() {
        const header = this.props.header;
        if (!header || !Array.isArray(header) || header.length === 0 || !this.props.value) {
            return null;
        }
        return (
            <div className="ui sixteen wide column">
                <div className="ui grid">
                    <div className={`ui row margined `}>
                    {/*Iterate over the header that contains the details of Item that needs to be edits. Display them*/}
                        {header && header.map((item) => this.renderInputField(item))}
                        <button type="button" className={`ui black button  ${styles.topMargin} ${styles.bottomMargin} ${styles.leftMargin}`} onClick={this.handleUpdate}>Update</button>
                        <button type="button" className={`ui grey button  ${styles.topMargin} ${styles.bottomMargin}`} onClick={this.props.handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}