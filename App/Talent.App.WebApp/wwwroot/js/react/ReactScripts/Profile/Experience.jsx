/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import DisplayItem from './GenericDisplayItem.jsx';
import AddItem from './GenericAddItem.jsx';
import moment from 'moment';
import CloseConfirmation from './CloseConfirmation.jsx';
import EditItem from './GenericEdit.jsx';

//Header name actual variable name
const RowHeader = { "Company": "company", "Position": "position", "Responsibilities": "responsibilities", "Start": "start", "End": "end" };

const AddItemHeader = [
    { name: "company", type: "text", label: "Company", placeholder: "Company", columnWidth: "eight" },
    { name: "position", type: "text", label: "Position", placeholder: "Position", columnWidth: "eight" },
    { name: "start", type: "date", label: "Start Date", placeholder: moment().toDate(), columnWidth: "eight" },
    { name: "end", type: "date", label: "End Date", placeholder: moment().toDate(), columnWidth: "eight" },
    { name: "responsibilities", type: "text", label: "Responsibilities", placeholder: "Responsibilities", columnWidth: "sixteen" }
]

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddSection: false,
            experienceData: this.props.experienceData,
            showCloseConfirm: false,
            newExperience: {
                id: null,
                userId: null,
                company: '',
                position: '',
                responsibilities: '',
                start: moment(),
                end: moment()
            },
            deleteExperience: {
                id: null,
                userId: null,
                company: '',
                position: '',
                responsibilities: '',
                start: null,
                end: null
            },
            editExperience: {
                id: null,
                userId: null,
                company: '',
                position: '',
                responsibilities: '',
                start: null,
                end: null
            },
        }
        this.showAddNewSection = this.showAddNewSection.bind(this);
        this.closeAddnewSection = this.closeAddnewSection.bind(this);
        this.handleNewExperienceFields = this.handleNewExperienceFields.bind(this);
        this.addExperience = this.addExperience.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeConfirmDone = this.closeConfirmDone.bind(this);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditExperienceFields = this.handleEditExperienceFields.bind(this);
        this.updateEditedExperience = this.updateEditedExperience.bind(this);
        this.closeEditSection = this.closeEditSection.bind(this);
        this.handleEditDateChange = this.handleEditDateChange.bind(this);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.experienceData !== this.props.experienceData) {
            this.setState({
                experienceData: this.props.experienceData
            })
        }
    }

    /*Add Related section start */
    addExperience() {
        if (!this.props.validateFunc(this.state.newExperience)) {
            return;
        }
        const data = [...this.state.experienceData, this.state.newExperience]
        this.setState(prevState => ({
            experienceData: [...prevState.experienceData, prevState.newExperience],
            newExperience: {
                id: null,
                userId: null,
                company: '',
                position: '',
                responsibilities: '',
                start: moment(),
                end: moment()
            },
        }));

        this.props.updateProfileData(this.props.componentId, data);
    }
    handleNewExperienceFields(name, value) {
        const data = Object.assign({}, this.state.newExperience);
        data[name] = value;
        this.setState({
            newExperience: data
        })
    }

    handleDateChange(date, name) {
        const data = Object.assign({}, this.state.newExperience);
        data[name] = date;
        this.setState({
            newExperience: data
        })
    }
    showAddNewSection() {
        this.setState({
            showAddSection: true
        })
    }
    closeAddnewSection() {
        this.setState({
            showAddSection: false
        })
    }
    /*Add Related section end */

    /*Edit Related section start */
    handleEdit(id) {
        const data = this.state.experienceData.find(item => item.id === id);
        this.setState({
            showEditConfirm: true,
            editExperience: data
        });
    }
    handleEditExperienceFields(name, value) {
        const data = Object.assign({}, this.state.editExperience);
        data[name] = value;

        this.setState({
            editExperience: data
        });
    }

    handleEditDateChange(date, name) {
        const data = Object.assign({}, this.state.editExperience);
        data[name] = date;
        this.setState({
            editExperience: data
        })
    }
    updateEditedExperience() {
        if (!this.props.validateFunc(this.state.editExperience)) {
            return;
        }
        const data = [...this.state.experienceData];
        for (let experience of data) {
            if (experience.id === this.state.editExperience.id) {
                experience.company = this.state.editExperience.company;
                experience.position = this.state.editExperience.position;
                experience.start = this.state.editExperience.start;
                experience.end = this.state.editExperience.end;
                experience.responsibilities = this.state.editExperience.responsibilities;
                this.props.updateProfileData(this.props.componentId, data);
                break;
            }
        }

        this.setState({
            experienceData: data,
            editExperience: {
                id: null,
                userId: null,
                company: '',
                position: '',
                responsibilities: '',
                start: null,
                end: null
            },
        })
        this.closeEditSection();
    }

    closeEditSection() {
        this.setState({
            showEditConfirm: false,
            editExperience: {
                id: null,
                userId: null,
                company: '',
                position: '',
                responsibilities: '',
                start: null,
                end: null
            }
        })
    }
    /*Edit Related section end */

    /*Delete Related section start */
    handleDelete(id) {
        const data = this.state.experienceData.find(item => item.id === id);
        this.setState({
            showCloseConfirm: true,
            deleteExperience: data
        });
    }

    closeConfirmDone() {
        this.setState({
            showCloseConfirm: false,
            deleteExperience: {
                id: null,
                userId: null,
                company: '',
                position: '',
                responsibilities: '',
                start: null,
                end: null
            }
        })
    }
    /*Delete Related section end */

    render() {

        const updatedExperienceData = this.props.experienceData && Array.isArray(this.props.experienceData)
            ? this.props.experienceData.map(item => {
                return Object.assign({}, item, {
                    start: item.start ? (moment(item.start)).format('Do MMM, YYYY') : '',
                    end: item.end ? (moment(item.end)).format('Do MMM, YYYY') : '',
                });
            })
            : [];
        
        
        return (
            <div className="row margined">
                {this.state.showAddSection && < AddItem
                    header={AddItemHeader}
                    handleCancel={this.closeAddnewSection}
                    handleChange={this.handleNewExperienceFields}
                    handleAdd={this.addExperience}
                    handleDateChange={this.handleDateChange }
                    value={this.state.newExperience}
                />}
            <DisplayItem
                rowHeader={RowHeader}
                data={updatedExperienceData}
                component="Experience"
                showAddItem={this.showAddNewSection}
                handleDelete={this.handleDelete }
                handleEdit={this.handleEdit}
                showEditConfirm={this.state.showEditConfirm}
                editItem={this.state.editExperience}
                editHeader={AddItemHeader}
                handleEditFieldsChange={this.handleEditExperienceFields}
                handleDateChange={this.handleEditDateChange}
                updateEditedItem={this.updateEditedExperience}
                closeEditSection={this.closeEditSection}
                />   
                <CloseConfirmation
                    open={this.state.showCloseConfirm}
                    deleteItem={this.state.deleteExperience}
                    componentId={this.props.componentId}
                    deleteComponentValues={this.props.deleteComponentValues}
                    closeConfirmDone={this.closeConfirmDone}
                />
            </div>
        )
    }
}
