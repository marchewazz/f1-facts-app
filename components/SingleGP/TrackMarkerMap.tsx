import { useRef } from 'react';
import MapView from "react-native-maps";


export default function TrackMarkerMap(props: { lat: string, long: string }) {

    const mapRef = useRef(null);
    
    function animateToMarker(){
        setTimeout(() => {
            if (mapRef.current) mapRef.current.animateToRegion({
                latitude: Number(props.lat),
                longitude: Number(props.long),
                latitudeDelta: .01,
                longitudeDelta: .01,
              }, 3000)
        }, 500);
        
    }

    return (
        <MapView
        style={{width: "80%", height: 200, borderRadius: 2 }}
        ref={mapRef}
        initialRegion={{
          latitude: 52.0786,
          longitude: -1.01694,
          latitudeDelta: .01,
        longitudeDelta: .01,
        }}        
        onMapReady={animateToMarker} />
    )
}