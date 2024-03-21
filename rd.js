let stats = [
    [
        {
            "batter": "Suryakumar Yadav",
            "bowler": "Trent Boult",
            "srf_2023": 0
        },
        {
            "batter": "Suryakumar Yadav",
            "bowler": "Ravichandran Ashwin",
            "srf_2023": 1.1851851851851851
        },
        {
            "batter": "Suryakumar Yadav",
            "bowler": "Yuzvendra Chahal",
            "srf_2023": 0.6356164383561644
        },
        {
            "batter": "Hardik Pandya",
            "bowler": "Trent Boult",
            "srf_2023": 1.3266666666666667
        },
        {
            "batter": "Hardik Pandya",
            "bowler": "Ravichandran Ashwin",
            "srf_2023": 1.5254901960784315
        },
        {
            "batter": "Hardik Pandya",
            "bowler": "Yuzvendra Chahal",
            "srf_2023": 0.47623762376237627
        }
    ],
    [
        {
            "batsman": "Suryakumar Yadav",
            "bowler": "Trent Boult",
            "srf_2021": 1.699998982143039
        },
        {
            "batsman": "Suryakumar Yadav",
            "bowler": "Ravichandran Ashwin",
            "srf_2021": 2.686971235279188
        },
        {
            "batsman": "Suryakumar Yadav",
            "bowler": "Yuzvendra Chahal",
            "srf_2021": 0.7310476657866206
        },
        {
            "batsman": "Hardik Pandya",
            "bowler": "Trent Boult",
            "srf_2021": 0.7697354497354498
        },
        {
            "batsman": "Hardik Pandya",
            "bowler": "Ravichandran Ashwin",
            "srf_2021": 2.5705546964901704
        },
        {
            "batsman": "Hardik Pandya",
            "bowler": "Yuzvendra Chahal",
            "srf_2021": 0.3522561863173217
        }
    ],
    [
        0.7748191837537153,
        1.391496623162212
    ],
    [
        0.5541025986693418,
        1.541666666666667
    ],
    {
        "message": [
            95.10814937315365
        ],
        "required_srf": 1.4096846028418357,
        "stats": [
            94.5,
            10.5,
            2,
            5,
            7,
            12.5,
            56
        ]
    }
];

let batters = {};
batsmans={}
stats[0].forEach(entry => {
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





stats[1].forEach(entry => {
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


console.log(batters,batsmans,stats[2],stats[3])



  
  // Point system weights
  const weights = {
    batters: 0.4,
    batsmans: 0.3,
    stats2: 0.2,
    stats3: 0.1
  };
  
  // Calculate points for each player
  const points = {};
  
  for (const player in batters) {
    points[player] = batters[player] * weights.batters + 
                     batsmans[player] * weights.batsmans +
                     stats[2][0] * weights.stats2 +
                     stats[3][0] * weights.stats3;
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
  for(p in points){
    points[p]=points[p]/stats[4].required_srf
  }
//   points.sort()
//   points.reverse()
const ranking = {
    'Suryakumar Yadav': 0.8743657634157863,
    'Hardik Pandya': 0.9093161608748601
  };
  
  // Convert object to array of key-value pairs
  const rankingArray = Object.entries(ranking);
  
  // Sort the array based on the values (second element of each pair)
  rankingArray.sort((a, b) => b[1] - a[1]); // Sort in descending order
  
  // Reconstruct the sorted object
  const sortedRanking = {};
  rankingArray.forEach(([key, value]) => {
    sortedRanking[key] = value;
  });
  
  console.log("Sorted Ranking:", sortedRanking);
  

  





// stats.forEach(stat => {
//     if (Array.isArray(stat)) {
//         stat.forEach(entry => {
//             if (entry.hasOwnProperty('batter')) {
//                 if (!batters.hasOwnProperty(entry.batter)) {
//                     batters[entry.batter] = [];
//                 }
//                 batters[entry.batter].push(entry.srf_2023);
//             }
//         });
//     }
// });

// // Calculate average srf_2023 for each batter
// for (const batter in batters) {
//     const srf_2023Values = batters[batter];
//     const total = srf_2023Values.reduce((acc, val) => acc + val, 0);
//     const average = total / srf_2023Values.length;
//     console.log(`${batter}: ${average}`);
// }
