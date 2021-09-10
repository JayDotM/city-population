import React from 'react'

const City = ({data, onClick}) => {

    return (
        <div className="city" key={data.link} onClick={(e) => onClick(data)}>{data.name}</div>
    )
}

export default City
