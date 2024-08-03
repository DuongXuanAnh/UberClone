import React, { use, useContext, useEffect } from 'react'
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

const containerStyle = {
  width: '100%',
  height: window.innerHeight
};

const GoogleMapSection = () => {

  const {source, setSource} = useContext(SourceContext);
  const {destination, setDestination} = useContext(DestinationContext);

  const[center, setCenter] = React.useState({
    lat: -3.745, lng: -38.523
  })

  const [map, setMap] = React.useState(null)

  const [directionRoutePoints, setdirectionRoutePoints] = React.useState([])

  useEffect(() => {
      
      if(source?.length!=[] && map)
      {
        map.panTo({
          lat: source.lat, 
          lng: source.lng
        })

        setCenter({
          lat: source.lat, 
          lng: source.lng
        })
      }

      if(source?.length!=[] && destination?.length!=[]){
        directionRoute();
      }

  },[source]);

  useEffect(() => {
      
    if(destination?.length!=[] && map)
    {
      setCenter({
        lat: destination.lat, 
        lng: destination.lng
      })
    }

    if(source?.length!=[] && destination?.length!=[]){
      directionRoute();
    }

},[destination]);

  const directionRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();
    
    directionsService.route({
        origin: {lat: source?.lat, lng: source?.lng},
        destination: {lat: destination?.lat, lng: destination?.lng},
        travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
        if(status === google.maps.DirectionsStatus.OK){
            setdirectionRoutePoints(result)
        }else{
            console.error(`error fetching directions ${result}`);
        }
    })
  }

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        // options={
        //   {
        //     mapId:'3512780d903007bd'
        //   }
        // }
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <MarkerF position={{lat: source?.lat, lng: source?.lng}} icon={{url:"/circle.png", scaledSize:{width:20, height:20}}}>
            <OverlayView position={{lat: source?.lat, lng: source?.lng}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                <div className='p-2 bg-white inline-block'>
                  <p className='text-black text-[12px]'>{source?.label}</p>
                </div>
            </OverlayView>
        </MarkerF>
        <MarkerF position={{lat: destination?.lat, lng: destination?.lng}} icon={{url:"/triangle.png", scaledSize:{width:20, height:20}}}>
            <OverlayView position={{lat: destination?.lat, lng: destination?.lng}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                <div className='p-2 bg-white inline-block'>
                  <p className='text-black text-[12px]'>{destination?.label}</p>
                </div>
            </OverlayView>
        </MarkerF>
        

      <DirectionsRenderer 
        directions={directionRoutePoints} 
        options={{
          polylineOptions:{
            strokeColor: '#000',
            strokeWeight: 5,
          },
          suppressMarkers: true,
        }}
      />

      </GoogleMap>
  )
}

export default GoogleMapSection