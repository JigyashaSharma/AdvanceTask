/* Photo upload section */
import React, { Component } from 'react';
import { FaCameraRetro, FaUpload } from 'react-icons/fa';
import styles from '../../../../css/TalentTheme.module.css';
import Cookies from 'js-cookie';
import { Input } from 'semantic-ui-react';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: null,
            file: null,
            uploading: false, 
        };
        this.fileInputRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    };

    //this will open the file explorer to select the photo
    handleClick() {
        if (this.fileInputRef.current) {
            this.fileInputRef.current.click();
        }
    }
    //Once we select the photo this will be called and It will get the image information
    handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    image: reader.result, file: file
                });
            };
            reader.readAsDataURL(file);
            }
    };

// Handle file upload to the server
    async handleUpload() {

    const { file } = this.state;
    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    var cookies = Cookies.get('talentAuthToken');
    this.setState({ uploading: true });

    const formData = new FormData();
        formData.append('file', file); 

        $.ajax({
            url: `${profileApi}/profile/profile/updateProfilePhoto`,
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + cookies, 
            },
            data: formData,
            contentType: false, 
            processData: false,
            timeout: 0,
            success: function (res) {
                if (res.success === true) {
                    
                    this.setState({
                        uploading: false,
                        image: null,
                        file: null
                    })
                    this.props.loadData();
                    TalentUtil.notification.show(`${this.props.componentId} uploaded successfully`, "success", null, null);
                } else {
                    TalentUtil.notification.show(`${this.props.componentId} did not upload successfully`, "error", null, null);
                }
            }.bind(this),
            error: function (xhr, status, error) {
                this.setState({
                    uploading: false,
                    image: null,
                    file: null
                })
                TalentUtil.notification.show('Error uploading image', "error", null, null);
            }
        });
};
    //this function helps to find what needs to be displayed
    //if no image path then cam icon else image will be displayed.
    renderImageOrCamIcon(image, imagePath) {
        if (image) {
            return null;
        } else if (imagePath) {
            return (
                <img
                src={imagePath}
                alt="Profile"
                style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer' }}
                onClick={this.handleClick}
                />
            );
        } else {
            return (
                <FaCameraRetro
                    size={50}
                    onClick={this.handleClick}
                />
            );
        }
    }
    render() {
        const { image, uploading } = this.state;
        const imagePath = this.props.imageId ? this.props.imageId : null;
        return (
            <div>
            <div className={`ui sixteen wide column ${styles.container}`}>
                <div className={styles.circle}>
                    {this.renderImageOrCamIcon(image, imagePath)}
                <input
                        type="file"
                        ref={this.fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={this.handleFileChange }
                    />
                
                {image && (
                    <div>
                        <img
                            src={this.state.image}
                            alt="Profile"
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                        />
                    </div>
                    )}
                </div>
                </div>
                <div className={`ui sixteen wide column ${styles.container}`}>
                <div>
                    {image &&
                        /* Upload button */ 
                        <button type="button" onClick={this.handleUpload} className="ui black button">
                            <FaUpload
                            className="icon"
                            />
                         Upload
                    </button> 
                    }
                </div>
                </div>
            </div>
        )
    }
}
