<template>
  <div id="container">
    <div id="map"
></div>
  </div>

</template>

<script>
import {defineComponent} from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import {Scene,LayerSwitch ,MouseLocation,PointLayer,LayerPopup,CityBuildingLayer}from'@antv/l7'
import {Mapbox} from '@antv/l7-maps'
export default defineComponent({
  name: "FrontMapcount",
  data(){
    return{
      map:null,
      scene:null,
      builddata:{},
      mapConfig: {
      accessToken:'pk.eyJ1IjoiY2hlbmdjaGFvY2hhbyIsImEiOiJjbGU1aDZ2eWUwMXp4M29udmFnNnNyZjBhIn0.2Kd0ZX06ReEdBnZ9XU4XUA',
      style: 'mapbox://styles/mapbox/dark-v11',
      zoom:10,
      center:[118.0,24.5],
      projection:'globe'
      },
      popdata:[
        {
          "id": "1",
        "name": "湖里区",
        "longitude": 118.13928414844332,
        "latitude": 24.52319164129547,
        "population": 99.6,
        "count": 2
        },
        {
          "id": "2",
        "name": "海沧区",
        "longitude": 118.00905583122454,
        "latitude": 24.490341091670444,
        "population": 62.0,
        "count": 2
        },
        {
          "id": "3",
        "name": "同安区",
        "longitude": 118.14776640745396,
        "latitude": 24.72475288088887,
        "population": 89.2,
        "count": 2
        },
        {
          "id": "4",
        "name": "思明区",
        "longitude": 118.12915456413123,
        "latitude": 24.4624967745376,
        "population": 106.4,
        "count": 2
        },
        {
          "id": "5",
        "name": "集美区",
        "longitude": 118.07089600965281,
        "latitude": 24.6022273617112,
        "population": 109.1,
        "count": 2
        },
        {
          "id": "6",
        "name": "翔安区",
        "longitude": 118.24590346002844,
        "latitude": 24.623654696212725,
        "population": 64.5,
        "count": 2
        },
      ]
    }
  },
  created () {
    mapboxgl.accessToken = this.mapConfig.accessToken;
   
  },
  mounted(){
    this.map=new mapboxgl.Map({
    container: 'map',
    style: this.mapConfig.style,
    zoom: this.mapConfig.zoom,
    center: this.mapConfig.center,
    accessToken: this.mapConfig.accessToken,
    projection:this.mapConfig.projection
  })

  this.scene=new Scene({
    id:'map',
    map:new Mapbox({
      mapInstance:this.map
    }),
    logoVisible:false
  })
  this.scene.on('loaded', () => {
    //  mouseLocation
    const mouseLocation = new MouseLocation({
      transform: (position) => {
        return position.map((item) => item.toFixed(4));
      },
    });
    this.scene.addControl(mouseLocation);
    //数据柱状分析图
    const pointLayer = new PointLayer({
      name: '常驻人口柱状图',
    })
    .source(this.popdata, {
      parser: {
        type: 'json',
        x: 'longitude',
        y: 'latitude'
      }
    }) .shape('name', [ 'cylinder', 'triangleColumn', 'hexagonColumn', 'squareColumn' ])
    .color('name', [ '#739DFF', '#61FCBF', '#FFDE74', '#FF896F' ])
    .size('population', h => [ 6, 6, h  ] )
    .active({
      color: "#fff",
      mix: 0.8,
  })
    this.scene.addLayer(pointLayer);
    //气泡框
    const layerPopup = new LayerPopup({
    items: [
      {
        layer: pointLayer,
        fields: [
          {
            field: 'name',
            formatField: () => '地区名',
          },
          {
            field: 'population',
            formatField: () => `常住人口数(万)`,
            formatValue: (val) => val.toFixed(2),
          },]
      },
    ],
    trigger: 'hover',
  });
  this.scene.addPopup(layerPopup)
    //图层显影,之所以要放在fetch里面是因为在vue中fetch通常最后加载的，放外面layerswitch会出现xiamenbuild没有值的问题
    const layerSwitch = new LayerSwitch({
    layers: [pointLayer],
  });
  this.scene.addControl(layerSwitch); 
  //城市建筑展示
  fetch('/厦门.json').then(res=>res.json()).then(data=>{
    const xiamenbuild = new CityBuildingLayer({
        zIndex: 0,
        name:'厦门市城市数据'
      })
      .size('Floor', [ 20, 500 ])
      .active(true)
      .animate({
      enable: true
    })
      .style({
      opacity: 0.7,
      baseColor: 'rgb(16, 16, 16)',
      windowColor: 'rgb(30, 60, 89)',
      brightColor: 'rgb(255, 176, 38)',
      sweep: {
        enable: true,
        sweepRadius: 3,
        sweepColor: '#1990FF',
        sweepSpeed: 0.5,
        sweepCenter: [ 118.0,24.5 ]
      }
    })
      .filter('Floor',h=>h > 10);
      xiamenbuild.source(data);
      this.scene.addLayer(xiamenbuild);
    
  })
   
});
this.map.on("style.load",()=>{
  //加载厦门市geojson
  fetch('/厦门市.json').then(res=>res.json()).then(data=>{
    console.log(data);
    this.map.addSource('xiamen',{
      type:'geojson',
      data:data
     }) 
     this.map.addLayer({
      id:'xiamen-layer',
      type:'fill',
      source:'xiamen',
      paint:{
        'fill-color': 'rgb(37,183,246)',
        'fill-opacity': 0.4
      }
     }) 
     this.map.addLayer({
      id:'xiamen-outline',
      type:'line',
      source:'xiamen',
      paint:{
        'line-color':'red',
        'line-width':2,
        'line-opacity':0.5
      }
     })
  })
  
    
})
//mapbox地图汉化包
  const language = new MapboxLanguage({defaultLanguage: 'zh-Hans' });
  this.map.addControl(language);
  
  }
  
})
</script>

<style scoped>
#container{
  width: 100%;
  height: 85vh;
}
#map{
  height: 100%;
  width: 100%;
}
</style>