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
            languageData: this.props.languageData,
            newLanguage: {
                id: null,
                name: '',
                level:'',
            },
            deleteLanguage: {
                id: null,
                name: '',
                level: '',
            },
            editLanguage: {
                id: null,
                name: '',
                level: '',
            }
        }
        this.addLanguage = this.addLanguage.bind(this);
        this.showAddNewSection = this.showAddNewSection.bind(this);
        this.closeAddnewSection = this.closeAddnewSection.bind(this);
        this.handleNewLanguageFields = this.handleNewLanguageFields.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeConfirmDone = this.closeConfirmDone.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditLanguageFields = this.handleEditLanguageFields.bind(this);
        this.updateEditedLanguage = this.updateEditedLanguage.bind(this);
        this.closeEditSection = this.closeEditSection.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.languageData !== this.props.languageData) {
            this.setState({
                languageData: this.props.languageData
            })
        }
    }

    /*Add Related section start */
    addLanguage() {
        if (!this.props.validateFunc(this.state.newLanguage)) {
            return;
        }
        const data = [...this.state.languageData, this.state.newLanguage];
        
        this.setState(prevState => ({
            languageData: [...prevState.languageData, prevState.newLanguage],
            newLanguage: { name: "", level: "" }
        }));

        
        this.props.updateProfileData(this.props.componentId, data);
    }

    handleNewLanguageFields(name, value) {
        const data = Object.assign({}, this.state.newLanguage);
        data[name] = value;
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
            showAddSection: false
        })
    }

    /*Add Related section end */

    /*Edit Related section start */

    handleEdit(id) {
        const data = this.state.languageData.find(item => item.id === id);
        this.setState({
            showEditConfirm: true,
            editLanguage: data
        });
    }
    handleEditLanguageFields(name, value) {
        const data = Object.assign({}, this.state.editLanguage);
        data[name] = value;

        this.setState({
            editLanguage: data
        });
    }

    updateEditedLanguage() {
        if (!this.props.validateFunc(this.state.editLanguage)) {
            return;
        }
        const data = [...this.state.languageData];
        for (let language of data) {
            if (language.id === this.state.editLanguage.id) {
                language.name = this.state.editLanguage.name;
                language.level = this.state.editLanguage.level;
                this.props.updateProfileData(this.props.componentId, data);
                break;
            }
        }

        this.setState({
            languageData: data
        })
        this.closeEditSection();
    }

    closeEditSection() {
        this.setState({
            showEditConfirm: false,
            editLanguage : {
                id: null,
                name: '',
                level: '',
            }
        })
    }
    /*Edit Related section end */

    /*Delete Related section start */
    handleDelete(id) {
        const data = this.state.languageData.find(item => item.id === id);
        this.setState({
            showCloseConfirm: true,
            deleteLanguage: data
        });
    }

    closeConfirmDone() {
        this.setState({
            showCloseConfirm: false,
            deleteLanguage: {
                id: null,
                name: '',
                level: ''
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
                    handleChange={this.handleNewLanguageFields}
                    handleAdd={this.addLanguage}
                    value={this.state.newLanguage || {}}
                />}
                {/*Display handles edit as well*/}
                <DisplayItem
                    rowHeader={RowHeader}
                    data={this.props.languageData || []}
                    component="Language"
                    showAddItem={this.showAddNewSection}
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                    showEditConfirm={this.state.showEditConfirm}
                    editItem={this.state.editLanguage || {}}
                    editHeader={AddItemHeader }
                    handleEditFieldsChange={this.handleEditLanguageFields}
                    updateEditedItem={this.updateEditedLanguage}
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
