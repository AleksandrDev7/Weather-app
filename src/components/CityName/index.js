import React from "react";

function CityName(props) {
    if (!props.warn) {
        return null;
    }

    return (
        <h2 className="title-name_city">
            Прогноз погоды в городе {props.name}
        </h2>
    );
}

export default CityName;