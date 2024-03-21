if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const express = require('express')
const app = express()
const couponRoute = require('./route/CouponRoute')
const methodOverride = require('method-override')
const engine = require('ejs-mate')
const userRoutes = require('./route/user')
const { urlencoded } = require('body-parser')
const passport = require('passport')
const localpassport = require('passport-local')
const User = require('./models/user')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const verifyRoute = require('./route/verify')
const dashboardRoute = require('./route/dashboard')
const cors = require('cors')
const multer = require('multer')
const FormData = require('form-data')
const axios = require('axios')
const upload = multer()
const Patient = require('./models/Patient')
const Hospital = require("./models/Hosp");
const Vs_Stats_2023 = require("./models/Vs_Stats_2023");
const Vs_Stats_2021=require("./models/Vs_Stats_2021")
app.use(
  cors({
    origin: '*',
  }),
)
app.use(express.json())
app.use(bodyParser.json())

var jsonParser = bodyParser.json()

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.engine('ejs', engine)
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))
const dbUrl = process.env.ATLAS
const secret = process.env.SECRET || 'thisshouldbeabettersecret'

const store = new MongoStore({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
})

store.on('error', function (e) {
  console.log('Session Store Error', e)
})



app.use(express.static(__dirname + '/public'))

app.get('/',async(req,res)=>{
  res.send('hi')
})

app.post('/vs_stats', async (req, res) => {
  var data = req.body;
  console.log(data);
  var stats=[]
  var i=0;
  var j=0;
  var k=0
  var ans=[]
  for(i=0;i<req.body.batsmenVisibleCheckboxes.length;i++){
    for(j=0;j<req.body.bowlersVisibleCheckboxes.length;j++){
  ans= await Vs_Stats_2023.find({ batter: req.body.batsmenVisibleCheckboxes[i], bowler: req.body.bowlersVisibleCheckboxes[j]});
stats[k]=ans[0]
k++;
ans=[]
}
console.log(stats)

}
  // console.log(stats)
  res.send(stats);
});
app.post('/vs_stats_2021', async (req, res) => {
  var data = req.body;
  console.log(data);
  var stats=[]
  var i=0;
  var j=0;
  var k=0
  var ans=[]
  for(i=0;i<req.body.batsmenVisibleCheckboxes.length;i++){
    for(j=0;j<req.body.bowlersVisibleCheckboxes.length;j++){
  ans= await Vs_Stats_2021.find({ batsman: req.body.batsmenVisibleCheckboxes[i], bowl: req.body.bowlersVisibleCheckboxes[j]});
stats[k]=ans[0]
k++;
ans=[]
}
console.log(stats)

}
 
  res.send(stats);
});

app.post('/sort_rank',async(req,res)=>{
  
  sahil=req.body.final_stats
  console.log(sahil)
//   var formData={
// "2023_vs_srf":final_stats[0],
// "2021_vs_srf":final_stats[1],
// "2015_ovr_srf":final_stats[2],
// "2023_ovr_srf":final_stats[3],
// 'pred_data':final_stats[4]
//   }
console.log(`formdata:`,sahil)

let batters = {};
batsmans={}
sahil[0].forEach(entry => {
      if (entry.hasOwnProperty('batter')) {
          if (!batters.hasOwnProperty(entry.batter)) {
              batters[entry.batter] = [];
          }
          batters[entry.batter].push(entry.srf_2023);
      }
  });

for(batter in batters){
const srf_2023Values = batters[batter];
srf_2023Values.sort()
srf_2023Values.reverse()
var len=srf_2023Values.length*0.60
len=Math.ceil(len);
var sum=0
for(var i=0;i<len;i++){
sum=sum+batters[batter][i]
}
batters[batter]=sum/len

}
console.log("sahil is an array of array",batters)





sahil[1].forEach(entry => {
if (entry.hasOwnProperty('batsman')) {
if (!batsmans.hasOwnProperty(entry.batsman)) {
  batsmans[entry.batsman] = [];
}
batsmans[entry.batsman].push(entry.srf_2021);
}
});

for(batsman in batsmans){
const srf_2021Values = batsmans[batsman];
srf_2021Values.sort()
srf_2021Values.reverse()
var len=srf_2021Values.length*0.60
len=Math.ceil(len);
var sum=0
for(var i=0;i<len;i++){
sum=sum+batsmans[batsman][i]
}
batsmans[batsman]=sum/len

}








// Point system weights
const weights = {
batters: 0.4,
batsmans: 0.3,
stats2: 0.2,
stats3: 0.1
};

// Calculate points for each player
const points = {};
var i=0
for (const player in batters) {
points[player] = batters[player] * weights.batters + 
           batsmans[player] * weights.batsmans +
           sahil[2][i] * weights.stats2 +
           sahil[3][i] * weights.stats3;
           i++;
}

// Determine the best batsman
let bestBatsman;
let maxPoints = -Infinity;

//   for (const player in points) {
//     if (points[player] > maxPoints) {
//       maxPoints = points[player];
//       bestBatsman = player;
//     }
//   }

console.log("Best batsman:",points);

//   points.sort()
//   points.reverse()

// Convert object to array of key-value pairs
// const rankingArray = Object.entries(points);

// // Sort the array based on the values (second element of each pair)
// rankingArray.sort((a, b) => b[1] - a[1]); // Sort in descending order

// // Reconstruct the sorted object
// const sortedRanking = {};
// rankingArray.forEach(([key, value]) => {
// sortedRanking[key] = value;
// });

console.log("Sorted Ranking:", points);

res.send(points)

}
)

module.exports=app