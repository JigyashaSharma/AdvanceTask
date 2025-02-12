/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import DisplayItem from './GenericDisplayItem.jsx';
import EditItem from './GenericEdit.jsx';
import AddItem from './GenericAddItem.jsx';
import CloseConfirmation from './CloseConfirmation.jsx';

//Header name actual variable name
const RowHeader = { Language: "name" , Level: "level"};

//This variable has information for displaying AddNew Section
const AddItemHeader = [
    { name: "name", type: "text", label: "", placeholder: "Add Language", columnWidth: "six" },
    { name: "level", type: "dropdown", label: "", placeholder: "Language Level", options: ["Basic", "Conversational", "Fluent", "Native/Bilingual"], columnWidth: "six" }
]
export default class Language extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddSection: false,
            showCloseConfirm: false,
            showEditConfirm: false,
            newLanguage: {},
            deleteLanguage: {},
            editLanguage: {}

        }
        
        this.setNewLanguage = this.setNewLanguage.bind(this);
        this.showAddNewSection = this.showAddNewSection.bind(this);
        this.closeAddnewSection = this.closeAddnewSection.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeConfirmDone = this.closeConfirmDone.bind(this);

        this.handleEdit = this.handleEdit.bind(this);
        this.setEditLanguage = this.setEditLanguage.bind(this);
        this.closeEditSection = this.closeEditSection.bind(this);
    }

    /*Add Related section start */
    setNewLanguage(data) {
        this.setState({

            newLanguage: data
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
            newLanguage: {}
        })
    }

    /*Add Related section end */

    /*Edit Related section start */

    handleEdit(id) {
        const data = this.props.languageData.find(item => item.id === id);
        this.setState({
            showEditConfirm: true,
            editLanguage: data
        });
    }

    setEditLanguage(data) {
        this.setState({
            editLanguage: data
        })
    }

    closeEditSection() {
        this.setState({
            showEditConfirm: false,
            editLanguage : {}
        })
    }
    /*Edit Related section end */

    /*Delete Related section start */
    handleDelete(id) {
        const data = this.props.languageData.find(item => item.id === id);
        this.setState({
            showCloseConfirm: true,
            deleteLanguage: data
        });
    }

    closeConfirmDone() {
        this.setState({
            showCloseConfirm: false,
            deleteLanguage: {}
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
                    setNewState={this.setNewLanguage}
                    updateProfileData={this.props.updateProfileData}
                    validateFunc={this.props.validateFunc}
                    fullData={this.props.languageData}
                    value={this.state.newLanguage || {}}
                />}
                {/*Display handles edit as well*/}
                <DisplayItem
                    rowHeader={RowHeader}
                    displayData={this.props.languageData || []}
                    componentId={this.props.componentId}
                    showAddItem={this.showAddNewSection}
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                    showEditConfirm={this.state.showEditConfirm}
                    editItem={this.state.editLanguage || {}}
                    editHeader={AddItemHeader}
                    setEditState={this.setEditLanguage}
                    validateFunc={this.props.validateFunc}
                    updateProfileData={this.props.updateProfileData}
                    fullData={this.props.languageData}
                    closeEditSection={this.closeEditSection}
                />
                <CloseConfirmation
                        open={this.state.showCloseConfirm}
                        deleteItem={this.state.deleteLanguage || {}}
                        componentId={this.props.componentId || '' }
                        deleteComponentValues={this.props.deleteComponentValues }
                        closeConfirmDone={this.closeConfirmDone}
                    />
            </div>
        )
        
    }
}
