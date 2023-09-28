let canvas = document.querySelector('#bridge-barchart')
let ctx = canvas.getContext('2d')

// Map Marker Start
let startingCords = [40, -97]  // Array of latitude and longitude
let zoomLevel = 3  // 1 = whole world, 10 = large city, 20 = city blocks

let bridgeData = [
    {
        "name": "Verrazano-Narrows Bridge",
        "span": 1298.4,
        "span_text" : "1298M",
        "city": "New York",
        "location": [40.6066, -74.0447 ]
    },
    {
        "name": "Golden Gate Bridge",
        "span": 1280.2,
        "span_text" : "1280M",
        "city": "San Francisco and Marin",
        "location": [37.8199, -122.4783]
    },
    {
        "name": "Mackinac Bridge",
        "span": 1158.0,
        "span_text" : "1158M",
        "city": "Mackinaw and St Ignace",
        "location": [45.8174, -84.7278]
    },
    {
        "name": "George Washington Bridge",
        "span": 1067.0,
        "span_text" : "1067M",
        "city": "New York and New Jersey",
        "location": [40.8517, -73.9527]
    },
    {
        "name": "Tacoma Narrows Bridge",
        "span": 853.44,
        "span_text" : "853M",
        "city": "Tacoma and Kitsap",
        "location": [47.2690, -122.5517]
    }
]

let bridgeSize = [50, 50]

let bridgeIcon = L.icon({
    iconUrl: 'bridge.png',
    iconSize: bridgeSize
})

let longestBridgeIcon = L.icon({
    iconUrl: 'bridge_Red.png',
    iconSize: bridgeSize
})

// Create the map
let map = L.map('bridge-map').setView(startingCords, zoomLevel)

// Add the tile layer - roads, streets etc. Without this, nothing to see
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',
}).addTo(map)

// Set the longest bridge to the first index of the array, it is unlikely this will be the bridge.
// if this errors out, we have bigger problems.
let longestBridge = bridgeData[0];

// Loop over each of the elements of the array and see if any are bigger bridges.
bridgeData.forEach(bridge => { if(bridge.span > longestBridge.span) longestBridge = bridge });

// Go through every bridge
// Use a ternary operator to check if they're the longest bridge to either use longestBridgeIcon or the regular bridgeIcon icon.
// Add all the bridges to the map.
bridgeData.forEach(bridge => L.marker(bridge.location, {icon: bridge === longestBridge ? longestBridgeIcon : bridgeIcon})
    .bindPopup(`${bridge.name}<br>${bridge.span_text}`)
    .addTo(map))
//Map Marker End

//Bar Charts

let sortedBridges = bridgeData.sort(function(bridge) {bridge.span});

//Not the cleanest way but
//these two arrays will be indexed the same.
let bridgeSpanArray = []
sortedBridges.forEach(bridge => bridgeSpanArray.push(bridge.span))

let bridgeNameArray = []
sortedBridges.forEach(bridge => bridgeNameArray.push(bridge.name))



let chart = new Chart(ctx,
    {
        type: 'bar',
        data: {
            labels: bridgeNameArray,
            datasets: [{
                label: 'Bridge Spans',
                data: bridgeSpanArray
            }]

        }
    })