<template>
 <div class="nav-bottom">
   <div class="wid33">
     <img  @click="editToggle" src="../assets/edit.png" width="85">
   </div><div class="wid33">
     <!-- <img  @click="dateBoardToggle" src="../assets/date.png" width="45"> -->
     <div class="mulu" @click="dateBoardToggle">目录<img src="../assets/blacksj.png" width="5"></div>
   </div><div class="wid33">
     <img @click="buy" src="../assets/buy.png" width="85">
   </div>
 </div>
  <!-- 模态背景 -->
 <div v-if="editBoardShow" class="modal-bg" @click="editBoardShow=false"></div>
 <div v-if="dataBoardShow" class="modal-bg" @click="dataBoardShow=false"></div>
 <!-- 日期控件展现 -->
 <div v-if="dataBoardShow" class="date-board">
   <div class="date-board-title">目录<img style="position: absolute;right:10px; top:10px;" @click="dataBoardShow=false" src="../assets/close.png" width="30"></div>
   <div class="year-block" v-for="(key, val) in dates">
      <div class="year">
        {{key}}年
      </div>
     <div class="months">
       <div class="month" v-for="month in val" :class="{'selected-month':selectedData[key][month]}"  @click="checkMonthData(key,month)">
         {{month}}
       </div>
     </div>
   </div>
 </div>
 <!-- 编辑控件展现 -->
 <div v-if="editBoardShow" class="edit-board">
   <img style="position: absolute;right:10px; top:10px;" @click="editBoardShow=false" src="../assets/close.png" width="30">
  <div class="edit-board-title">
   编辑内容
  </div>
  <div class="edit-board-content">
    <img @click="deleteByMonth" src="../assets/book/btndelete.png" width="75">
    <img @click="recoverRecord" src="../assets/book/btnrecover.png" width="75">
    <img @click="addRecord" src="../assets/book/btnadd.png" width="75">
  </div>
   <div class="edit-board-title">
      设计书本
  </div>
  <div class="edit-board-content">
    <img @click="changeLayout" src="../assets/book/btncompose.png" width="75">
    <img @click="changeCover" src="../assets/book/btncover.png" width="75">
    <img @click="changeMonthPage" src="../assets/book/btnmonth.png" width="75">
    <img @click="changeInnerPage" src="../assets/book/btninsidepage.png" width="75">
  </div>

 </div>

 <!-- 子组件，书本主体 -->
 <pages :selected-year.sync='selectedY' :selected-month.sync='selectedM' :remove-month.sync='removeM' :remove-year.sync='removeY' :if-loadding.sync='ifloadding' :book-id="bookId" :user-id="userId" :p="p" :if-lock.sync='iflock'  :if-modified.sync='ifmodified' :append-pages-flag.sync='appendFlag'  :load-month-text.sync='loadMonthText' v-on:next-month-triger="loadNextMonth"></pages>
  <div v-if="showOpenInBrowserTip" style="height:100%;width:100%;background:rgba(0,0,0,0.8)  center top no-repeat;
  background-size:100%; position:fixed; top:0;z-index:100000;">
    <img src="../assets/browseropentip.png" width="100%" @click="showOpenInBrowserTip=false">
  </div>
</template>

<script>
import Pages from './Pages'
export default {
  components: {
    Pages
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      // 年月数据
      dates: {},
      // selected 日期
      bookId: '',
      userId: '',
      p: 0,
      selectedY: '',
      selectedM: '',
      removeY: '',
      removeM: '',
      lastY: '',
      lastM: '',
      // 数据是否正在加载中
      ifloadding: false,
      iflock: false,
//      若为true,则在切换年月之前要进行重新排版操作
      ifmodified: false,
    // 根据年月拿数据
      selectedData: [],
      // 日期选择器控件
      dataBoardShow: false,
      // 编辑控件
      editBoardShow: false,
//      从其他页面编辑跳回来,希望返回的年月
      editYear: 0,
      editMonth: 0,
      loadMonthText: '加载下个月',
//      手机端点击支付宝支付提示,在浏览器中打开
      showOpenInBrowserTip: false,
      // 下拉更新年月，选择月份更新数据标志
      appendFlag: false

    }
  },
  watch: {
    // 年月变化时候，触发书本数据更新
    // 当父组件初始化时候，传递年月，会触发这个值变化，所以初始化的时候能自动请求数据
    'selectedM + 12 * selectedY': function () {
      var vuem = this
      // 设置页面selected ui效果
      this.seCheckMonthUi(this.selectedY, this.selectedM)
      // 以下代码是执行用户 滚动监听
      var y = this.selectedY
      var m = this.selectedM
      // 离开网页的请求
      window.onbeforeunload = function () {
        console.log('leave' + m)
        vuem.$http.get('/static/json/wxpages.json', {id: vuem.bookId, month: m, year: y}, {emulateJSON: true}).then(function (response) {})
      }
      //            最后一个月判断
      if ((y * 12 + m) === (this.lastY * 12 + this.lastM)) {
        vuem.loadMonthText = '已经是最后一个月了'
      } else {
        vuem.loadMonthText = '加载下个月'
      }
//      滚动加载下一个月
//      document.onscroll = function () {
//        if (document.body.scrollTop + window.screen.height >= document.body.scrollHeight) {
//          vuem.loadNextMonth()
//        }
//      }
    },
    'removeY + 12 * removeM': function () {
      this.dates[this.removeY].$remove(this.removeM)
    }
  },
  ready () {
    function RequestParameter () {
      var url = window.location.search
      var theRequest = {}
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1])
        }
      }
      return theRequest
    }
    this.bookId = RequestParameter()['bookId'] || 0
    this.showOpenInBrowserTip = RequestParameter()['showPop'] || false
    this.userId = RequestParameter()['userId'] || 0
    this.p = RequestParameter()['p'] || 0
    this.editYear = RequestParameter()['editYear'] || 0
    this.editMonth = RequestParameter()['editMonth'] || 0
    this.initYear()
  },
  methods: {
    getLoaddingStatus: function () {
      return this.ifloadding
    },
    ifContain: function (y, m) {
      return (this.dates[y] || []).indexOf(m)
    },
    setYearAndMonth: function (disty, distm) {
      this.ifloadding = true
//      第一次进入页面  this.selectedY ,this.selectedM 都为空,不会触发第一个月
      if (this.selectedM === '' && this.selectedY === '') {
        this.$http.get('/static/json/wxpages.json', {id: this.bookId, month: distm, year: disty}, {emulateJSON: true}).then(function (response) {
          this.selectedY = disty
          this.selectedM = distm
        })
      } else {
//        根据this.ifmodified 字段(用户是否已经进行信息修改)来决定是否重排
        if (this.ifmodified) {
           //        重排当月,然后再赋值下个月信息,(请求下个月数据)
          this.$http.get('/static/json/wxpages.json', {id: this.bookId, month: this.selectedM, year: this.selectedY}, {emulateJSON: true}).then(function (response) {
            this.selectedY = disty
            this.selectedM = distm
          })
        } else {
          this.selectedY = disty
          this.selectedM = distm
        }
      }
//      修改标示符设为false
      this.ifmodified = false
    },
    initYear: function () {
      this.$http({url: '/static/json/yearandmonths.json', method: 'GET', emulateJSON: true}).then(function (response) {
        for (var i = 0; i < 3018; i++) {
          // 不用push，因为push会引发页面渲染（影响性能），直接修改元素则不会
          this.selectedData[i] = []
        }
        this.dates = response.data
        // 获取最后一年，最后一月，并且初始化为已选择
        for (var lastMonth in this.dates) {
            // 设置初始选择年月，传递给子组件
          var y = parseInt(lastMonth)
          var m = this.dates[y][this.dates[y].length - 1]
          this.lastY = y
          this.lastM = m
        }
        // 获取第一年，第一个月，并且初始化为已选择
        for (var firstMonth in this.dates) {
            // 设置初始选择年月，传递给子组件
          var selectedY = parseInt(firstMonth)
          var selectedM = this.dates[selectedY][0]
          if (this.editYear !== 0) {
            this.checkMonthData(this.editYear, this.editMonth)
          } else {
            // 模拟第一个月份点击选择
            this.checkMonthData(selectedY, selectedM)
          }
          return
        }
      }, function (response) {
          // error callback
      })
    },
    buy: function () {
      // window.location.href = '/wxshu/buy.html?bookId=' + this.bookId + '&userId=' + this.userId + '&p=' + this.p
      // if ((typeof window.WeixinJSBridge === 'undefined' || (typeof window.WeixinJSBridge.invoke === 'undefined'))) {
      //   window.location.href = '/wxshu/buy.html?bookId=' + this.bookId + '&userId=' + this.userId + '&p=' + this.p
      // } else {
      //   // 微信浏览器
      //   window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9a0c51de15b24815' + '&redirect_uri=' + 'http%3a%2f%2fwww.whiletime.com%2fwxshu%2fbuy.html%3fbookId%3d' + this.bookId + '%26userId%3d' + this.userId + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
      // }
    },
    deleteByMonth: function () {
      // window.location.href = '/wxshu/deleteYearAndMonth.html?bookId=' + this.bookId + '&userId=' + this.userId + '&p=' + this.p
    },
    recoverRecord: function () {
      // window.location.href = '/wxshu/transfer-dustbin.html?bookId=' + this.bookId + '&userId=' + this.userId + '&p=' + this.p
    },
    addRecord: function () {
      // window.location.href = '/wxshu/add-record-xs.html?bookId=' + this.bookId + '&userId=' + this.userId + '&p=' + this.p
    },
    changeLayout: function () {
      // window.location.href = '/wxshu/wtChangeAll.html?bookId=' + this.bookId + '&userId=' + this.userId + '&p=' + this.p + '#show=style'
    },
    changeCover: function () {
      // window.location.href = '/wxshu/wtChangeAll.html?bookId=' + this.bookId + '&userId=' + this.userId + '&p=' + this.p + '#show=cover'
    },
    changeMonthPage: function () {
      // window.location.href = '/wxshu/wtChangeAll.html?bookId=' + this.bookId + '&userId=' + this.userId + '&p=' + this.p + '#show=month'
    },
    changeInnerPage: function () {
      // window.location.href = '/wxshu/wtChangeAll.html?bookId=' + this.bookId + '&userId=' + this.userId + '&p=' + this.p + '#show=innerpage'
    },
    dateBoardToggle: function () {
      this.dataBoardShow = !this.dataBoardShow
      this.editBoardShow = false
    },
    editToggle: function () {
      if (this.iflock) {
        window.alert('请联系小编为您解锁')
        return
      } else {
        this.editBoardShow = !this.editBoardShow
        this.dataBoardShow = false
      }
    },
    // 点击年月后发生的事件
    checkMonthData: function (y, m) {
      this.appendFlag = false
      // 更新选择月份ui
      this.seCheckMonthUi(y, m)
      // 先进行该月的重新排版
       // 设置选择年月，传递给子组件
      this.setYearAndMonth(parseInt(y), parseInt(m))
      // this.selectedY = parseInt(y)
      // this.selectedM = m
    },
    // 更新选择月份ui
    seCheckMonthUi: function (y, m) {
      this.dataBoardShow = false
      // 设置selected month
      var a = []
      a[m] = true
      // 复原月份选择
      this.selectedData = []
      for (var i = 0; i < 3018; i++) {
          // 不用push，因为push会引发页面渲染（影响性能），直接修改元素则不会
        this.selectedData[i] = []
      }
      // array.$set(index, value) 方法触发数组更新
      this.selectedData.$set(y, a)
    },
    loadNextMonth: function () {
//      var vuem = this
      // 以下代码是执行用户 滚动监听
      var y = this.selectedY
      var m = this.selectedM
      var lasty = this.lastY
      var lastm = this.lastM
      var getLoaddingStatus = this.getLoaddingStatus
      // 函数传递，在onscroll内部调用不到 this
      var setYM = this.setYearAndMonth
      var ifcontain = this.ifContain
      // 在向后台请求数据（加载中）的时候，禁止持续发送请求
      // 用 getLoaddingStatus （）获取 实时状态，否则报错
      if (!getLoaddingStatus()) {
        // 如果不是最后一个月
        if ((y * 12 + m) < (lasty * 12 + lastm)) {
          // 下一个月计算方式
          if (m === 12) {
            m = 1
            y++
          } else {
            m++
          }
          if (ifcontain(y, m) !== -1) {
//            vuem.appendFlag = true
            setYM(y, m)
          } else {
            while (ifcontain(y, m) === -1) {
              // 下一个月计算方式
              if (m === 12) {
                m = 1
                y++
              } else {
                m++
              }
            }
//            vuem.appendFlag = true
            setYM(y, m)
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    -webkit-tap-highlight-color:transparent;
    tap-highlight-color:transparent
  }
  .nav-bottom{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height: 56px;
    background: rgba(255, 255, 255, 0.85);
    padding-top: 11px;
    border-top: #e2e2e2 solid 1px;
    z-index: 100;
  }
  .wid33{
    width: 33%;
    display: inline-block;
    text-align: center;
    vertical-align: top;
  }
  .date-board{
    position: fixed;
    width: 100%;
    left: 0%;
    bottom: 56px;
    z-index: 2000;
    padding-bottom: 80px;
    background: #CECECE;
    max-height: 400px;
    overflow-y: scroll;
    color: #646464;
    background: #ffffff;
    font-size: 16px;
    padding-bottom: 80px;
    z-index: 2000;
  }
  .date-board-title{
    text-align: center;
    margin-top:20px;
    font-size:19px;
  }
  .edit-board{
    position: fixed;
    width: 100%;
    height: 330px;
    left: 0%;
    bottom: 56px;
    z-index: 2000;
    padding-bottom: 80px;
    background: #ffffff;
  }
  .edit-board-title{
    margin-top:25px;
    padding-left:20px;
    font-size: 14px;
    color: grey;
  }
  .edit-board-content img{
    width:120px;
    margin: 10px 15px;
  }
  .modal-bg{
    position: fixed;
    bottom: 56px;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
    z-index: 1999;
  }
  .month{
    height: 33px;
    width: 45px;
    line-height: 33px;
    text-align: center;
    border-radius: 3px;
    font-size: 15px;
    display: inline-block;
    margin-left: 17px;
    margin-top: 7px;
    cursor: pointer;
  }
  .year{
    width: 270px;
    margin: 30px 0 20px 20px;
    font-size: 16px;
    line-height: 16px;
    color: #323232;
    height: 14px;
  }
  .selected-month{
    border: none;
    background-color: #00A474;
    font-size: 14px;
    color: white;
  }
  .mulu{
    font-size: 18px;
    line-height: 33px;
    vertical-align: middle;
  }
</style>
