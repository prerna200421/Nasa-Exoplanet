import React from "react";
import Card from "./Card";

const CardList = ({ exoplanets }) => {
    return (
        <div className="card-list">
            {exoplanets.map((planet, i) => {
                return (
                    <Card
                        key={i}
                        name={planet.name}
                        meaning={planet.meaning}
                        image={planet.image} // Pass the image prop
                    />
                );
            })}
        </div>
    );
};

export default CardList;
