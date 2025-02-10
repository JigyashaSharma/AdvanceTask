/*Generic code to Display the components*/

import React from 'react';
import { FaPlus, FaPencilAlt, FaTimes } from 'react-icons/fa';
import styles from '../../../../css/TalentTheme.module.css';
import EditItem from './GenericEdit.jsx';

export default class DisplayItem extends React.Component {
    constructor(props)
    {
        super(props);

        this.ValidateRowHeader = this.ValidateRowHeader.bind(this);
        this.ValidateData = this.ValidateData.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.displayData = this.displayData.bind(this);
    }

    ValidateRowHeader(rowHeader)
    {
        return Object.keys(rowHeader).length > 0 &&
            Object.values(rowHeader).every(value => value.trim() !== '');
    };

    ValidateData(data)
    {
        if (data && Array.isArray(data)) {
            if (data.length === 0) {
                return false;
            }
            else {
                return true;
            }
        } else {
            return false;
        }
    }

    handleEdit(id) {
        this.props.handleEdit(id);
    };

    handleDelete(id) {
        this.props.handleDelete(id);
        // Implement your delete logic here
    };

    displayData(item, header) {
        //if data item is the one being edited skip it
        if (this.props.showEditConfirm && this.props.editItem && item.id === this.props.editItem.id) {
            return null;
        }
        //return the row of item
        return (
            <tr key={item.id}>
                {
                    Object.keys(header).map(key => (
                        <td key={key}> {item[header[key]]} </td>
                    ))}
                <td className="ui right floated" >
                    <div className={styles.iconContainer}>
                        {/* Edit Icon */}
                        <FaPencilAlt
                            className={styles.iconStyle}
                            onClick={() => this.handleEdit(item.id)}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        />

                        {/* Delete Icon */}
                        <FaTimes
                            className={styles.iconStyle}
                            onClick={() => this.handleDelete(item.id)}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        />
                    </div>
                </td>
            </tr>
        );
    }
    render() {
        if (!this.ValidateRowHeader(this.props.rowHeader))
        {
            return;
        }
        const header = this.props.rowHeader;

        let data = null;
        if (this.ValidateData(this.props.data)) {
            data = this.props.data;
        }

        return (
                <div className="ui sixteen wide column">
                    {/*Header of the table */}
                    <table className="ui table" style={{ width: '100%' }}>
                    <thead>
                        {/*Display the Header value */ }
                            <tr>
                                {Object.keys(header).map((key) => (
                                    <th key={key}>
                                    {key}
                                </th>
                                ))}
                                <th>
                                    <button
                                        type="button"
                                        className={`ui right floated black button ${styles.buttonIconAndTextAlignment}`}
                                        onClick={this.props.showAddItem}
                                    >
                                    <FaPlus className="icon" />
                                    AddNew
                                    </button>
                                </th>
                            </tr>
                        </thead>
                    <tbody>
                        {/* Show the Item to edit on top, if edit is clicked. else null*/}
                        {this.props.showEditConfirm ?
                            <tr>
                                <td colSpan={Object.keys(header).length + 1}>
                                <EditItem
                                    header={this.props.editHeader}
                                    value={this.props.editItem}
                                    handleChange={this.props.handleEditFieldsChange}
                                    handleDateChange={this.props.handleDateChange}
                                    updateItem={this.props.updateEditedItem}
                                    handleCancel={this.props.closeEditSection}
                                    />
                                </td>
                            </tr>
                                : null
                            
                        }
                {/*Show rest of the items and skip the one that is being edited.*/}
                    
                        {data && data.map(item => {
                            return this.displayData(item, header);
                            })}      
                        </tbody>
                    </table>
                </div>
        );
    }
}