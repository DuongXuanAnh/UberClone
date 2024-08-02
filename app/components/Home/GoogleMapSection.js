import React, { use, useContext, useEffect } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

const containerStyle = {
  width: '100%',
  height: window.innerHeight
};

const GoogleMapSection = () => {
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  // })

  const {source, setSource} = useContext(SourceContext);
  const {destination, setDestination} = useContext(DestinationContext);

  const[center, setCenter] = React.useState({
    lat: -3.745, lng: -38.523
  })

  const [map, setMap] = React.useState(null)

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
  },[source]);

  useEffect(() => {
      
    if(destination?.length!=[] && map)
    {
      setCenter({
        lat: destination.lat, 
        lng: destination.lng
      })
    }
},[destination]);

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
        <MarkerF position={{lat: source?.lat, lng: source?.lng}} icon={{url:"/circle.png", scaledSize:{width:20, height:20}}}/>
        <MarkerF position={{lat: destination?.lat, lng: destination?.lng}} icon={{url:"/triangle.png", scaledSize:{width:20, height:20}}}/>
        
      </GoogleMap>
  )
}

export default GoogleMapSection