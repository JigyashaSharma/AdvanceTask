/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import DisplayItem from './GenericDisplayItem.jsx';
import AddItem from './GenericAddItem.jsx';
import CloseConfirmation from './CloseConfirmation.jsx';
import EditItem from './GenericEdit.jsx';

//Header name : actual variable name
const RowHeader = { "Skill": "name", "Level": "level" };

const AddItemHeader = [
    { name: "name", type: "text", label: "", placeholder: "Add Skill", columnWidth: "six" },
    { name: "level", type: "dropdown", label: "", placeholder: "Skill Level", options: ["Beginner", "Intermediate", "Expert"], columnWidth: "six" }
]
export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddSection: false,
            skillData: this.props.skillData,
            showCloseConfirm: false,
            showEditConfirm: false,
            newSkill: {
                id: null,
                name: '',
                level: '',
            },
            deleteSkill: {
                id: null,
                name: '',
                level: '',
            },
            editSkill: {
                id: null,
                name: '',
                level: '',
            }
        }
        this.addSkill = this.addSkill.bind(this);
        this.showAddNewSection = this.showAddNewSection.bind(this);
        this.closeAddnewSection = this.closeAddnewSection.bind(this);
        this.handleNewSkillFields = this.handleNewSkillFields.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeConfirmDone = this.closeConfirmDone.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditSkillFields = this.handleEditSkillFields.bind(this);
        this.updateEditedSkill = this.updateEditedSkill.bind(this);
        this.closeEditSection = this.closeEditSection.bind(this);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.skillData !== this.props.skillData) {
            this.setState({
                skillData: this.props.skillData
            })
        }
    }

    /*validateInput(skill) {
        //validate language is not null
        if (!skill.name || !skill.level) {
            TalentUtil.notification.show("Please provide valid values for skill!", "success", null, null);
            return false;
        }

        return true;
    }*/

    /*Add Related section start */
    addSkill() {
        if (!this.props.validateFunc(this.state.newSkill)) {
            return;
        }
        const data = [...this.state.skillData, this.state.newSkill]
        this.setState(prevState => ({
            skillData: [...prevState.skillData, prevState.newSkill],
            newSkill: { id: null, name: "", level: "" }
        }));

        this.props.updateProfileData(this.props.componentId, data);
    }

    handleNewSkillFields(name, value) {
        const data = Object.assign({}, this.state.newSkill);
        data[name] = value;
        this.setState({
            newSkill: data
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
        const data = this.state.skillData.find(item => item.id === id);
        this.setState({
            showEditConfirm: true,
            editSkill: data
        });
    }
    handleEditSkillFields(name, value) {
        const data = Object.assign({}, this.state.editSkill);
        data[name] = value;

        this.setState({
            editSkill: data
        });
    }

    updateEditedSkill() {
        if (!this.props.validateFunc(this.state.editSkill)) {
            return;
        }
        const data = [...this.state.skillData];
        for (let skill of data) {
            if (skill.id === this.state.editSkill.id) {
                skill.name = this.state.editSkill.name;
                skill.level = this.state.editSkill.level;
                this.props.updateProfileData(this.props.componentId, data);
                break;
            }
        }

        this.setState({
            skillData: data,
            editSkill: {
                id: null,
                name: '',
                level: '',
            }
        })
        this.closeEditSection();
    }

    closeEditSection() {
        this.setState({
            showEditConfirm: false,
            editSkill: {
                id: null,
                name: '',
                level: '',
            }
        })
    }
    /*Edit Related section end */

    /*Delete Related section start */
    handleDelete(id) {
        const data = this.state.skillData.find(item => item.id === id);
        this.setState({
            showCloseConfirm: true,
            deleteSkill: data
        });
    }

    closeConfirmDone() {
        this.setState({
            showCloseConfirm: false,
            deleteSkill: {
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
                   handleChange={this.handleNewSkillFields}
                   handleAdd={this.addSkill}
                   value={this.state.newSkill}
               />}
           <DisplayItem
               rowHeader={RowHeader}
               data={this.props.skillData}
               component="Skill"
               showAddItem={this.showAddNewSection}
               handleDelete={this.handleDelete }
               handleEdit={this.handleEdit}
               showEditConfirm={this.state.showEditConfirm}
               editItem={this.state.editSkill}
               editHeader={AddItemHeader}
               handleEditFieldsChange={this.handleEditSkillFields}
               updateEditedItem={this.updateEditedSkill}
               closeEditSection={this.closeEditSection}
               />
               <CloseConfirmation
                   open={this.state.showCloseConfirm}
                   deleteItem={this.state.deleteSkill}
                   componentId={this.props.componentId}
                   deleteComponentValues={this.props.deleteComponentValues}
                   closeConfirmDone={this.closeConfirmDone}
               />
           </div>
        )
    }
}

