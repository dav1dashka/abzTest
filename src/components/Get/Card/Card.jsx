import React from "react";
import './Card.scss';
import image from '../../../img/photo-cover.svg';

const Card = (res) => {
    const photo = res.info.photo == "https://frontend-test-assignment-api.abz.agency/images/placeholders/placeholder.png" ? image : res.info.photo;
    return (
        <div key={res.info.id} className="card">
            <div className="card__cover">
                <div className="card__image">
                    <img src={photo} alt="" />
                </div>
                <div className="card__name">
                    <h6>{res.info.name}</h6>
                </div>
                <div className="card__info">
                    <span>{res.info.position}</span>
                    <address>
                        <a href="gmail.com" className="card__contact">{res.info.email}</a>
                        <a href="tel:+380982789024" className="card__contact">{res.info.phone}</a>
                    </address>
                </div>
            </div>
        </div>
    )
};

export default Card;

