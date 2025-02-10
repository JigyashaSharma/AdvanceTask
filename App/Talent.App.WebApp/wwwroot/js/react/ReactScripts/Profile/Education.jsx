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
            educationData: this.props.educationData,
            showCloseConfirm: false,
            showCloseConfirm: false,
            newEducation: {
                id: null,
                country: '',
                instituteName: '',
                title: '',
                degree: '',
                yearOfGraduation: ''
            },
            deleteEducation: {
                id: null,
                country: '',
                instituteName: '',
                title: '',
                degree: '',
                yearOfGraduation: ''
            },
            editEducation: {
                id: null,
                country: '',
                instituteName: '',
                title: '',
                degree: '',
                yearOfGraduation: ''
            }
        }
        this.addEducation = this.addEducation.bind(this);
        this.showAddNewSection = this.showAddNewSection.bind(this);
        this.closeAddnewSection = this.closeAddnewSection.bind(this);
        this.handleNewEducationFields = this.handleNewEducationFields.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeConfirmDone = this.closeConfirmDone.bind(this);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditEducationFields = this.handleEditEducationFields.bind(this);
        this.updateEditedEducation = this.updateEditedEducation.bind(this);
        this.closeEditSection = this.closeEditSection.bind(this);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.educationData !== this.props.educationData) {
            this.setState({
                educationData: this.props.educationData
            })
        }
    }

    /*Add Related section start */
    addEducation() {
        if (!this.props.validateFunc(this.state.newEducation)) {
            return;
        }
        const data = [...this.state.educationData, this.state.newEducation]
        this.setState(prevState => ({
            educationData: [...prevState.educationData, prevState.newEducation],
            newEducation: {
                id: null,
                country: '',
                instituteName: '',
                title: '',
                degree: '',
                yearOfGraduation: ''
            }
        }));

        this.props.updateProfileData(this.props.componentId, data);
    }

    handleNewEducationFields(name, value) {
        const data = Object.assign({}, this.state.newEducation);
        data[name] = value;
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
            showAddSection: false
        })
    }
    /*Add Related section end */

    /*Edit Related section start */
    handleEdit(id) {
        const data = this.state.educationData.find(item => item.id === id);
        this.setState({
            showEditConfirm: true,
            editEducation: data
        });
    }
    handleEditEducationFields(name, value) {
        const data = Object.assign({}, this.state.editEducation);
        data[name] = value;

        this.setState({
            editEducation: data
        });
    }

    handleEditDateChange(date, name) {
        const data = Object.assign({}, this.state.editEducation);
        data[name] = date;
        this.setState({
            editEducation: data
        })
    }
    updateEditedEducation() {

        if (!this.props.validateFunc(this.state.newEducation)) {
            return;
        }

        const data = [...this.state.educationData]; // Object.assign({}, this.state.experienceData);
        for (let education of data) {
            if (education.id === this.state.editEducation.id) {
                education.country = this.state.editEducation.country;
                education.instituteName = this.state.editEducation.instituteName;
                education.title = this.state.editEducation.title;
                education.degree = this.state.editEducation.degree;
                education.yearOfGraduation = this.state.editEducation.yearOfGraduation;
                this.props.updateProfileData(this.props.componentId, data);
                break;
            }
        }

        this.setState({
            educationData: data
        })
        this.closeEditSection();
    }

    closeEditSection() {
        this.setState({
            showEditConfirm: false,
            editEducation: {
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
        const data = this.state.educationData.find(item => item.id === id);
        this.setState({
            showCloseConfirm: true,
            deleteEducation: data
        });
    }

    closeConfirmDone() {
        this.setState({
            showCloseConfirm: false,
            deleteEducation: {
                id: null,
                country: '',
                instituteName: '',
                title: '',
                degree: '',
                yearOfGraduation: ''
            }
        })
    }
    /*Delete Related section end */

    render() {
        return (
            <div className="row margined">
                {this.state.showAddSection && < AddItem
                    header={AddItemHeader}
                    handleCancel={this.closeAddnewSection}
                    handleChange={this.handleNewEducationFields}
                    handleAdd={this.addEducation}
                    value={this.state.newEducation}
                />}
            <DisplayItem
                rowHeader={RowHeader}
                data={this.props.educationData}
                component="Education"
                showAddItem={this.showAddNewSection}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                showEditConfirm={this.state.showEditConfirm}
                editItem={this.state.editEducation}
                editHeader={AddItemHeader}
                handleEditFieldsChange={this.handleEditEducationFields}
                handleDateChange={this.handleEditDateChange}
                updateEditedItem={this.updateEditedEducation}
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
