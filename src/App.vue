<template>
  <div id="app" style="overflow:hidden">
    <div>
<!--         <vue-particles-->
<!--        color="#ffffff"-->
<!--        :particleOpacity="0.7"-->
<!--        linesColor="#ffffff"-->
<!--        :particlesNumber="80"-->
<!--        shapeType="circle"-->
<!--        :particleSize="5"-->
<!--        :linesWidth="2"-->
<!--        :lineLinked="true"-->
<!--        :lineOpacity="0.4"-->
<!--        :linesDistance="150"-->
<!--        :moveSpeed="3"-->
<!--        :hoverEffect="true"-->
<!--        hoverMode="grab"-->
<!--        :clickEffect="true"-->
<!--        clickMode="push"-->
<!--      >-->
<!--      </vue-particles>-->
      <div class="border1" style="position: absolute;">
        <h1 class="title" style="position: relative;">Comment System</h1>
      </div>
      <div class="border2" style="position: absolute;">
        <dv-capsule-chart :config="config"
                          style="width:300px;height:200px;position:relative;"/>
      </div>
      <div class="border3" style="position: absolute;">
        <div>
        <div id="train" class="train" style="position: absolute;">
            <el-button type="" class="btn" icon = "el-icon-upload"
                       style="position: relative;" v-on:click="clickLoad"></el-button>
            <input type="file" id="files" ref="refFile" style="display: none "
               multiple="multiple" v-on:change="fileLoad" >
          <el-tooltip effect="light" class="question"
                        content="请同时上传训练文件和训练结果文件，均为txt格式"
                        placement="right-start" style="position: relative;">
              <i class="el-icon-question" />
            </el-tooltip>
        <p class = "uploadText" style="position: relative;" >TrainNewModel</p>
      </div>
      <div id="predict" class="predict" style="position: absolute;">
            <el-button type="" class="btn2" icon="el-icon-search" v-on:click="clickLoadpre"
                       style="position: relative"></el-button>
             <input type="file" id="files2" ref="refFile2" style="display: none "
                    v-on:change="prefileLoad" >
            <el-tooltip effect="light" class="question2" style="position: relative;"
                        content="请直接上传预测集，为txt格式" placement="right-start">
              <i class="el-icon-question" />
            </el-tooltip>
        <p class = "predictModel" style="position: relative;" >predictModel</p>
      </div>
      <div id="update" class="update" style="position: absolute;">
          <el-button type="" class="btn3" icon="el-icon-edit" v-on:click="clickLoadupdate"
                       style="position: relative;"></el-button>
             <input type="file" id="files3" ref="refFile3" style="display: none "
                    v-on:change="updatefileLoad" >
              <el-tooltip effect="light" class="question3" style="position: relative;"
                        content="请直接上传新训练集，分为训练因子和结果，均为txt格式" placement="right-start">
              <i class="el-icon-question" />
            </el-tooltip>
        <p class = "updateModel" style="position: relative;" >updateModel</p>
      </div>
      </div>
      </div>
      <div class="border4" style="position: absolute;">
        <dv-charts :option="option" />
      </div>
      <div class="border5" style="position: absolute;">
        <i class="el-icon-document" style="position: relative;font-size:3rem;
                                           margin-left:-240px;margin-top: 10px"/>
        <p class="download" style="position: relative;" >download results</p>
        <a href="#" v-on:click="downloadfile">下载文件</a>
      </div>
      <div class="border6" style="position: absolute;">
      </div>
       </div>
  </div>
</template>

<script>
import Ping from './components/Ping';
// eslint-disable-next-line import/first
import axios from 'axios';
// eslint-disable-next-line import/first
import { Loading } from 'element-ui';

export default {
  name: 'App',
  components: {
    Ping,
  },
  data() {
    return {
      config: {
      },
      option: {

      },
    };
  },
  methods: {
    initgraph() {
      this.config = {
        data: [
          {
            name: '南阳',
            value: 167,
          },
          {
            name: '周口',
            value: 67,
          },
          {
            name: '漯河',
            value: 123,
          },
        ],
        colors: ['#e062ae', '#fb7293', '#e690d1'],
      };
      this.option = {
        title: {
          text: '周销售额趋势',
        },
        legend: {
          data: ['系列A', '系列B', '系列C'],
        },
        xAxis: {
          name: '第一周',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
          name: '销售额',
          data: 'value',
        },
        series: [
          {
            name: '系列A',
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: 'line',
            stack: 'a',
            fill: {
              show: true,
            },
          },
          {
            name: '系列B',
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: 'line',
            stack: 'a',
            smooth: true,
          },
          {
            name: '系列C',
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: 'line',
            stack: 'a',
            lineStyle: {
              lineDash: [5, 5],
            },
          },
        ],
      };
    },
    getMessage() {
      const that = this;
      // 对应 Python 提供的接口，这里的地址填写下面服务器运行的地址，本地则为127.0.0.1，外网则为 your_ip_address
      const path = 'http://127.0.0.1:5000/app';
      axios.get(path).then((response) => {
        // 这里服务器返回的 response 为一个 json object，可通过如下方法需要转成 json 字符串
        // 可以直接通过 response.data 取key-value
        // 坑一：这里不能直接使用 this 指针，不然找不到对象
        const msg = response.data.msg;
        // 坑二：这里直接按类型解析，若再通过 JSON.stringify(msg) 转，会得到带双引号的字串
        that.serverResponse = msg;

        window.console.log(`Success ${response.status}, ${response.data}, ${msg}`);
      }).catch((error) => {
        window.console.log(`Error${error}`);
      });
    },
    clickLoad(evt) {
      this.$refs.refFile.dispatchEvent(new MouseEvent('click'));
      let target = evt.target;
      if (target.nodeName === 'SPAN') {
        target = evt.target.parentNode;
      }
      target.blur();
    },
    fileLoad() {
      const trainFile = this.$refs.refFile.files[1];
      const resultFile = this.$refs.refFile.files[0];
      const reader = new FileReader();
      reader.readAsText(trainFile);
      // eslint-disable-next-line func-names
      reader.onload = function () {
        window.console.log(this.result);
      };
      const param = new FormData();
      param.append('type', 'train');
      param.append('filetrain', trainFile);
      param.append('fileresult', resultFile);
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const loading = Loading.service({
        lock: true,
        text: 'Training',
        spinner: 'el-icon-loading',
        background: 'rgba(255,255,255,0.85)',
      });
      axios.post('http://127.0.0.1:5000/app', param, config).then((response) => {
        window.console.log(`Success ${response.status}, ${response.data} `);
        const msg = response.data;
        if (msg.type === 'modelfinish') {
          loading.close();
        }
      }).catch((error) => {
        window.console.log(`Error${error}`);
      });
    },
    clickLoadpre(evtpre) {
      this.$refs.refFile2.dispatchEvent(new MouseEvent('click'));
      let target = evtpre.target;
      if (target.nodeName === 'SPAN') {
        target = evtpre.target.parentNode;
      }
      target.blur();
    },
    prefileLoad() {
      const preFile = this.$refs.refFile2.files[0];
      const reader = new FileReader();
      reader.readAsText(preFile);
      // eslint-disable-next-line func-names
      reader.onload = function () {
        window.console.log(this.result);
      };
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const param = new FormData();
      param.append('type', 'predict');
      param.append('filepre', preFile);
      const loading = Loading.service({
        lock: true,
        text: 'predicting',
        spinner: 'el-icon-loading',
        background: 'rgba(255,255,255,0.85)',
      });
      axios.post('http://127.0.0.1:5000/app', param, config).then((response) => {
        window.console.log(response.data);
        const msg = response.data;
        if (msg === 'resultfinish') {
          loading.close();
        }
      }).catch((error) => {
        window.console.log(`Error${error}`);
      });
    },

    clickLoadupdate(evtpre) {
      this.$refs.refFile3.dispatchEvent(new MouseEvent('click'));
      let target = evtpre.target;
      if (target.nodeName === 'SPAN') {
        target = evtpre.target.parentNode;
      }
      target.blur();
    },

    updatefileLoad() {
      const trainFile = this.$refs.refFile3.files[1];
      const resultFile = this.$refs.refFile3.files[0];
      const reader = new FileReader();
      reader.readAsText(trainFile);
      // eslint-disable-next-line func-names
      reader.onload = function () {
        window.console.log(this.result);
      };
      const param = new FormData();
      param.append('type', 'update');
      param.append('updatefiletrain', trainFile);
      param.append('updatefileresult', resultFile);
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const loading = Loading.service({
        lock: true,
        text: 'Updatng',
        spinner: 'el-icon-loading',
        background: 'rgba(255,255,255,0.85)',
      });
      axios.post('http://127.0.0.1:5000/app', param, config).then((response) => {
        window.console.log(`Success ${response.status}, ${response.data} `);
        const msg = response.data;
        if (msg === 'updatefinish') {
          loading.close();
        }
      }).catch((error) => {
        window.console.log(`Error${error}`);
      });
    },
    downloadfile() {
      const self = this;
      const filename = 'train_data.txt';
      // formData 为upload必须对象，默认接收的对象值
      // eslint-disable-next-line
      const formData = new FormData();
      formData.append('type', 'downloadFile');
      formData.append('filename', filename);
      axios
        .post('http://127.0.0.1:5000/app', formData, {
          responseType: 'blob',
          headers: {
            'data-type': 'Buffer',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res) {
            // eslint-disable-next-line
            const blob = new Blob([res.data]);
            // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
            // IE10以上支持blob但是依然不支持download
            if ('download' in document.createElement('a')) {
              // 支持a标签download的浏览器
              const link = document.createElement('a');// 创建a标签
              link.download = filename;// a标签添加属性
              link.style.display = 'none';
              link.href = URL.createObjectURL(blob);
              document.body.appendChild(link);
              link.click();// 执行下载
              URL.revokeObjectURL(link.href); // 释放url
              document.body.removeChild(link);// 释放标签
            } else {
              navigator.msSaveBlob(blob, filename);
            }
          } else {
            self.$message.warning('转化word文件失败，请检查文件并且重试！');
          }
        });
    },
  },
  mounted() {
    this.initgraph();
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#particles-js {
    background-image: url("./assets/sky.jpg");
    background-size: cover;
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: hidden;
    z-index:0;
  }
.border1 {
  margin-left: 410px;
  width:670px;
  height: 100px;
  margin-top: 10px;
  border-style: inset;
}
.border2{
    margin-left: 30px;
    margin-top:40px;
    width: 350px;
    height:200px;
    border-style: inset;
}
.border3{
    margin-left: 410px;
    margin-top:130px;
    width: 670px;
    height:230px;
    border-style: inset;
}
.border4{
    margin-left: 30px;
    margin-top:255px;
    width: 350px;
    height:430px;
    border-style: inset;
}
.border5{
    margin-left: 1100px;
    margin-top:40px;
    width: 300px;
    height:320px;
    border-style: inset;
}
.border6{
    margin-left: 410px;
    margin-top:380px;
    width: 990px;
    height:300px;
    border-style: inset;
}
.title{
    width: 400px;
    margin-left: -50px;
    height:3px;
    border-style: none;
    color: rgba(182, 151, 242, 0.91);
}
.train{
    width: 12rem;
    height:12rem;
    border-style: none;
    margin-left: 20px;
    margin-top:20px;
}
.btn{
    font-size:10rem;
    margin-left: -10px;
    margin-top:-10px;
    /*background: url("./assets/upload.jpg") no-repeat;*/
    background-color: unset !important;
    border-style: none;
    color: #000;
}
.uploadText{
    width: 1rem;
    height:1rem;
    font-size:1.5rem;
    margin-left: 6px;
    margin-top: -35px;
    border-style: none;
    color: #e4e06e;
}
.question{
    font-size:1rem;
    margin-left: 175px;
    margin-top: -20px;
    border-style: none;
    color: #e4e06e;
}
.predict{
    width: 12rem;
    height:12rem;
    border-style: none;
    margin-left: 238px;
    margin-top:20px;
}
.btn2{
    font-size:8rem;
    margin-left: -10px;
    margin-top: 10px;
    /*background: url("./assets/predict.png") no-repeat;*/
    background-color: unset !important;
    border-style: none;
    color: #000;
    /*z-index: 9999;*/
}
.question2{
    font-size:1rem;
    border-style: none;
    margin-top: 10px;
    margin-left: 170px;
    color: #cf9e36;
}
.predictModel{
    font-size:1.6rem;
    margin-left: -11px;
    margin-top: -34px;
    border-style: none;
    color: #cf9e36;
}
.update{
    width: 12rem;
    height:12rem;
    border-style: none;
    margin-left: 455px;
    margin-top:20px;
}
.btn3{
    font-size:8rem;
    margin-left: 10px;
    margin-top: 12px;
    background-color: unset !important;
    border-style: none;
    color: #000;
    /*z-index: 9999;*/
}
.question3{
    font-size:1rem;
    margin-left: 170px;
    border-style: none;
    margin-top: 10px;
    color: #cfcfa9;
}
.updateModel{
    font-size:1.6rem;
    margin-left: -3px;
    margin-top: -35px;
    border-style: none;
    color: #cfcfa9;
}
.download{
  font-size: 1.5rem;
  margin-left: -3px;
  margin-top: -35px;
  border-style: none;
  color: #cf0130;
}
</style>

