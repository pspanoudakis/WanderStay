import React, { useCallback, useMemo, useRef, useState } from 'react'
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import "leaflet/dist/leaflet.css"

interface MapProps{coordinateX: number, coordinateY: number}
export function MapComponent(props: MapProps){
    
    const [center, setCenter] = useState({lat: 13.084622, lng: 80.248357});
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();
    
    
function DraggableMarker() {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
        //   if (marker != null) {
        //     setPosition(marker.getLatLng())
        //   }
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
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    )
  }
    return(
        <div className='flex flex-col w-3/5 gap-2 items-start'>
            <div className='text-xl font-bold'>Τοποθεσία</div>
            <MapContainer
                center={[props.coordinateX, props.coordinateY]}
                zoom={ZOOM_LEVEL}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
                    {/* <Marker position={center}>
                        <Popup>
                        {props.coordinateX} , {props.coordinateY}
                        </Popup>
                    </Marker> */}
                    <DraggableMarker/>
            </MapContainer>
        </div>
    
    )
}