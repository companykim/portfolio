import React, { useState, useRef, useEffect } from 'react'
import { GoogleMap, MarkerF, InfoWindow, MarkerClusterer, MarkerClustererF } from '@react-google-maps/api';
import ViewDirections from './Directions';
import ShelterMarkers_google from './ShelterMarkers_google';
import AutoComplete from './AutoComplete';
import {Button} from 'react-bootstrap';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

function MyComponent() {
  const [curPos, setCurPos] = useState(null);
  const [zoomLv, setZoomLv] = useState(10);

  const [value, setValue] = useState([1, 3]);
  const handleChange = (val) => setValue(val);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geolocSuccessHandler, geoLocError); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, []);

  const geolocSuccessHandler = (response) => {
    const { latitude, longitude } = response.coords;
    setCurPos({ latitude, longitude });
  };

  const geoLocError = (err) => {
    console.log("geoLocError = ", err)
  }

    // 마커 선택하기 위함
    const [activeMarker, setActiveMarker] = useState(null);

  // 도착 지점
  const [destPoint, setDestPoint] = useState(null);
  // 토글 기능
  const [swichDirections, setSwichDirections] = useState(false);

  const [placelating, setPlacelating] = useState({});

  const handleActiveMarker = (marker) => {
    setActiveMarker(marker);
};

  const toggleDirections = (e) => {
    e.preventDefault();
    // 만약에 토글이 null이 아니면 활성화, null이면 청소하고 비활성화
    setSwichDirections(!swichDirections)
    setDestPoint(null)
  }

  return (
    <>
      {curPos &&
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: 37.4854799, 
            lng: 126.8981862
            // lat: curPos.latitude,
            // lng: curPos.longitude
          }}
          zoom={zoomLv}
          options={{disableDefaultUI: true, styles: myStyles }}
        >
          {/* // 내 위치 띄우는 마커 */}
          <MarkerF
            position={{
              lat: 37.4854799,
              lng: 126.8981862
            }}
            icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
            onClick={() => handleActiveMarker(0)}
          >
            {activeMarker !== null &&
              <InfoWindow onCloseClick={() => setActiveMarker(null)}
                position={{ 
                  lat: 37.4854799, 
                  lng: 126.8981862
                }}
              >
                <div align="Center">
                  내 위치 <br/>
                </div>
              </InfoWindow>
            }
          </MarkerF>

          {placelating &&
            <MarkerF
              position={{
                lat: placelating.lat,
                lng: placelating.lng
              }}
              icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
            >
            </MarkerF>
          }

          <MarkerClusterer>
            {clusterer =>
              <ShelterMarkers_google center={curPos} zoomLv={zoomLv} scale={50} clusterer={clusterer} setDestPoint={setDestPoint} />

            }
          </MarkerClusterer>

          {/* lat: curPos.latitude, lng: curPos.longitude */}
          {swichDirections && destPoint ?
            <ViewDirections origin={{ lat: 37.4854799, lng: 126.8981862 }} destination={destPoint} />
            : <></>
          }
        </GoogleMap>
      }

      <Button onClick={toggleDirections}>경로탐색</Button>

      <AutoComplete setPlacelating={setPlacelating}/>
    </>
  )
}

export default React.memo(MyComponent)