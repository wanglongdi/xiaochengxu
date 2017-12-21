// pages/map/map.js
Page({

  data: {
    /*markers: [{
      iconPath: "/images/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#ff0000",
      width: 2,
      dottedLine: true
    }],*/
  },
  markertap(e){
    wx.openLocation({
      latitude: 23.099994,
      longitude: 113.324520
    })
  }

})