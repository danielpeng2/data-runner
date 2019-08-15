const parser = require('xml2js').Parser({ explicitArray : false })

const _RADIUS = 6371 // radius of Earth in km

const _haversineDistance = (prevCoord, curCoord) => {
  const lat1 = parseFloat(prevCoord.lat)
  const lon1 = parseFloat(prevCoord.lon)
  const lat2 = parseFloat(curCoord.lat)
  const lon2 = parseFloat(curCoord.lon)
  const dLat = lat2 - lat1
  const dLon = lon2 - lon1

  var a = Math.sin(_toRad(dLat)/2) * Math.sin(_toRad(dLat)/2) +
          Math.cos(_toRad(lat1)) * Math.cos(_toRad(lat2)) *
          Math.sin(_toRad(dLon)/2) * Math.sin(_toRad(dLon)/2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  var d = _RADIUS * c
  return d
}

const _getActivityDetails = (trk) => {
  const coords = []
  const name = trk.name
  const points = trk.trkseg.trkpt
  let distance = 0
  points.forEach((point, i) => {
    const coord = point['$']
    coords.push(coord)
    if (i === 0) return

    const prevCoord = coords[i - 1]
    distance += _haversineDistance(prevCoord, coord)
  })

  const startTime = new Date(points[0].time)
  const endTime = new Date(points[points.length - 1].time)
  const time = (endTime - startTime) / 1000
  const pace = Math.round(time / distance)

  return {
    coords,
    distance,
    name,
    pace,
    time,
  }
}

const parse = (gpx) => new Promise((resolve, reject) => {
  parser.parseString(gpx, (err, result) => {
    if (err) return reject(err)
    const date = new Date(result.gpx.metadata.time)
    const { coords, distance, name, pace, time } = _getActivityDetails(result.gpx.trk)
    return resolve({
      date,
      coords,
      distance,
      name,
      pace,
      time,
    })
  })
})

const _toRad = (degrees) => degrees * (Math.PI / 180)

module.exports = { parse }
