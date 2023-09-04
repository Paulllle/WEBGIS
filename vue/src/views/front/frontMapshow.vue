<template>
  <div id="container">
    <div id="marker" ref="marker" @click="fly(118.0,24.5) "></div>
    <div id="shareItem" v-show="shareShow">
      <h2>景区景点分享</h2>    
      <el-input placeholder="请输入景区名" v-model=" jqMarkerInfo.jqname"></el-input>
      <el-input placeholder="请输入景区图片url" v-model="jqMarkerInfo.jqurl"></el-input>
      <el-input placeholder="请输入景区描述" :autosize="{ minRows: 2, maxRows: 4}" v-model="jqMarkerInfo.jqcontent" ></el-input>
      <h2>经纬度
      </h2>
      <el-input placeholder="景区经度" v-model="this.jqMarkerInfo.lng" disabled></el-input>
      <el-input placeholder="请输入景区纬度" v-model="this.jqMarkerInfo.lat" disabled></el-input>
      <div >
        <el-button @click="share">分享</el-button>
      <el-button  @click="handlecancelClick">取消</el-button>
      </div>
    </div>
      <!-- 之前用了一个容器包着不成功,div改为img对传相片更方便 -->
      <img v-for="item in jqmarker" 
      :key='item.jqid' 
      :id="item.jqid" 
      :ref="item.jqid" class="markeritem" @click=" handleclick(item,item.lng,item.lat) " :src="item.jqurl">
      <el-button id="shareBtn" @click="handleShareClick">分享你的景点</el-button>
    <div id="mapoption">
      <el-select v-model="Dvalue" placeholder="底图切换" @change="mapchange(Dvalue)">
    <el-option
      v-for="item in maplist"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </div>
    <div id="prooption">
      <el-select v-model="value" placeholder="投影切换" @change="projectionchange(value)">
    <el-option
      v-for="item in projectionlist"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </div>
    <div id="map">
    </div>
  </div>
    
  
</template>

<script>

import MapboxLanguage from "@mapbox/mapbox-gl-language";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import geocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export default {
  
  data() {
    return {
      map:null, 
      zooms:null, 
      shareMarkers:[],
      isShow:false,
      popshow:false,
      shareShow:false,
      currentMarker: null,
      jqMarkerInfo:{
        jqname:'',
        jqurl:'',
        jqcontent:'',
        lng:'',
        lat:''
      },
      mapConfig: {
      accessToken:'pk.eyJ1IjoiY2hlbmdjaGFvY2hhbyIsImEiOiJjbGU1aDZ2eWUwMXp4M29udmFnNnNyZjBhIn0.2Kd0ZX06ReEdBnZ9XU4XUA',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom:1,
      center:[118.0,24.5],
      projection:'globe'
      },
      value:'',
      Dvalue:'',
      maplist:[
      {
          label:"streets",
          value:"streets-v12"
      },
      {
          label:"streets2",
          value:"streets-v11"
      },
      {
          label:"dark",
          value:"dark-v11"
      },
      {
          label:"卫星图",
          value:"satellite-streets-v12"
      },
      ],
      projectionlist:[
        {
          label:"globe",
          value:"globe"
        },
        {
          label:"阿伯斯投影",
          value:"albers"
        },
        {
          label:"平等地球投影",
          value:"equalEarth"
        },
        {
          label:"兰勃特等角圆锥投影",
          value:"lambertConformalConic"
        },
        {
          label:"等经纬度投影",
          value:"equirectangular"
        },
      
      ],  
      jqmarker:{}
    }
  },
  methods:{
    projectionchange(value){  
      console.log(this.map)
      this.map.setProjection({
        name:value
      })
    },
    //中继站
    handleclick(data,lng,lat){
      this.fly(lng,lat)
      this.popshow=!this.popshow
      console.log(this.popshow); 
      this.addPop(data,lng,lat)
    },
    handleShareClick(){
      this.isShow=true
    },
    handlecancelClick(){
      this.isShow=false
      this.shareMarkers.length&&this.shareMarkers.forEach(data=>{
        data.remove()
      })   
      this.shareShow=false
      this.shareMarkers.length=0
      this.jqMarkerInfo.jqname=''
      this.jqMarkerInfo.jqurl=''
      this.jqMarkerInfo.jqcontent=''
    },
    share(){     
      if(this.jqMarkerInfo.jqname==null||this.jqMarkerInfo.jqcontent==null){
        this.$message('请检查填写内容！')
      }else{
        console.log("share"+JSON.stringify(this.jqMarkerInfo) );
        this.loadShare();
        this.jqMarkerInfo.jqname=''
      this.jqMarkerInfo.jqurl=''
      this.jqMarkerInfo.jqcontent=''
      }
    },
    loadShare(){
      this.request.post("/jq",this.jqMarkerInfo).then(res=>{
        if(res.data){
          //为了想要用户添加完景区后即时生成marker，先重新获取jqmarker的数据，nextTick是为了等页面挂载，不然后报错jqmarker is not a function
          //之后获取更新完后的jqmarker数组的最后一个对象以及它的jqid,因为动态标签Img绑定的是jqid，传给addmaker的经纬度则由最后对象提供
          this.$message.success("添加成功")             
         this.request.get('/jq/').then(res=>{
           this.jqmarker=res.map(item=>item)
           this.$nextTick().then(() => {
            let lastJqid = this.jqmarker[this.jqmarker.length - 1].jqid;
            let lastJqData = this.jqmarker.find(data => data.jqid === lastJqid);
            console.log(lastJqData)
            let Val = this.$refs[lastJqid][0];
            console.log("这个是获取的标签"+Val)
            console.log("这是最后一位"+lastJqData)
            let lng = lastJqData.lng;
            let lat = lastJqData.lat;   
            console.log(Val+lng+lat)
            this.addMarker(Val,lng,lat) 
           })       
          })
        }else{
          this.$message.error("添加失败")
        }
      })
    }, 
    mapchange(Val){
      this.map.setStyle(`mapbox://styles/mapbox/${Val}`)
    },
    addMarker(Val,lng,lat){
      if (!Val) {
        console.log('jq数据尚未加载');
        return;
      }
      //使用this.$refs来引用组件内的DOM元素
      const item = Val;
     console.log("看看传到了没有"+item.id)
            const marker=new mapboxgl.Marker({
              color:'rgb(153,221,255)',
              scale:1.5,
              element:item
            })
            .setLngLat([lng,lat])
            .addTo(this.map);            
    },
    //点击marker时出现弹窗，用于介绍景点信息
    addPop(data,lng,lat){
      console.log(data)      
        const popup=new mapboxgl.Popup({
              closeOnClick: false,          
            })
            .setLngLat([lng,lat])
            .setHTML(`景区名:${data.jqname}<br>
            景区介绍:${data.jqcontent}<br>
            <img src="${data.jqurl}" style="width:100px;height:100px">
            `)
            .addTo(this.map);                 
    },
    //摄像机，并规定首次厦门的zoom值
    fly(lng,lat){
      if(lng===118.0&&lat===24.5){
        this.map.flyTo({
        center: [lng,lat],
        zoom: 10,    
      })  
      }else{
        this.map.flyTo({
        center: [lng,lat],
        zoom: 15,     
      })
      }
    }
  },
  //布局设置token,确保实例化后马上得到
  created () {
    mapboxgl.accessToken = this.mapConfig.accessToken;
  },
  mounted(){
    //初始化地图,map放入data作为响应数据
    this.map = new mapboxgl.Map({
    container: 'map',
    style: this.mapConfig.style,
    zoom: this.mapConfig.zoom,
    center: this.mapConfig.center,
    accessToken: this.mapConfig.accessToken,
    projection:this.mapConfig.projection
});
//景区数据获取
this.request.get('/jq/').then(res=>{
      console.log(res);
      this.jqmarker=res.map(item=>item)
      console.log(this.jqmarker) 
    })
// 创建MapboxLanguage实例,设地图为中文
  const language = new MapboxLanguage({defaultLanguage: 'zh-Hans' });
  // 将language添加到map对象中作为控件
  this.map.addControl(language);
  //缩放控件
  const nav = new mapboxgl.NavigationControl(
    {
        //是否显示指南针按钮，默认为true
        "showCompass": true,
        //是否显示缩放按钮，默认为true
        "showZoom":true
    }
    );
     //比例尺控件
     const scale = new mapboxgl.ScaleControl({
    unit:'metric|imperial' //默认为公里
})
    //地图搜索插件
    const Mapgeocoder = new geocoder({
      accessToken: mapboxgl.accessToken,
        placeholder: '请输入地址',
        mapboxgl: mapboxgl,
    })  
//地图加载时的加载插件
this.map.on("load",()=>{
    //定位插件
    this.map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            //启动高精度
            enableHighAccuracy: true
        },
        //追踪用户位置
        trackUserLocation: true,
        showUserHeading:true,
    })),
    this.map.addControl(new mapboxgl.FullscreenControl()),
    //缩放控件
    this.map.addControl(nav, 'bottom-right');
    //比例尺控件
    this.map.addControl(scale, 'bottom-left'); 
    //地图搜索插件
    this.map.addControl(Mapgeocoder,'top-right')
    //添加厦门标记
    const xVal=this.$refs.marker
    console.log("这是固定的"+xVal)
    const xmlat=Number(24.6)
    const xmlng=Number(118.09)
    this.addMarker(xVal,xmlng,xmlat)
    //景区标记
    this.jqmarker.forEach(data => {
      let Val = this.$refs[data.jqid][0];
      console.log("这个是获取的标签"+Val)
      let lng = data.lng;
      let lat = data.lat;   
      console.log(Val+lng+lat)
      this.addMarker(Val,lng,lat)   
    });
  })
  
  //设置大气层
  this.map.on("style.load",()=>{
    this.map.setFog({});   
     // 加载厦门的geojson数据
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
        'fill-opacity': 0.7
      }
     }) 
     this.map.addLayer({
      id:'xiamen-outline',
      type:'line',
      source:'xiamen',
      paint:{
        'line-color':'#000',
        'line-width':2,
        'line-opacity':0.5
      }
     })
  })

  })
  //厦门标记:监听地图级别大小变化，当>=10标记消失
  this.map.on('zoom',()=>{
    this.zooms = this.map.getZoom();
    if(this.zooms>=10){
      this.$refs.marker.style.display='none'
      if(this.map.getLayer('xiamen-layer')){
        this.map.removeLayer('xiamen-layer')
      }   
    }else{
      this.$refs.marker.style.display='block'
      //必须加条件，不然嘎嘎报错
      if(!this.map.getLayer('xiamen-layer')){
        this.map.addLayer({
      id:'xiamen-layer',
      type:'fill',
      source:'xiamen',
      paint:{
        'fill-color': 'rgb(37,183,246)',
        'fill-opacity': 0.7
      }
     })
      }
    }
  })
  //监听点击地图事件，标记用
  this.map.on("click",(e)=>{ 
    console.log(e.lngLat)
    if(this.isShow){  
      this.jqMarkerInfo.lng=e.lngLat.lng
      this.jqMarkerInfo.lat=e.lngLat.lat
      console.log(this.jqMarkerInfo)
      const {lngLat}=e
      // 如果当前已经有一个 marker，移除它
      if (this.currentMarker) {
      this.currentMarker.remove();
    }
    let marker =new mapboxgl.Marker({
    color:"red"
    }).setLngLat([lngLat.lng,lngLat.lat])
    .addTo(this.map);
    this.shareMarkers.push(marker);
    console.log(this.shareMarkers)
    this.shareShow=true
    // 将新的 marker 存储到 currentMarker 属性中
    this.currentMarker = marker;
    }
  })
  },
};
</script>


<style>
  .mapboxgl-ctrl-geocoder{
    top: -78px !important;
    left: -370px !important;
  }
</style>

<style scoped>
#container{
  width: 100%;
  height: 85vh;
}
#mapoption{
  width: 150px;
  height: 33px;
  margin: 10px;
  top: 80px;
  overflow: hidden;
  display: flex;
  position: absolute;
  z-index: 5;
}
#prooption{
  position: relative;
  top: 130px;
  width: 150px;
  height: 33px;
  margin: 10px;
  display: flex;
  position: absolute;
  z-index: 5;
}
#map{
  width: 100%;
  height: 100%;
}
#geocoder{
  position: absolute;
  display: flex;
  right: 600px;
  z-index: 6;
}
#marker{        
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-size:cover ;
          background-image: url('http://p9.itc.cn/images01/20230130/982779535d0744398d7dd188077a6122.jpeg');
          z-index:4 ;
        }
        #markercontainer{
          width: 50px;
          height: 50px;
        }
.markeritem{
  width: 50px;
          position: absolute;
          height: 50px; 
          border-radius: 50%;
          background-size:cover ;
          background-image: url('./error.png');
          
}
.mapboxgl-ctrl-top-left {
    left: 370px !important;
    top: 100px !important;
}
#shareBtn{
  position: absolute;
  z-index: 5;
  display: flex;
  top: 175px;
  margin: 10px;
}
#cancelBtn{
  position: absolute;
  z-index: 5;
  display: flex;
  top: 215px;
  
  margin: 10px;
}
#shareItem{  
  position: absolute;
  width: 300px;
  height: 380px;
  background-color:rgba(255, 255, 255,0.8);
  z-index: 10;
  top:305px;
  border-radius: 13px;
  align-items: center;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
}
#shareItem h2{
  color: #000;
}
.el-input {
    width: 230px;
    margin: 10px;
  }

</style>