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
    { name: "certificationYear", type: "number", label: "Certification Year", placeholder: "Certification Year", columnWidth: "sixteen", min: "2000", max: moment().year() }
]
export default class Certificate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showAddSection: false,
            certificateData: this.props.certificateData,
            showCloseConfirm: false,
            showEditConfirm: false,
            newCertificate: {
                id: null,
                certificationName: '',
                certificationFrom: '',
                certificationYear: 2000,
            },
            deleteCertificate: {
                id: null,
                certificationName: '',
                certificationFrom: '',
                certificationYear: 2000,
            },
            editCertificate: {
                id: null,
                certificationName: '',
                certificationFrom: '',
                certificationYear: 2000,
            }
        }
        this.addCertificate = this.addCertificate.bind(this);
        this.showAddNewSection = this.showAddNewSection.bind(this);
        this.closeAddnewSection = this.closeAddnewSection.bind(this);
        this.handleNewCertificateFields = this.handleNewCertificateFields.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeConfirmDone = this.closeConfirmDone.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditCertificateFields = this.handleEditCertificateFields.bind(this);
        this.updateEditedCertificate = this.updateEditedCertificate.bind(this);
        this.closeEditSection = this.closeEditSection.bind(this);

    };

    componentDidUpdate(prevProps) {
        if (prevProps.certificateData !== this.props.certificateData) {
            this.setState({
                certificateData: this.props.certificateData
            })
        }
    }
    /*Add Related section start */
    addCertificate() {
        if (!this.props.validateFunc(this.state.newCertificate)) {
            return;
        }
        const data = [...this.state.certificateData, this.state.newCertificate]
        this.setState(prevState => ({
            certificateData: [...prevState.certificateData, prevState.newCertificate],
            newCertificate: {
                id: null,
                certificationName: '',
                certificationFrom: '',
                certificationYear: 2000,
            }
        }));

        this.props.updateProfileData(this.props.componentId, data);
    }

    handleNewCertificateFields(name, value) {
        const data = Object.assign({}, this.state.newCertificate);
        data[name] = value;
        this.setState({
            newCertificate: data
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
        const data = this.state.certificateData.find(item => item.id === id);
        this.setState({
            showEditConfirm: true,
            editCertificate: data
        });
    }
    handleEditCertificateFields(name, value) {
        const data = Object.assign({}, this.state.editCertificate);
        data[name] = value;

        this.setState({
            editCertificate: data
        });
    }

    updateEditedCertificate() {
        if (!this.props.validateFunc(this.state.editCertificate)) {
            return;
        }
        const data = [...this.state.certificateData];
        for (let certificate of data) {
            if (certificate.id === this.state.editCertificate.id) {
                certificate.certificationName = this.state.editCertificate.certificationName;
                certificate.certificationFrom = this.state.editCertificate.certificationFrom;
                certificate.certificationYear = this.state.editCertificate.certificationYear;
                this.props.updateProfileData(this.props.componentId, data);
                break;
            }
        }

        this.setState({
            certificateData: data,
            editCertificate: {
                id: null,
                certificationName: '',
                certificationFrom: '',
                certificationYear: 2000,
            }
        })
        this.closeEditSection();
    }

    closeEditSection() {
        this.setState({
            showEditConfirm: false,
            editCertificate: {
                id: null,
                certificationName: '',
                certificationFrom: '',
                certificationYear: 2000,
            }
        })
    }
    /*Edit Related section end */

    /*Delete Related section start */
    handleDelete(id) {
        const data = this.state.certificateData.find(item => item.id === id);
        this.setState({
            showCloseConfirm: true,
            deleteCertificate: data
        });
    }

    closeConfirmDone() {
        this.setState({
            showCloseConfirm: false,
            deleteCertificate: {
                id: null,
                certificationName: '',
                certificationFrom: '',
                certificationYear: 2000,
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
                    handleChange={this.handleNewCertificateFields}
                    handleAdd={this.addCertificate}
                    value={this.state.newCertificate}
                />}
                <DisplayItem
                    rowHeader={RowHeader}
                    data={this.props.certificateData}
                    component="Certificate"
                    showAddItem={this.showAddNewSection}
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                    showEditConfirm={this.state.showEditConfirm}
                    editItem={this.state.editCertificate}
                    editHeader={AddItemHeader}
                    handleEditFieldsChange={this.handleEditCertificateFields}
                    updateEditedItem={this.updateEditedCertificate}
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

