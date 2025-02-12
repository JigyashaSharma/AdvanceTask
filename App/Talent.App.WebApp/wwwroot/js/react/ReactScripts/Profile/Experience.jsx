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
            showCloseConfirm: false,
            newExperience: {},
            deleteExperience: {},
            editExperience: {}

        }
        this.showAddNewSection = this.showAddNewSection.bind(this);
        this.closeAddnewSection = this.closeAddnewSection.bind(this);
        this.setNewExperience = this.setNewExperience.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeConfirmDone = this.closeConfirmDone.bind(this);

        this.handleEdit = this.handleEdit.bind(this);
        this.setEditExperience = this.setEditExperience.bind(this);
        this.closeEditSection = this.closeEditSection.bind(this);
    };

    /*Add Related section start */
    setNewExperience(data) {
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
            showAddSection: false,
            newExperience: {}
        })
    }
    /*Add Related section end */

    /*Edit Related section start */
    handleEdit(id) {
        const data = this.props.experienceData.find(item => item.id === id);
        this.setState({
            showEditConfirm: true,
            editExperience: data
        });
    }
    
    setEditExperience(data) {
        this.setState({
            editExperience: data
        })
    }

    closeEditSection() {
        this.setState({
            showEditConfirm: false,
            editExperience: {}
        })
    }
    /*Edit Related section end */

    /*Delete Related section start */
    handleDelete(id) {
        const data = this.props.experienceData.find(item => item.id === id);
        this.setState({
            showCloseConfirm: true,
            deleteExperience: data
        });
    }

    closeConfirmDone() {
        this.setState({
            showCloseConfirm: false,
            deleteExperience: {}
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
                    componentId={this.props.componentId}
                    handleCancel={this.closeAddnewSection}
                    setNewState={this.setNewExperience}
                    updateProfileData={this.props.updateProfileData}
                    validateFunc={this.props.validateFunc}
                    fullData={this.props.experienceData}
                    value={this.state.newExperience}
                />}
            <DisplayItem
                rowHeader={RowHeader}
                displayData={updatedExperienceData}
                componentId={this.props.componentId}
                showAddItem={this.showAddNewSection}
                handleDelete={this.handleDelete }
                handleEdit={this.handleEdit}
                showEditConfirm={this.state.showEditConfirm}
                editItem={this.state.editExperience}
                editHeader={AddItemHeader}
                setEditState={this.setEditExperience}
                validateFunc={this.props.validateFunc}
                updateProfileData={this.props.updateProfileData}
                fullData={this.props.experienceData}
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
