import React from 'react';
import { Confirm } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import styles from '../../../../css/TalentTheme.module.css';

export default class CloseConfirmation extends React.Component {
    constructor(props) {
        super(props);

        this.handleCloseCancel = this.handleCloseCancel.bind(this);
        this.handleCloseConfirm = this.handleCloseConfirm.bind(this);
    }

    handleCloseCancel() {
        this.props.closeConfirmDone();
    };

    handleCloseConfirm() {
        this.props.deleteComponentValues(this.props.componentId, this.props.deleteItem);
        this.props.closeConfirmDone(false);
    };

    render() {
        const openValue = this.props.open;
        return (
            <div>
             <Confirm
                    open={openValue}
                    header={`Delete the ${this.props.componentId} item`}
                    content='Are you sure you want to proceed?'
                    onCancel={this.handleCloseCancel}
                    onConfirm={this.handleCloseConfirm}
                    className={styles.confirmPosition }
                />
            </div>
        );
    };
};