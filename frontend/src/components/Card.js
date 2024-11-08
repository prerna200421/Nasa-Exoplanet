import React from "react";

const Card = ({ name, meaning, image }) => {
    return (
        <div className="card">
            <img src={image} alt={name} className="card-image" />
            <div className="card-content">
                <h3>{name}</h3>
                <p>{meaning}</p>
            </div>
        </div>
    );
};

export default Card;
