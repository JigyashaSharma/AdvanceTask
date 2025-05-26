import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import { Card, Divider, Icon, Image, Label } from 'semantic-ui-react';
import styles from '../../../../css/TalentTheme.module.css';
import { FaFilePdf, FaLinkedin, FaGithub, FaUser } from 'react-icons/fa';

export default class TalentCardDetail extends React.Component {

    constructor(props) {
        super(props);

        this.displayVideoCard = this.displayVideoCard.bind(this);
        this.displayProfileCard = this.displayProfileCard.bind(this);
        this.handleUrlClicks = this.handleUrlClicks.bind(this);
    }

    displayVideoCard(card) {
        return (
            <div className={`${styles.cardBody}`} >
                <Card.Description className={`${styles.cardDescription}` }>
                    <video
                        width="100%"
                        height= "100%"
                        controls
                    >
                    <source
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                    </video>
                </Card.Description>
            </div>
        );
    }

    displayProfileCard(card) {
        const placeholderImage = "https://samplejigsbucket1.s3.ap-southeast-1.amazonaws.com/placeholderImage.JPG";
        return (
            <div className={`${styles.cardBody}`} >
                <Card.Description className={`${styles.cardDescription}`}>
                <div className={`${styles.cardImageContainer}`}>
                    <Image src={card.photoId ? card.photoId : placeholderImage} className={`${styles.cardImage}`} />
                </div>
                
                    <div className={`${styles.leftMargin}`}>
                        <strong className={`${styles.bottomMargin}`}>Talent Snapshot</strong>
                        <p>CURRENT EMPLOYER</p>
                        <p>{card.currentEmployment}</p>
                        <br />
                        <p>VISA STATUS</p>
                        <p>{card.visa ? card.visa : ''}</p>
                        <br />
                        <p>POSITION</p>
                        <p>{card.position ? card.position : ''}</p>
                    </div>
                </Card.Description>
            </div >
        );
    }

    handleUrlClicks(event, url, account) {
        if (!url) {
            event.preventDefault();
            TalentUtil.notification.show(`Url not yet set, Please set the ${account} url.`, "error", null, null);
        }
    }
    render() {
        const cardDetails = this.props.cardDetails;

        if (!cardDetails || typeof cardDetails !== "object")
        {
            return null;
        }
        let cardClass = `${styles.talentCard} ${styles.bottomMargin}`;

        if (this.props.removingCardId === cardDetails.id) {
            cardClass += ` ${styles.removing}`;
        }

        if (this.props.newCardId === cardDetails.id) {
            cardClass += ` ${styles.new}`;
        }

        return (
            <Card key={this.props.index} fluid className={cardClass}>
                <Card.Content >
                    <Card.Header className={`${styles.cardHeader}` }>
                        {cardDetails.name ? cardDetails.name : ''}
                        <Icon name="star" style={{ marginLeft: 'auto' }} />
                    </Card.Header>
                </Card.Content>
                <Card.Content >
                            {
                                cardDetails.isVideoActive ? this.displayVideoCard(cardDetails)
                                    : this.displayProfileCard(cardDetails)
                            }
                </Card.Content>
                <Card.Content extra>
                    {/* Bottom Icons */}
                    <div className={`${styles.cardContentExtras}`}>
                        {cardDetails.isVideoActive ?
                            <Icon name="user" size="large" color="black" link
                                onClick={() => this.props.handleToggleCardDisplay(cardDetails.id, false)} /> :
                            <Icon name="video" size="large" color="black" link
                                onClick={() => this.props.handleToggleCardDisplay(cardDetails.id, true)} />
                        }
                        <a href="#"
                            target="_self"
                            rel="noopener noreferrer"
                            onClick={(event => this.handleUrlClicks(event, '', "CV"))}
                        >
                            <FaFilePdf size={30} color="black" />
                        </a>
                        <a href={cardDetails.linkedIn || "#"}
                            target={cardDetails.linkedIn ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            onClick={(event) => this.handleUrlClicks(event, cardDetails.linkedIn, "LinkedIn")}
                        >
                            <FaLinkedin size={30} color="black" />
                        </a>
                        <a href={cardDetails.github || "#"}
                            target={cardDetails.github ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            onClick={(event) => this.handleUrlClicks(event, cardDetails.github, "GitHub")}
                        >
                            <FaGithub size={30} color="black" />
                        </a>
                    </div>
                </Card.Content>
                <Card.Content extras>
                    <div className={`${styles.skillsDiv}` }>
                        {cardDetails.skills && cardDetails.skills.length > 0 ? cardDetails.skills.map((skill, index) => (
                            <Label key={index} className={`${styles.skillStyle}`}>{skill}</Label>
                        )) :
                            <Label className={`${styles.skillStyle}`}>Skill Not Added</Label>
                        }
                    </div>
                </Card.Content>
            </Card>
        )
    }
} 