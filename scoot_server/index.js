const express = require('express');
const bodyParser = require('body-parser');
const app = express();
cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const db = require('./db/db');
const bengkels = db.bengkels;

const port = 3008;

const router = express.Router();

router.get('/closest', function(req, res) {
  const { lat, lng } = req.query;
  const bengkelDists = bengkels.map(bengkel => {
    const dist = distance(lat, lng, bengkel.position.lat, bengkel.position.lng)
    return {
      ...bengkel,
      dist
    };
  }).sort((a, b) => a.dist - b.dist);
  res.json({ list: bengkelDists });
});

app.use('/api', router);

app.listen(port);

// Reference: https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula/27943
function distance(lat1, lon1, lat2, lon2) {
  const p = 0.017453292519943295;    // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

