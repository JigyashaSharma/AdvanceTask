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
            showCloseConfirm: false,
            showEditConfirm: false,
            newSkill: {},
            deleteSkill: {},
            editSkill: {}
        }
        
        this.setNewSkill = this.setNewSkill.bind(this);
        this.showAddNewSection = this.showAddNewSection.bind(this);
        this.closeAddnewSection = this.closeAddnewSection.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeConfirmDone = this.closeConfirmDone.bind(this);

        this.handleEdit = this.handleEdit.bind(this);
        this.setEditSkill = this.setEditSkill.bind(this);
        this.closeEditSection = this.closeEditSection.bind(this);
    };

    /*Add Related section start */
    setNewSkill(data) {
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
            showAddSection: false,
            newSkill: {}
        })
    }
    /*Add Related section end */

    /*Edit Related section start */
    handleEdit(id) {
        const data = this.props.skillData.find(item => item.id === id);
        this.setState({
            showEditConfirm: true,
            editSkill: data
        });
    }
    
    setEditSkill(data) {
        this.setState({
            editSkill: data
        })
    }

    closeEditSection() {
        this.setState({
            showEditConfirm: false,
            editSkill: {}
        })
    }
    /*Edit Related section end */

    /*Delete Related section start */
    handleDelete(id) {
        const data = this.props.skillData.find(item => item.id === id);
        this.setState({
            showCloseConfirm: true,
            deleteSkill: data
        });
    }

    closeConfirmDone() {
        this.setState({
            showCloseConfirm: false,
            deleteSkill: {}
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
                   setNewState={this.setNewSkill}
                   updateProfileData={this.props.updateProfileData}
                   validateFunc={this.props.validateFunc}
                   fullData={this.props.skillData}
                   value={this.state.newSkill}
               />}
           <DisplayItem
               rowHeader={RowHeader}
               displayData={this.props.skillData}
               componentId={this.props.componentId}
               showAddItem={this.showAddNewSection}
               handleDelete={this.handleDelete }
               handleEdit={this.handleEdit}
               showEditConfirm={this.state.showEditConfirm}
               editItem={this.state.editSkill}
               editHeader={AddItemHeader}
               setEditState={this.setEditSkill}
               validateFunc={this.props.validateFunc}
               updateProfileData={this.props.updateProfileData}
               fullData={this.props.skillData}
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

