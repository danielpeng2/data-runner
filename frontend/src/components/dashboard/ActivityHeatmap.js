import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer'
import 'leaflet/dist/leaflet.css'

const ActivityHeatmap = ({ center, coords }) => (
  <div style={{ height: '500px', width: '800px' }}>
    <LeafletMap 
      center={[center.lat, center.lon]}
      zoom={12} 
    >
      <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={coords}
        latitudeExtractor={(coord) => coord.lat}
        longitudeExtractor={(coord) => coord.lon}
        intensityExtractor={(coord) => 3} />
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
    </LeafletMap>
  </div>
)

export default ActivityHeatmap
