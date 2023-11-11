import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Fetch } from 'toolbox/Fetch';

export default function ShelterList({lat=0, lng=0}) {
    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const [nowLat, setLat] = useState(lat)
    const [nowLng, setLng] = useState(lng)

    let state = location.state;
    console.log(state);
    const shelterUri = `http://localhost:8080/shelter/지진-옥외/${nowLat}/${nowLng}/1/40000`;

    useEffect(() => {
        fetch(shelterUri)
        .then(res => res.json())
        .then((data) => setData(data))
        .then(setLoading(false))
        .catch(setError);
    }, [shelterUri]);

    return (
        <table>
            <thead>
                <tr>
                    <th>장소명</th>
                    <th>주소</th>
                    <th>용도</th>
                    <th>displayLV</th>
                </tr>
            </thead>
            <tbody>
                <Fetch uri={shelterUri} renderSuccess={RenderSuccess} />
            </tbody>
        </table>
    );
}

function RenderSuccess(shelterList) {
    return shelterList.map(shelter => (
        <>
            <tr>
                <td>{shelter.name}</td>
                <td>{shelter.addr}</td>
                <td>{shelter.usageType}</td>
                <td>{shelter.displayLevel}</td>
            </tr>
        </>
    ))
}
