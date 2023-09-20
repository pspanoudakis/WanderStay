import React, { useCallback, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Marker as MarkerRefType } from 'leaflet'
import "leaflet/dist/leaflet.css"

const DEFAULT_POSITION = {
  lat: 38.116828199666465, 
  lng: 23.86143414444651
};

type PositionCoordinates = {
  lat: number,
  lng: number,
}

interface MapProps {
  position: PositionCoordinates,
  setPosition?: (pos: PositionCoordinates) => void,
  editable : boolean
}
 
export function MapComponent(props: MapProps){

  const propsPosition: PositionCoordinates = (
    (props.position.lat && props.position.lng) ?
    {...props.position}
    :
    DEFAULT_POSITION
  );
  
  const ZOOM_LEVEL = 13; 
  
  function DraggableMarker() {
    // https://react-leaflet.js.org/docs/example-draggable-marker/

    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef<MarkerRefType | null>(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
           if (props.editable && marker) {
              props.setPosition?.({
                lat: marker.getLatLng().lat,
                lng: marker.getLatLng().lng,
              })
           }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={propsPosition}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? propsPosition.lat.toString() + "," + propsPosition.lng.toString()
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    )
  }
    return(
        <div className='flex flex-col w-full h-96 gap-2 items-start'>
            <MapContainer
                style={{
                  flex: "1 1 0%",
                  zIndex: 10
                }}
                center={[propsPosition.lat, propsPosition.lng]}
                zoom={ZOOM_LEVEL}>
                    <TileLayer 
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {
                        props.editable ?
                        <DraggableMarker/> :
                        <Marker position={[propsPosition.lat, propsPosition.lng]}>
                          <Popup>
                          {propsPosition.lat} , {propsPosition.lng}
                          </Popup>
                        </Marker>
                    }
            </MapContainer>
        </div>
    
    )
}
