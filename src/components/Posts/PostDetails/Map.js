import React from 'react';
import MapView, { Marker } from "react-native-maps"
import OpenMap from "react-native-open-maps"

export default function Map(props) {

    console.log(location)
    const { location, height } = props


    const openAppMap = () => {
        OpenMap({
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: 18,
            end: `${location.latitude},${location.longitude}`,
            provider: "google",
            navigate_mode: "preview"
        })
    }

    return (
        <MapView
            style={{ width: "100%", height }}
            initialRegion={location}
            onPress={openAppMap}
        >
            <Marker coordinate={location} />
        </MapView>
    )
}
