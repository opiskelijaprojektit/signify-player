// Import and initialize express framework.
import express from 'express'
const app = express()

// Import and configure dotenv.
import dotenv from 'dotenv'
dotenv.config();

// Import the needed filesystem and path modules.
import fs from 'fs'
import path from 'path'
const __dirname = import.meta.dirname;

// Import hash calculation function.
import { calculateHash } from './functions.js'

// Store the server port from environment variables.
const port = process.env.SERVER_PORT

// Load the information needed for the responses from the disk.
// Allows you to update the response data without restarting the server.
function loadData() {
  const data = fs.readFileSync(path.join(__dirname, 'data.json'))
  const parsedData = JSON.parse(data)
  return parsedData 
}

// Extract the JSON data in the request and store it in the req.body.
app.use(express.json())

// Serves all static files found in media folder.
app.use('/media', express.static(path.join(__dirname, 'media')))

// Add cors headers to the responses.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-API-key")
  next()
})

// Log all requests to the console.
app.all('/*', function(req, res, next) {
  console.log(req.method + " request to url " + req.url)
  next()
})

// Handle the device register.
app.post('/register', (req, res) => {
  const data = loadData()
  res.json({tag: data.tag, token: data.token, width: req.body.width, height: req.body.height})
})

// Handle the device state check.
app.post('/check', (req, res) => {
  const data = loadData()
  if (data.state == "1") {
    res.json({state: "1"})
  } else if (data.state == "2") {
    res.json({state: "2", name: data.name, descr: data.descr, width: req.body.width, height: req.body.height})
  }
})

// Handle the request of scenes.
app.get('/scenes', (req, res) => {
  const data = loadData()
  const hash = calculateHash(JSON.stringify(data.scenes))
  res.json({hash: hash, updated: data.updated, scenes: data.scenes, version: process.env.VITE_APP_VERSION})
})

app.get('/scene-vulnerability', async (req, res) => {
  const response = await fetch("https://www.kyberturvallisuuskeskus.fi/sites/default/files/rss/vulns.xml",
    {
      method: 'GET'
    }
  )
  const result = await response.text()
  res.type('application/xml')
  res.send(result)
})

// TimeLeft-näkymälle tarvittava data
app.use("/media", express.static("media"));
app.get('/timeleft', (req, res) => {
  const data = loadData();
  const scene = data.scenes.find(s => s.type === "timeleft");

  if (scene) {
    res.json(scene.data);
  } else {
    res.status(404).json({ error: "Virhe! Timeleft scene ei löytynyt" });
  }
});



// Wrong endpoint in request.
app.all('*', (req, res) => {
  res.send('Endpoint ' + req.url + ' not found!');
});

// Start the server.
app.listen(port, () => {
  console.log(`API test server listening on port ${port}`)
})