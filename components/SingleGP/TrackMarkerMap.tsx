import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import InViewPort from "@coffeebeanslabs/react-native-inviewport";

export default function TrackMarkerMap(props: { lat: string, long: string, mapRef: React.MutableRefObject<null> }) {

    const [mapReady, setMapReady] = useState<boolean>(false);
    const [inViewPort, setInViewPort] = useState<boolean>(false);
    const [moveOnFocus, setMoveOnFocus] = useState<boolean>(true);

    function moveToMarker() {
        if (props.mapRef.current) props.mapRef.current.animateToRegion({
            latitude: Number(props.lat),
            longitude: Number(props.long),
            latitudeDelta: .02,
            longitudeDelta: .02,
        }, 400)
    }
    
    useEffect(() => {
        if (inViewPort && moveOnFocus) {
            moveToMarker()    
            setMoveOnFocus(false)
        }
        if (!inViewPort) {
            setMoveOnFocus(true)
        }
    }, [inViewPort])
    

    return (
        <InViewPort onChange={setInViewPort}>
            <MapView
            style={{ width: Dimensions.get('window').width, height: 300 }}
            ref={props.mapRef}
            initialRegion={{
              latitude: 52.0786,
              longitude: -1.01694,
              latitudeDelta: .02,
                longitudeDelta: .02,
            }}        
            onMapReady={() => setMapReady(true)}>
                { mapReady && <Marker coordinate={{ latitude: Number(props.lat), longitude: Number(props.long)}} />}
            </MapView>
        </InViewPort>
    )
}