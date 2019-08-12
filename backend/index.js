const fs = require('fs')
const gpxParser = require('./gpx_parser.js')

const data = fs.readFileSync('Carnival_10k.gpx')
const demo = async() => {
  const test = await gpxParser.parse(data.toString())
  console.log(test)
}

demo()
