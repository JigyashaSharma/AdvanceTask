/* Certificate section */
import React from 'react';
import Cookies from 'js-cookie';
import DisplayItem from './GenericDisplayItem.jsx';
import AddItem from './GenericAddItem.jsx';
import moment from 'moment';
import CloseConfirmation from './CloseConfirmation.jsx';
import EditItem from './GenericEdit.jsx';

//Header name actual variable name
const RowHeader = { "Name": "certificationName", "From": "certificationFrom", "Year": "certificationYear" };

const AddItemHeader = [
    { name: "certificationName", type: "text", label: "Certification Name", placeholder: "Certification Name", columnWidth: "eight" },
    { name: "certificationFrom", type: "text", label: "Certification From", placeholder: "Certification From", columnWidth: "eight" },
    { name: "certificationYear", type: "number", label: "Certification Year", placeholder: "Certification Year", columnWidth: "sixteen", max: moment().year() }
]
export default class Certificate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showAddSection: false,
            showCloseConfirm: false,
            showEditConfirm: false,
            newCertificate: {},
            deleteCertificate: {},
            editCertificate: {}
        }
        
        this.showAddNewSection = this.showAddNewSection.bind(this);
        this.closeAddnewSection = this.closeAddnewSection.bind(this);
        this.setNewCertificate = this.setNewCertificate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeConfirmDone = this.closeConfirmDone.bind(this);

        this.handleEdit = this.handleEdit.bind(this);
        this.setEditCertificate = this.setEditCertificate.bind(this);
        this.closeEditSection = this.closeEditSection.bind(this);

    };

    /*add certificate start*/
    setNewCertificate(data) {
        this.setState({
            newCertificate: data
        });
    }

    showAddNewSection() {
        this.setState({
            showAddSection: true
        })
    }
    closeAddnewSection() {
        this.setState({
            showAddSection: false,
            newCertificate: {}
        })
    }
    /*Add Related section end */

    /*Edit Related section start */
    handleEdit(id) {
        const data = this.props.certificateData.find(item => item.id === id);
        this.setState({
            showEditConfirm: true,
            editCertificate: data
        });
    }
    
    setEditCertificate(data) {
        this.setState({
            editCertificate: data
        })
    }

    closeEditSection() {
        this.setState({
            showEditConfirm: false,
            editCertificate: {}
        })
    }
    /*Edit Related section end */

    /*Delete Related section start */
    handleDelete(id) {
        const data = this.props.certificateData.find(item => item.id === id);
        this.setState({
            showCloseConfirm: true,
            deleteCertificate: data
        });
    }

    closeConfirmDone() {
        this.setState({
            showCloseConfirm: false,
            deleteCertificate: {}
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
                    setNewState={this.setNewCertificate}
                    updateProfileData={this.props.updateProfileData}
                    validateFunc={this.props.validateFunc}
                    fullData={this.props.certificateData}
                    value={this.state.newCertificate}
                />}
                <DisplayItem
                    rowHeader={RowHeader}
                    displayData={this.props.certificateData}
                    componentId={this.props.componentId}
                    showAddItem={this.showAddNewSection}
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                    showEditConfirm={this.state.showEditConfirm}
                    editItem={this.state.editCertificate}
                    editHeader={AddItemHeader}
                    setEditState={this.setEditCertificate}
                    validateFunc={this.props.validateFunc}
                    updateProfileData={this.props.updateProfileData}
                    fullData={this.props.certificateData}
                    closeEditSection={this.closeEditSection}
                />
                <CloseConfirmation
                    open={this.state.showCloseConfirm}
                    deleteItem={this.state.deleteCertificate}
                    componentId={this.props.componentId}
                    deleteComponentValues={this.props.deleteComponentValues}
                    closeConfirmDone={this.closeConfirmDone}
                />
            </div>
        )
    }
}

