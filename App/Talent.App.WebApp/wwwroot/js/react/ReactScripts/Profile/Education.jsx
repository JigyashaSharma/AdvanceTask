/* Education section */
import React from 'react';
import Cookies from 'js-cookie';
import DisplayItem from './GenericDisplayItem.jsx';
import AddItem from './GenericAddItem.jsx';
import { default as Countries } from '../../../../../wwwroot/util/jsonFiles/countries.json'
import CloseConfirmation from './CloseConfirmation.jsx';
import EditItem from './GenericEdit.jsx';

//Header name actual variable name
const RowHeader = { "Country": "country", "InstituteName": "instituteName", "Title": "title", "Degree": "degree", "YearOfGraduation": "yearOfGraduation" };

const countriesOptions = Object.keys(Countries).map((x) => x);
const AddItemHeader = [
    { name: "country", type: "dropdown", label: "Country", placeholder: "Country", options: countriesOptions, columnWidth: "six" },
    { name: "instituteName", type: "text", label: "Institute Name", placeholder: "Institute Name", columnWidth: "six" },
    { name: "title", type: "text", label: "Title", placeholder: "Title", columnWidth: "six" },
    { name: "degree", type: "text", label: "Degree", placeholder: "Degree", columnWidth: "six" },
    { name: "yearOfGraduation", type: "number", label: "YearOfGraduation", placeholder: "YearOfGraduation", columnWidth: "sixteen" },
]
export default class Education extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddSection: false,
            showCloseConfirm: false,
            showCloseConfirm: false,
            newEducation: {},
            deleteEducation: {},
            editEducation: {}
        }
        
        this.showAddNewSection = this.showAddNewSection.bind(this);
        this.closeAddnewSection = this.closeAddnewSection.bind(this);
        this.setNewEducation = this.setNewEducation.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeConfirmDone = this.closeConfirmDone.bind(this);

        this.handleEdit = this.handleEdit.bind(this);
        this.setEditEducation = this.setEditEducation.bind(this);
        this.closeEditSection = this.closeEditSection.bind(this);
    };

    /*Add Related section start */
    setNewEducation(data) {
        this.setState({
            newEducation: data
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
            newEducation: {}
        })
    }
    /*Add Related section end */

    /*Edit Related section start */
    handleEdit(id) {
        const data = this.props.educationData.find(item => item.id === id);
        this.setState({
            showEditConfirm: true,
            editEducation: data
        });
    }

    setEditEducation(data) {
        this.setState({
            editEducation: data
        })
    }

    closeEditSection() {
        this.setState({
            showEditConfirm: false,
            editEducation: {}
        })
    }
    /*Edit Related section end */

    /*Delete Related section start */
    handleDelete(id) {
        const data = this.props.educationData.find(item => item.id === id);
        this.setState({
            showCloseConfirm: true,
            deleteEducation: data
        });
    }

    closeConfirmDone() {
        this.setState({
            showCloseConfirm: false,
            deleteEducation: {}
        })
    }
    /*Delete Related section end */

    render() {
        return (
            <div className="row margined">
                {this.state.showAddSection && < AddItem
                    header={AddItemHeader}
                    componentId={this.props.componentId}
                    handleCancel={this.closeAddnewSection}
                    setNewState={this.setNewEducation}
                    updateProfileData={this.props.updateProfileData}
                    validateFunc={this.props.validateFunc}
                    fullData={this.props.educationData}
                    value={this.state.newEducation}
                />}
            <DisplayItem
                rowHeader={RowHeader}
                displayData={this.props.educationData}
                componentId={this.props.componentId}
                showAddItem={this.showAddNewSection}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                showEditConfirm={this.state.showEditConfirm}
                editItem={this.state.editEducation}
                editHeader={AddItemHeader}
                setEditState={this.setEditEducation}
                validateFunc={this.props.validateFunc}
                updateProfileData={this.props.updateProfileData}
                fullData={this.props.educationData}
                closeEditSection={this.closeEditSection}
                /> 
                <CloseConfirmation
                    open={this.state.showCloseConfirm}
                    deleteItem={this.state.deleteEducation}
                    componentId={this.props.componentId}
                    deleteComponentValues={this.props.deleteComponentValues}
                    closeConfirmDone={this.closeConfirmDone}
                />
            </div>
        )
    }
}
