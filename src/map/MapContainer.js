import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Button from 'react-bootstrap/Button';

const MapContainer = () => {
    const { kakao } = window;
    const [address, setAddress] = useState(null); // 현재 좌표의 주소를 저장할 상태
    const [location, setLoacation] = useState(null); // 현재 위치를 저장할 상태

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
    }, []);

    const successHandler = (response) => {
        console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
        const { latitude, longitude } = response.coords;
        setLoacation({ latitude, longitude });
    };

    const errorHandler = (error) => {
        console.log(error);
    };

    const getAddress = (lat, lng) => {
        const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
        const coord = new kakao.maps.LatLng(location.latitude, location.longitude); // 주소로 변환할 좌표 입력
        const callback = function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                setAddress(result[0].address);
            }
        };
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    };

    return (
        <>
            {location && (
                <Map
                    center={{ lat: location.latitude, lng: location.longitude }}
                    style={{ width: '1000px', height: '600px' }}
                    level={3}
                >
                    <MapMarker
                        position={{
                            lat: location.latitude,
                            lng: location.longitude
                        }}
                    >   
                        <div style={{ padding: "10px", color: "#000" }}>
                            내 위치
                        </div>
                    </MapMarker>
                    <Button onClick={getAddress}>현재 주소</Button>
                </Map>
            )}

            {address && (
                <div>
                    현재 좌표의 주소는..
                    <p>address_name: {address.address_name}</p>
                </div>
            )}
        </>
    );
};
export default MapContainer;