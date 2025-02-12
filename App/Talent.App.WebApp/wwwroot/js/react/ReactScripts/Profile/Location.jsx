import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import styles from '../../../../css/TalentTheme.module.css';

const requiredKeysAddress = ["number", "street", "suburb", "country", "city", "postCode"];
export class Address extends React.Component {
    constructor(props) {
        super(props)

        this.state= {
            showEditSection: false,
            currentAddress: this.props.addressData
        }
        this.renderDisplay = this.renderDisplay.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
    }

    componentDidMount() {
        /*this.setState(
            {
                currentAddress: this.props.addressData
            }
        )*/

    }
    componentDidUpdate(prevProps) {
        if (prevProps.addressData !== this.props.addressData) {
            this.setState(
            {
                    currentAddress: this.props.addressData
            })
        }
    }
    handleEdit() {
        this.setState({
            showEditSection: true
        })
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.currentAddress)
        //const data = Object.assign({}, this.props.linkedAccounts)
        data[event.target.name] = event.target.value
        if (event.target.name === "country") {
            data.city = '';
        }
        this.setState({
            currentAddress: data
        })
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    saveAddress() {
        if (!this.props.validateFunc(this.state.currentAddress, requiredKeysAddress)) {
            return;
        }
        let data = Object.assign({}, this.state.currentAddress);
        this.props.saveProfileData(this.props.componentId, data);
        this.closeEdit()
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit() {
        let countriesOptions = [];
        let citiesOptions = [];
        const selectedCountry = this.state.currentAddress.country;
        const selectedCity = this.state.currentAddress.city;

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            let popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions = <span><select
                className="ui dropdown"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select a town or city</option>
                {popCities}
            </select><br /></span>
        }

        return (
            <div className="ui form">
            <div className="ui row">
                <div className='ui sixteen wide column'>
                    <div className="ui grid">
                            <div className={`ui row ${styles.topMargin}`}>
                            <div className='ui four wide column field'>
                                <ChildSingleInput
                                    inputType="text"
                                    label="Number"
                                    name="number"
                                    value={this.state.currentAddress.number || ''}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Enter House No"
                                    errorMessage="Please enter a valid houseNumber"
                                />
                            </div>
                            <div className='ui seven wide column field'>
                                <ChildSingleInput
                                    inputType="text"
                                    label="Street"
                                    name="street"
                                    value={this.state.currentAddress.street || ''}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Enter Street"
                                    errorMessage="Please enter a valid street"
                                />
                            </div>
                            <div className='ui five wide column field'>
                                <ChildSingleInput
                                    inputType="text"
                                    label="Suburb"
                                    name="suburb"
                                    value={this.state.currentAddress.suburb || ''}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Enter Suburb"
                                    errorMessage="Please enter a valid suburb"
                                />
                            </div>
                        </div>
                        <div className="ui row">
                            <div className='ui seven wide column field'>
                                <label>Country</label>
                                <select className="ui right labeled dropdown"
                                    placeholder="Country"
                                    value={selectedCountry}
                                    onChange={this.handleChange}
                                    name="country"
                                    className={styles.dropdown}
                                >

                                    <option value="">Select your Country</option>
                                    {countriesOptions}
                                    </select>
                                </div>
                            <div className='ui six wide column field'>
                                <label>City</label>
                                {citiesOptions}
                            </div>
                            <div className='ui three wide column'>
                                <ChildSingleInput
                                    inputType="text"
                                    label="Post Code"
                                    name="postCode"
                                    value={this.state.currentAddress.postCode || ''}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Enter"
                                    errorMessage="Please enter a valid postcode"
                                />
                            </div>
                            </div>
                            <div className={`ui row ${styles.bottomMargin} ${styles.leftMargin}`}>
                                <button type="button" className="ui black button" onClick={this.saveAddress}>Save</button>
                            <button type="button" className="ui grey button" onClick={this.closeEdit}>Cancel</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }

    renderDisplay() { 
        const country = this.props.addressData.country;
        const city = this.props.addressData.city;
        //let address = '';
        /*if (this.props.addressData.number || this.props.addressData.street || this.props.addressData.suburb || this.props.addressData.postCode) {
            address = `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.postCode}`;
        }*/
        const address = (this.props.addressData.number ? this.props.addressData.number : '') +
                  (this.props.addressData.street ? `, ${this.props.addressData.street}` : '') +
                  (this.props.addressData.suburb ? `, ${this.props.addressData.suburb}` : '') +
                  (this.props.addressData.postCode ? `, ${this.props.addressData.postCode}` : '');
        
        return (
            <div className="row">
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {address}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated black button" onClick={this.handleEdit}>Edit</button>
                </div>
            </div>
        );
    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const data = { nationality: event.target.value };

        this.props.saveProfileData(data);
    }
    render() {
        const selectedCountry = this.props.nationalityData;
        const countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        return (
            <div className='row'>
                <div className="ui six wide column">
                    <select className="ui right labeled dropdown"
                    placeholder="Country"
                    value={selectedCountry}
                    onChange={this.handleChange}
                    name="nationality">

                    <option value="">Select your nationality</option>
                    {countriesOptions}
                    </select>
                </div>
            </div>
        )
        
    }
}