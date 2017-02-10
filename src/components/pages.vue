<template>
    <div class="page-border" v-for="(pindex, page) in pages" :style="scaleCss">
    <!-- 封面模板 开始-->
      <template v-if="page.page.id=='0'&&page.page.month=='0'">
        <!-- 封面底层照片 -->
        <img :src="page.page.cover|coverUrlFilter" width="100%">
        <template v-if="page.page.cover==102">
          <div class="upload-tip" @click="chooseFileClick">开始传图</div>
          <template v-if="book.coverImage">
             <img class="default102 book-cover-url" :src="book.coverImage" @click="chooseFileClick">
           </template>
           <template v-else>
            <img class="default102 book-cover-url" src="../assets/changeBookCover/default102.png" @click="chooseFileClick">
           </template>
          <div class="diy-info-wraper">
            <input type="text"  placeholder="取个书名吧(XXX的时光书)" class="input-no-bg white-book-name" v-model="book.name|removeAndroidEmojiFilter" @blur='saveBookInfo'>
            <br>
            <input  type="text"  placeholder="这里可以写上署名哦" class="input-no-bg white-author" v-model="book.author|removeAndroidEmojiFilter" @blur='saveBookInfo'>
            <div class="white-volume">1/1册</div>
          </div>
        </template>
        <template v-if="page.page.cover==100">
          <div class="upload-tip" @click="chooseFileClick">开始传图</div>
          <template v-if="book.coverImage">
            <img class="default100 book-cover-url" :src="book.coverImage" @click="chooseFileClick">
           </template>
           <template v-else>
            <img class="default100 book-cover-url" src="../assets/changeBookCover/default.png" @click="chooseFileClick">
           </template>
            <input type="text"  placeholder="取个书名吧(XXX的时光书)" class="input-no-bg diycover-book-name" v-model="book.name |removeAndroidEmojiFilter" @blur='saveBookInfo'>
            <input  type="text" placeholder="这里可以写上署名哦" class="input-no-bg diycover-author" v-model="book.author|removeAndroidEmojiFilter " @blur='saveBookInfo'>
            <div class="diycover-volume">1/1册</div>
        </template>
        <template v-if="page.page.cover==101">
          <div class="upload-tip" @click="chooseFileClick">开始传图</div>
          <template v-if="book.coverImage">
             <img class="default101 book-cover-url" :src="book.coverImage" @click="chooseFileClick">
           </template>
           <template v-else>
             <img class="default101 book-cover-url" src="../assets/changeBookCover/default101.png" @click="chooseFileClick">
           </template>
            <input type="text"  placeholder="取个书名吧(XXX的时光书)" class="input-no-bg diycover-book-name101" v-model="book.name|removeAndroidEmojiFilter" @blur='saveBookInfo'>
            <input  type="text" placeholder="这里可以写上署名哦" class="input-no-bg diycover-author" v-model="book.author|removeAndroidEmojiFilter" @blur='saveBookInfo'>
            <div class="diycover-volume101">1</div>
        </template>
        <template v-if="page.page.cover==8">
            <div class="white-names">
                <input type="text"  placeholder="取个书名吧(XXX的时光书)" class="input-no-bg white-book-name" v-model="book.name|removeAndroidEmojiFilter" @blur='saveBookInfo'>
                 <br>
                <input  type="text"  placeholder="这里可以写上署名哦" class="input-no-bg white-author" v-model="book.author|removeAndroidEmojiFilter" @blur='saveBookInfo'>
                <div class="white-volume">1/1册</div>
            </div>
        </template>
        <template v-if="page.page.cover==1||page.page.cover==2||page.page.cover==3">
            <div class="white-names">
                <input type="text"  placeholder="取个书名吧(XXX的时光书)" class="input-no-bg white-book-name" v-model="book.name|removeAndroidEmojiFilter" @blur='saveBookInfo'>
                 <br>
                <input  type="text"  placeholder="这里可以写上署名哦" class="input-no-bg white-author" v-model="book.author|removeAndroidEmojiFilter" @blur='saveBookInfo'>
                <div class="white-volume" style="color: #600B0F;">1/1册</div>
            </div>
        </template>
        <template v-if="page.page.cover==5||page.page.cover==6">
             <input type="text"  placeholder="取个书名吧(XXX的时光书)" class="input-no-bg diycover-book-name" v-model="book.name|removeAndroidEmojiFilter" @blur='saveBookInfo'>
            <input  type="text" placeholder="这里可以写上署名哦" class="input-no-bg diycover-author" v-model="book.author|removeAndroidEmojiFilter" @blur='saveBookInfo'>
            <div class="diycover-volume">1/1册</div>
        </template>
      </template>
      <!-- 封面模板 结束-->
      <!-- 扉页 -->
      <template v-if="page.page.id=='0'&&page.page.month=='13'">
        <img src="../assets/monthBase/13.png" width="100%">
        <textarea class="feiye-message" @blur='saveFeiyeMsg' v-model="page.page.description|removeAndroidEmojiFilter"></textarea>
      </template>
      <!-- 月份页 -->
      <template v-if="page.page.id=='0'&&page.page.month!='0'&&page.page.month!='13'">
        <div class="page-number">{{page.no}}</div>
        <img  :src="book.bookStyle|monthUrlFilter page.page.month" width="100%">
      </template>
      <!-- 排版页 -->
      <template v-if="page.page.id!='0'">
        <div class="page-number">{{page.no}}</div>
        <template v-for="layout in book.layouts">
          <template v-if="layout.selected">
            <div class="page-header">
                <div class="page-header-book-name">{{book.name}}</div>
                <div class="page-header-year-month">{{yearAndMonth}}</div>
            </div>
            <!-- 瀑布流 -->
            <template v-if="layout.bookLayout=='WaterFall'">
              <div class="page-content">
                <div class="record" v-for="(rindex,record) in page.page" :style="{'margin-top': record.gaptop*screenScale+'px'}">
                  <div @click="deleteRecord(pindex,rindex,'right',record)">
                    <date-block-for-water-fall :record.sync='record' :screen-scale.sync='screenScale'></date-block-for-water-fall>
                  </div>
                  <!--排版： 一图一文字 -->
                  <template v-if="record.type==1">
                    <div class="p-one-one">
                        <div class="float-pic" :style="{width: record.imgs[0].width*screenScale+'px',height: record.imgs[0].height*screenScale+'px'}" @click="imgOpt(pindex,rindex,'',record,0)">
                             <div v-if="record.imgs[0].ifdelete" class="deleteWrap"  >
                                <img  src="../assets/zdelete.png" width="45">
                              </div>
                          <img v-if="record.imgs[0].height/record.imgs[0].width>1.7"  src="../assets/cut.png" width="45" style="position: absolute;right:0;top:0;width:36px;" @click.stop="goToCutImg(record.id,record.imgs[0].id)">
                          <img :src="record.imgs[0].imageUrl" :class="{'img-dashed': (record.imgs[0].height/record.imgs[0].width>1.7)}">
                        </div>
                       <p :style="{'font-size':17*screenScale+'px'}" @click="pubuEditText(pindex,rindex,record.id)">
                         {{{record.content|emojiFilter}}}
                       </p>
                    </div>
                  </template>
                  <!--排版： 只有图片 -->
                  <template v-if="record.type==2">
                    <div class="pic-box">
                      <div class="pic-only" v-for="(imgIndex,img) in record.imgs" :style="{width: img.width*screenScale+'px',height: img.height*screenScale+'px'}" @click="imgOpt(pindex,rindex,'',record,imgIndex)">
                         <div v-if="img.ifdelete" class="deleteWrap"  >
                            <img  src="../assets/zdelete.png" width="45">
                         </div>
                        <img  v-if="img.height/img.width>1.7"  src="../assets/cut.png" width="45" style="position: absolute;right:0;top:0;width:36px;" @click.stop="goToCutImg(record.id,img.id)">
                        <img :src="img.imageUrl">
                      </div>
                    </div>
                  </template>
                  <!--排版： 多图片和文字 -->
                  <template v-if="record.type=='3'">
                    <div class="pic-box">
                      <div :style="{'font-size':17*screenScale+'px', marginBottom:'2%'}" @click="pubuEditText(pindex,rindex,record.id)">
                         {{{record.content|emojiFilter}}}
                      </div>
                      <div class="pic-only" v-for="(imgIndex,img) in record.imgs" :style="{width: img.width*screenScale+'px',height: img.height*screenScale+'px'}" @click="imgOpt(pindex,rindex,'',record,imgIndex)">
                        <div v-if="img.ifdelete" class="deleteWrap"  >
                          <img  src="../assets/zdelete.png" width="45">
                        </div>
                        <img  v-if="img.height/img.width>1.7"  src="../assets/cut.png" width="45" style="position: absolute;right:0;top:0;width:36px;" @click.stop="goToCutImg(record.id,img.id)">
                        <img :src="img.imageUrl">
                      </div>
                    </div>
                  </template>
                  <!-- 只有文字 -->
                  <template v-if="record.type=='4'">
                    <div class="pic-box">
                      <div :style="{'font-size':17*screenScale+'px', marginBottom:'2%'}" @click="pubuEditText(pindex,rindex,record.id)">
                         {{{record.content|emojiFilter}}}
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </template>
             <!-- 新瀑布流 -->
            <template v-if="layout.bookLayout=='WaterFallNew'">
              <div class="page-content">
                <div class="record" v-for="(rindex,record) in page.page" :style="{'margin-top': record.gaptop*screenScale+'px'}">
                  <div @click="deleteRecord(pindex,rindex,'right',record)">
                    <date-block-for-water-fall :record.sync='record' :screen-scale.sync='screenScale'></date-block-for-water-fall>
                  </div>
                  <!--排版： 一图一文字 -->
                  <template v-if="record.type==1">
                    <div class="p-one-one">
                        <div class="float-pic" :style="{width: record.imgs[0].width*screenScale+'px',height: record.imgs[0].height*screenScale+'px'}" @click="imgOpt(pindex,rindex,'',record,0)">
                             <div v-if="record.imgs[0].ifdelete" class="deleteWrap"  >
                                <img  src="../assets/zdelete.png" width="45">
                             </div>
                             <img v-if="record.imgs[0].height/record.imgs[0].width>1.7"  src="../assets/cut.png" width="45" style="position: absolute;right:0;top:0;width:36px;" @click.stop="goToCutImg(record.id,record.imgs[0].id)">
                          <img :src="record.imgs[0].imageUrl">
                        </div>
                       <p :style="{'font-size':17*screenScale+'px'}" @click="pubuEditText(pindex,rindex,record.id)">
                         {{{record.content|emojiFilter}}}
                       </p>
                    </div>
                  </template>
                  <!--排版： 只有图片 -->
                  <template v-if="record.type==2">
                    <div class="pic-box">
                      <div class="pic-only" v-for="(imgIndex,img) in record.imgs" :style="{width: img.width*screenScale+'px',height: img.height*screenScale+'px'}" @click="imgOpt(pindex,rindex,'',record,imgIndex)">
                         <div v-if="img.ifdelete" class="deleteWrap"  >
                            <img  src="../assets/zdelete.png" width="45">
                          </div>
                        <img  v-if="img.height/img.width>1.7"  src="../assets/cut.png" width="45" style="position: absolute;right:0;top:0;width:36px;" @click.stop="goToCutImg(record.id,img.id)">
                        <img :src="img.imageUrl">
                      </div>
                    </div>
                  </template>
                  <!--排版： 一文字多图片 -->
                  <template v-if="record.type=='3'">
                    <div class="pic-box">
                      <div :style="{'font-size':17*screenScale+'px', marginBottom:'2%'}" @click="pubuEditText(pindex,rindex,record.id)">
                         {{{record.content|emojiFilter}}}
                      </div>
                      <div class="pic-only" v-for="(imgIndex,img) in record.imgs" :style="{width: img.width*screenScale+'px',height: img.height*screenScale+'px'}" @click="imgOpt(pindex,rindex,'',record,imgIndex)">
                        <div v-if="img.ifdelete" class="deleteWrap"  >
                          <img  src="../assets/zdelete.png" width="45">
                        </div>
                        <img  v-if="img.height/img.width>1.7"  src="../assets/cut.png" width="45" style="position: absolute;right:0;top:0;width:36px;" @click.stop="goToCutImg(record.id,img.id)">
                        <img :src="img.imageUrl">
                      </div>
                    </div>
                  </template>
                  <!-- 只有文字 -->
                  <template v-if="record.type=='4'">
                    <div class="pic-box">
                      <div :style="{'font-size':17*screenScale+'px', marginBottom:'2%'}" @click="pubuEditText(pindex,rindex,record.id)">
                         {{{record.content|emojiFilter}}}
                      </div>
                    </div>
                  </template>
                    <!-- 8一文字一图 文字居中 -->
                  <template v-if="record.type=='8'">
                     <div class="p-one-one">
                        <div class="float-pic" :style="{width: record.imgs[0].width*screenScale+'px',height: record.imgs[0].height*screenScale+'px'}" @click="imgOpt(pindex,rindex,'',record,0)">
                             <div v-if="record.imgs[0].ifdelete" class="deleteWrap"  >
                                <img  src="../assets/zdelete.png" width="45">
                             </div>
                             <img v-if="record.imgs[0].height/record.imgs[0].width>1.7"  src="../assets/cut.png" width="45" style="position: absolute;right:0;top:0;width:36px;" @click.stop="goToCutImg(record.id,record.imgs[0].id)">
                             <img :src="record.imgs[0].imageUrl">
                        </div>
                         <div style="position:absolute;top:0;" :style="{left:record.imgs[0].width*screenScale+5+'px'}"><img src="../assets/composing/l.png" class="ljn-square-icon"></div>
                         <div style="position:absolute;bottom:0;right:0;"><img src="../assets/composing/r.png" class="ljn-square-icon"></div>
                         <div :style="{'font-size':17*screenScale+'px',left:record.imgs[0].width*screenScale+'px',position:'absolute',top: '50%',padding: 20+'px','text-align':'left','-webkit-transform': 'translateX(0) translateY(-50%)',width:640*screenScale-record.imgs[0].width*screenScale-10+'px'}" @click="pubuEditText(pindex,rindex,record.id)">
                         {{{record.content|emojiFilter}}}
                         </div>
                    </div>
                  </template>
                    <!-- 9一文字多图  文字当成图片块居中 -->
                  <template v-if="record.type=='9'">
                    <div class="pic-box">
                      <div :style="{'font-size':17*screenScale+'px', marginBottom:'2%',display:'inline-block',width:643*screenScale-record.imgs[0].width*screenScale-20+'px',height:record.imgs[0].height*screenScale+'px'}" >
                        <div style="position:relative;width:100%;height:100%;">
                          <div style="position:absolute;top:0;left:0"><img src="../assets/composing/l.png" class="ljn-square-icon"></div>
                         <div style="position:absolute;bottom:0;right:0;"><img src="../assets/composing/r.png" class="ljn-square-icon"></div>
                          <div style="position:absolute;top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);width:100%;text-align:center;" @click="pubuEditText(pindex,rindex,record.id)">
                             {{{record.content|emojiFilter}}}
                          </div>
                        </div>
                      </div>
                      <div class="pic-only" v-for="(imgIndex,img) in record.imgs" :style="{width: img.width*screenScale+'px',height: img.height*screenScale+'px'}" @click="imgOpt(pindex,rindex,'',record,imgIndex)">
                        <div v-if="img.ifdelete" class="deleteWrap"  >
                          <img  src="../assets/zdelete.png" width="45">
                        </div>
                        <img  v-if="img.height/img.width>1.7"  src="../assets/cut.png" width="45" style="position: absolute;right:0;top:0;width:36px;" @click.stop="goToCutImg(record.id,img.id)">
                        <img :src="img.imageUrl">
                      </div>
                    </div>
                  </template>

                </div>
              </div>
            </template>
            <!-- 时光轴 -->
            <template v-if="layout.bookLayout=='TimeAxis'">
              <div class="page-content">
              <!-- 左边 -->
                <div class="col-left">
                  <div class="tl-message" v-for="(rindex,record) in page.page.left">
                  <!-- 被合并掉的时间 ，后台day=0 -->
                    <template v-if="record.day!=0||record.week!=0">
                      <!-- 被删除该条删掉的时间，不显示 -->
                      <template v-if="record.day!=undefined">
                        <div class="arr-wrap put-on-timeline-left text-right" @click="deleteRecord(pindex,rindex,'left',record)">
                        <div class="kk-day">{{record.day}}日</div><div class="kk-time">{{record.time}}</div>
                        <span class="tl-week">{{record.week}}</span>
                        </div>
                      </template>
                    </template>
                    <div class="p-block" :style="{'font-size':17*screenScale+'px'}"  @click="tlEditText(pindex,rindex,'left',record.id)">
                      {{{record.content|emojiFilter}}}
                    </div>
                    <div class="pics-block">
                        <div class="tl-img-wrap" v-for="(imgIndex, tlimg) in record.imgs" :style="{width:tlimg.width*screenScale+'px', height:tlimg.height*screenScale+'px'}" @click="imgOpt(pindex,rindex,'left',record,imgIndex)">
                          <div v-if="tlimg.ifdelete" class="deleteWrap"  >
                               <img  src="../assets/zdelete.png" width="45" style="width:45px;">
                          </div>
                          <img  v-if="tlimg.height/tlimg.width>1.7"  src="../assets/cut.png" width="45" style="position: absolute;right:0;top:0;width:36px;" @click.stop="goToCutImg(record.id,tlimg.id)">
                          <img class="tl-img" :src="tlimg.imageUrl">
                        </div>
                    </div>
                  </div>
                </div>
                <!-- 右边 -->
                <div class="col-right">
                    <div class="tl-message" v-for="(rindex, record) in page.page.right">
                        <template v-if="record.day!=0||record.week!=0">
                           <!-- 被删除该条删掉的时间，不显示 -->
                           <template v-if="record.day!=undefined">
                              <div class="arr-wrap put-on-timeline-right text-left" @click="deleteRecord(pindex,rindex,'right',record)">
                                <div class="kk-day">{{record.day}}日</div><div class="kk-time">{{record.time}}</div>
                                <span class="tl-week">{{record.week}}</span>
                              </div>
                           </template>
                        </template>
                        <div class="p-block" :style="{'font-size':17*screenScale+'px'}"  @click="tlEditText(pindex,rindex,'right',record.id)">
                          {{{record.content|emojiFilter}}}
                        </div>
                        <div class="pics-block">
                          <div class="tl-img-wrap" v-for="(imgIndex, tlimg) in record.imgs" :style="{width:tlimg.width*screenScale+'px', height:tlimg.height*screenScale+'px'}" @click="imgOpt(pindex,rindex,'right',record,imgIndex)">
                            <div v-if="tlimg.ifdelete" class="deleteWrap"  >
                               <img  src="../assets/zdelete.png" width="45">
                            </div>
                            <img  v-if="tlimg.height/tlimg.width>1.7"  src="../assets/cut.png" width="45" style="position: absolute;right:0;top:0;width:36px;" @click.stop="goToCutImg(record.id,tlimg.id)">
                            <img class="tl-img" :src="tlimg.imageUrl">
                          </div>
                        </div>
                    </div>
                </div>
            </template>
          </template>
        </template>
      </template>
    </div>
    <!--加载下个月按钮-->
    <div v-if="nextMonthBtnShow" class="load-next-month" @click="loadNextMonth">{{loadMonthText}}</div>
    <!-- 封面上传图片组件 -->
    <image-cropper :book="book" :crop-loadding.sync="ifLoadding"></image-cropper>
    <!-- loadding 块 -->
    <div class="time-load-mask" v-if="ifLoadding">
      <img src="../assets/timeloadding.gif" class="time-load-pic">
    </div>
    <!-- 编辑文字模态框 开始-->
      <modal :show.sync="editWrap.showModal" effect="fade">
        <div slot="modal-header" class="modal-header">
          <h4 class="modal-title"> 修改文字</h4>
        </div>
        <div slot="modal-body" class="modal-body">
          <!--<input type="text" style="width:100%;" v-model="editWrap.modalText">-->
          <textarea style="width: 100%;border:none;" rows="6" v-model="editWrap.modalText"></textarea>
        </div>
         <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='editWrap.showModal = false'>取消</button>
          <button type="button" class="btn btn-default-color" @click='saveEditText'>保存</button>
        </div>
      </modal>
  <!-- 编辑文字模态框  结束-->

</template>
<script>
import DateBlockForWaterFall from './DateBlockForWaterFall'
import bscss from 'bootstrap/dist/css/bootstrap.min.css'
import ImageCropper from './ImageCropper'
// import Modal from 'vue-strap/dist/vue-strap.min'
var Modal = require('vue-strap/dist/vue-strap.min').modal
export default {
  components: {
    DateBlockForWaterFall,
    Modal,
    bscss,
    ImageCropper
  },
  props: ['selectedYear', 'selectedMonth', 'bookId', 'ifLoadding', 'ifLock', 'appendPagesFlag', 'loadMonthText', 'userId', 'p', 'removeYear', 'removeMonth', 'ifModified'],
  data () {
    return {
      pages: [],
      screenScale: 1,
      scaleCss: {},
      yearAndMonth: '',
      book: {},
      nextMonthBtnShow: false,
      editWrap: {showModal: false, modalText: ''},
      coverfile: ''
    }
  },
  watch: {
    // 年月变化时候，触发书本数据更新
    // 当父组件初始化时候，传递年月，会触发这个值变化，所以初始化的时候能自动请求数据
    'selectedMonth + 12 * selectedYear': function () {
      this.getPages(this.selectedYear, this.selectedMonth)
    }
  },
  ready: function () {
  },
  methods: {
    // 根据年月拿数据
    getPages: function (y, m) {
      this.ifLoadding = true
      this.$http({url: './static/json/page' + y + '-' + m + '.json', method: 'GET', emulateJSON: true}).then(function (response) {
        this.book = response.data.book
        // 屏幕缩放
        var screenWidth = document.querySelector('body').offsetWidth - 10
        this.screenScale = (screenWidth / 700) < 1 ? (screenWidth / 700) : 1
        // this.scaleCss = {'transform': 'scale(' + this.screenScale + ')', 'transform-origin': '0 0'}
        this.scaleCss = {height: 1000 * this.screenScale + 'px', width: 700 * this.screenScale + 'px', 'background-image': 'url(static/pageBg/page' + (this.book.innerBookStyle || 1) + '.png)'}
        // 书本数据赋值
        // 如果是下拉进行切换年月的，那么数据append。否则，就直接切换到那个月
        if (this.appendPagesFlag) {
          this.pages = this.pages.concat(response.data.monthData)
        } else {
          this.pages = response.data.monthData
        }
        // 书本信息
        this.ifLock = response.data.book.editLock
        this.yearAndMonth = response.data.yearAndMonth
        // 滚动到顶部
        var setloaddingfalse = this.setLoaddingFalse
        this.$nextTick(function () {
//          显示下一页按钮
          this.nextMonthBtnShow = true
//          加载中完毕
          setloaddingfalse()
//          根据flag判断该不该回到顶部
          if (!this.appendPagesFlag) {
            window.scrollTo(0, 0)
          }
        })
      }, function (response) {
          // error callback
      })
    },
    setLoaddingFalse: function () {
      this.ifLoadding = false
    },
    // 保存扉页内容
    saveFeiyeMsg: function () {
      function getLine (text) {
        return text.split('\n').length
      }
      if (this.book.editLock) {
        window.alert('保存失败，请联系小编为您解锁')
        return
      } else {
        if (getLine(this.pages[1].page.description) > 12) {
          window.alert('扉页文字最多12行哦！')
        } else {
          var desObj = {description: this.pages[1].page.description}
          this.$http.post('/wxbook/' + this.bookId, desObj, {emulateJSON: true}).then(function (response) {
          })
        }
      }
    },
    saveBookInfo: function () {
      // 中文10个，英文20个
      // 最小公倍数60
      // 中文长度为6，英文长度为3
      // 书名长度
      function bookNameLength (text) {
        var textLength = 0
        for (var i = 0; i < (text || '').length; i++) {
          if (text.charCodeAt(i) > 255) {
            textLength += 6
          } else {
            textLength += 3
          }
        }
        return textLength
      }
      if (this.book.editLock) {
        window.alert('保存失败，请联系小编为您解锁')
        return
      } else {
        if (bookNameLength(this.book.name) >= 60) {
          window.alert('书名太长了哦')
        } else {
          this.$http.post('/wxbook/' + this.bookId, {name: this.book.name, author: this.book.author}, {emulateJSON: true}).then(function (response) {})
        }
      }
    },
    tlEditText: function (pindex, rindex, leftOrRight, recordId) {
      if (this.book.editLock) {
        window.alert('保存失败，请联系小编为您解锁')
        return
      } else {
        this.editWrap.showModal = true
        this.editWrap.modalText = this.pages[pindex].page[leftOrRight][rindex].content
        this.editWrap.pindex = pindex
        this.editWrap.leftOrRight = leftOrRight
        this.editWrap.rindex = rindex
        this.editWrap.recordId = recordId
      }
    },
    // 图片操作
    // 1.根据不同排版bookLayout
    // 2.图片当前状态 被删除，已恢复 imgStatusWaterFul 和imgStatus  图片状态的取法不同，所以要分来来写
    imgOpt: function (pindex, rindex, leftOrRight, record, imgIndex) {
      if (this.book.editLock) {
        window.alert('删除图片失败，请联系小编为您解锁')
        return
      } else {
        if (this.getBookInfo(this.book.layouts).bookLayout === 'WaterFall' || this.getBookInfo(this.book.layouts).bookLayout === 'WaterFallNew') {
          var imgStatusWaterFul = this.pages[pindex].page[rindex].imgs[imgIndex].ifdelete
          if (imgStatusWaterFul) {
            this.recoverImg(pindex, rindex, leftOrRight, record, imgIndex)
          } else {
            this.delImg(pindex, rindex, leftOrRight, record, imgIndex)
          }
        } else if (this.getBookInfo(this.book.layouts).bookLayout === 'TimeAxis') {
          // 时光轴排版，判断图片状态，再进行恢复或删除操作
          var imgStatus = this.pages[pindex].page[leftOrRight][rindex].imgs[imgIndex].ifdelete
          if (imgStatus) {
            this.recoverImg(pindex, rindex, leftOrRight, record, imgIndex)
          } else {
            this.delImg(pindex, rindex, leftOrRight, record, imgIndex)
          }
        } else {
        }
      }
    },
    delImg: function (pindex, rindex, leftOrRight, record, imgIndex) {
      // this.$set('pages[pindex].page[leftOrRight][rindex].imgs[imgIndex].ifdelete', true)
      // this.$set(this.pages, '[pindex].page[leftOrRight][rindex].imgs[imgIndex]ifdelete', true)
      // this.$log(this.pages[pindex].page[leftOrRight][rindex].imgs[imgIndex].ifdelete)
      // array.$set(index, value) 方法触发数组更新
      // 这方法没搞定
      // this.pages[pindex].page[leftOrRight][rindex].imgs[imgIndex] = Object.assign({}, this.pages[pindex].page[leftOrRight][rindex].imgs[imgIndex], {ifdelete: true})
      this.$http.post('/wxmessagedetailimgage', {id: record.id, img: record.imgs[imgIndex].id, op: 'del'}, {emulateJSON: true}).then(function (response) {
        //        修改信息标识
        this.ifModified = true
         // 保存完文字后，根据不同的排版，进行不同的回调更改数据
        if (this.getBookInfo(this.book.layouts).bookLayout === 'WaterFall' || this.getBookInfo(this.book.layouts).bookLayout === 'WaterFallNew') {
            // TODO: 临时解决法，  应该有更好的方法来动态更新VM（用es5的Object.assign）
          var thisPicWaterFul = this.pages[pindex].page[rindex].imgs[imgIndex]
          this.pages[pindex].page[rindex].imgs.$set(imgIndex, {imageUrl: thisPicWaterFul.imageUrl,
          width: thisPicWaterFul.width,
          id: thisPicWaterFul.id,
          height: thisPicWaterFul.height,
          ifdelete: true})
        } else if (this.getBookInfo(this.book.layouts).bookLayout === 'TimeAxis') {
           // TODO: 临时解决法，  应该有更好的方法来动态更新VM（用es5的Object.assign）
          var thisPic = this.pages[pindex].page[leftOrRight][rindex].imgs[imgIndex]
          this.pages[pindex].page[leftOrRight][rindex].imgs.$set(imgIndex, {imageUrl: thisPic.imageUrl,
          width: thisPic.width,
          id: thisPic.id,
          height: thisPic.height,
          ifdelete: true})
        } else {

        }
      })
    },
    recoverImg: function (pindex, rindex, leftOrRight, record, imgIndex) {
      this.$http.post('/wxmessagedetailimgage', {id: record.id, img: record.imgs[imgIndex].id, op: 'recovery'}, {emulateJSON: true}).then(function (response) {
         // 保存完文字后，根据不同的排版，进行不同的回调更改数据
        if (this.getBookInfo(this.book.layouts).bookLayout === 'WaterFall' || this.getBookInfo(this.book.layouts).bookLayout === 'WaterFallNew') {
          var thisPicWaterFul = this.pages[pindex].page[rindex].imgs[imgIndex]
          this.pages[pindex].page[rindex].imgs.$set(imgIndex, {imageUrl: thisPicWaterFul.imageUrl,
          width: thisPicWaterFul.width,
          id: thisPicWaterFul.id,
          height: thisPicWaterFul.height,
          ifdelete: false})
        } else if (this.getBookInfo(this.book.layouts).bookLayout === 'TimeAxis') {
                 // TODO: 临时解决法，  应该有更好的方法来动态更新VM（用es5的Object.assign）
          var thisPic = this.pages[pindex].page[leftOrRight][rindex].imgs[imgIndex]
          this.pages[pindex].page[leftOrRight][rindex].imgs.$set(imgIndex, {imageUrl: thisPic.imageUrl,
          width: thisPic.width,
          id: thisPic.id,
          height: thisPic.height,
          ifdelete: false})
        } else {

        }
      })
    },
    deleteRecord: function (pindex, rindex, leftOrRight, record) {
      if (this.book.editLock) {
        window.alert('请联系小编为您解锁')
        return
      } else {
        this.$http.post('/wxmessagedetail/' + record.id + '/delete', {emulateJSON: true}).then(function (response) {
          this.ifModified = true
          if (this.getBookInfo(this.book.layouts).bookLayout === 'WaterFall' || this.getBookInfo(this.book.layouts).bookLayout === 'WaterFallNew') {
            this.pages[pindex].page.$set(rindex, {})
//            跨页内容删除,把所有页第一条id相同的record
            for (var i = 0; i < this.pages.length; i++) {
//              过滤掉封面,也分页
              if (this.pages[i].page.length || false) {
//                遍历所有页的第一条 是否id相等
                if (this.pages[i].page[0].id === record.id) {
                  this.pages[i].page.$set(0, {})
                }
              }
            }
            //          这个月内容被删完了   要触发
            if (!this.ifContainContent()) {
              console.log('这个月被删光了')
              this.removeYear = this.selectedYear
              this.removeMonth = this.selectedMonth
            }
          } else if (this.getBookInfo(this.book.layouts).bookLayout === 'TimeAxis') {
//            删除当前条
            this.pages[pindex].page[leftOrRight].$set(rindex, {})
            // 跨页内容删除,把所有页第一条id相同的record
            for (let i = 0; i < this.pages.length; i++) {
              //              过滤掉封面,月份页 格式不太对
              if (this.pages[i].page['left'] || false) {
//                遍历左边第一条
                if (this.pages[i].page['left'][0].id === record.id) {
                  this.pages[i].page['left'].$set(0, {})
                }
              }
              //           过滤掉封面,月份页
              if (this.pages[i].page['right'] || false) {
                // 还要过滤掉右边是空的情况,  右边为空要单独判断下,因为左边不可能出现为空的情况(空页)
                if (this.pages[i].page['right'].length !== 0) {
                  //                遍历右边第一条
                  if (this.pages[i].page['right'][0].id === record.id) {
                    this.pages[i].page['right'].$set(0, {})
                  }
                }
              }
            }
            //          这个月内容被删完了   要触发
            if (!this.ifContainContentTl()) {
              console.log('这个月被删光了')
              this.removeYear = this.selectedYear
              this.removeMonth = this.selectedMonth
            }
          } else {

          }
        })
      }
    },
//    一个月是否还有内容 (删光)
    ifContainContent: function () {
      for (var i = 0; i < this.pages.length; i++) {
        for (var j = 0; j < this.pages[i].page.length; j++) {
//          console.log(this.pages[i].page[j].id)
          if (this.pages[i].page[j].id) {
            return true
          }
        }
      }
      return false
    },
    //    时光轴排版
    ifContainContentTl: function () {
      for (let i = 0; i < this.pages.length; i++) {
//        左边
        if (this.pages[i].page['left']) {
          for (let j = 0; j < this.pages[i].page['left'].length; j++) {
            if (this.pages[i].page['left'][j].id) {
              return true
            }
          }
        }
//        右边
        if (this.pages[i].page['left']) {
          for (let j = 0; j < this.pages[i].page['right'].length; j++) {
            if (this.pages[i].page['right'][j].id) {
              return true
            }
          }
        }
      }
      return false
    },
    pubuEditText: function (pindex, rindex, recordId) {
      if (this.book.editLock) {
        window.alert('保存失败，请联系小编为您解锁')
        return
      } else {
        this.editWrap.showModal = true
        this.editWrap.modalText = this.pages[pindex].page[rindex].content
        this.editWrap.pindex = pindex
        this.editWrap.rindex = rindex
        this.editWrap.recordId = recordId
      }
    },
    saveEditText: function () {
      this.$http.post('/wxmessagedetail', {id: this.editWrap.recordId, content: this.editWrap.modalText, op: 'del'}, {emulateJSON: true}).then(function (response) {
//        修改信息标识
        this.ifModified = true
        this.editWrap.showModal = false
        // console.log(this.getBookInfo(this.book.layouts).bookLayout)
        // 保存完文字后，根据不同的排版，进行不同的回调更改数据
        if (this.getBookInfo(this.book.layouts).bookLayout === 'WaterFall' || this.getBookInfo(this.book.layouts).bookLayout === 'WaterFallNew') {
          this.pages[this.editWrap.pindex].page[this.editWrap.rindex].content = this.editWrap.modalText
        } else if (this.getBookInfo(this.book.layouts).bookLayout === 'TimeAxis') {
          this.pages[this.editWrap.pindex].page[this.editWrap.leftOrRight][this.editWrap.rindex].content = this.editWrap.modalText
        } else {

        }
      })
    },
    getBookInfo: function (layouts) {
        // 有问题的书
      if (!layouts) {
        console.log('书没有layouts')
        return {
          totalPageNumber: '',
          bookLayout: '',
          createTime: '',
          splitPoints: '',
          lid: ''
        }
      }
          // 有问题的书
      if (layouts.length === 0) {
        console.log('书没有layouts')
        return {
          totalPageNumber: '',
          bookLayout: '',
          createTime: '',
          splitPoints: '',
          lid: ''
        }
      }
      for (var i = 0; i < layouts.length; i++) {
        if (layouts[i].selected === true) {
          return {
            totalPageNumber: layouts[i].totalPageNumber,
            bookLayout: layouts[i].bookLayout,
            createTime: layouts[i].createTime,
            splitPoints: layouts[i].splitPoints,
            lid: layouts[i].id
          }
        }
      }
      console.log('layouts没有select==true')
      return {
        totalPageNumber: '',
        bookLayout: '',
        createTime: '',
        splitPoints: '',
        lid: ''
      }
    },
    // 点击封面，事件代理到点击文件选择input
    chooseFileClick: function () {
      document.getElementById('cover-file-chooser').click()
    },
//    加载下一个月
    loadNextMonth: function () {
//      事件派发给父组件
      this.$dispatch('next-month-triger')
    },
    goToCutImg: function (recordid, imgid) {
      window.location.href = '/wxshu/cutimg.html?bookId=' + this.bookId + '&userId=' + this.userId + '&p=' + this.p + '&detailId=' + recordid + '&imageId=' + imgid + '&editYear=' + this.selectedYear + '&editMonth=' + this.selectedMonth
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.time-load-mask{
z-index:10001;background-color: white;opacity: 0.8;position:fixed;top:0;width:100%;height: 100%;
}
.time-load-pic{
  z-index:10002;top:200px;left:50%;position:fixed;width:100px;transform: translateX(-50%);
}
 .page-border{
    background: #fff;
    background-size: cover;
    box-shadow: 1px 1px 6px rgba(154, 152, 152,.7);
    margin: 4% auto;
    padding-top: 2%;
    height: 1000px;
    width: 700px;
    position: relative;
    overflow: hidden;
 }
 .feiye-message {
    display: block;
    text-align: left;
    padding: 3%;
    width: 80%;
    height: 48%;
    background: rgba(0,0,0,0);
    border: 1px dashed rgba(194,192,192,1);
    overflow: hidden;
    position: absolute;
    top: 39%;
    left: 10%;
    line-height: 2;
    font-size: 12px;
    box-sizing: border-box;
}
.default102{
  position: absolute;top:19%;left:3%; width:94%;
}
.default100{
  position: absolute;top: 10%;
    left: 15%;
    width: 70%;
}
.default101{
  position: absolute;
    left: 3%;
    top: 5%;
    width: 94%;
}
.input-no-bg{
      background: rgba(0,0,0,0);
    border: none;
}
.diy-info-wraper {
    width: 86%;
    position: absolute;
    bottom: 15%;
    z-index: 20;
    color: #323232;
    text-align: right;
    font-family: "Microsoft YaHei", "微软雅黑";
}
.white-names{
    width: 86%;
    position: absolute;
    z-index: 20;
    text-align: right;
    bottom: 29%;
    color: #600B0F;
}

.names input::-webkit-input-placeholder,
.names input::-webkit-input-placeholder {
    color: white;
}
.white-names input::-webkit-input-placeholder,
.white-names input::-webkit-input-placeholder {
    color: #808080;
}
.white-book-name {
    font-size: 13px;
    border-bottom: 3px rgba(194,192,192,1) dashed;
    width: 60%;
    text-align: right;

}
.diycover-book-name{
    text-align: center;
    width: 100%;
    top: 64%;
    background: rgba(0,0,0,0);
    border: none;
    display: block;
    position: absolute;
      border-bottom: 3px #d3d3d3 dashed;
    z-index: 24;
}
.diycover-book-name101{
    text-align: right;
    width: 60%;
    top: 23%;
    right: 10%;
    color: #fff;
    font-size: 16px;
    background: rgba(0,0,0,0);
    border: none;
    display: block;
    position: absolute;
    z-index: 24;
  border-bottom: 3px #fff dashed;

}
.white-author {
    font-size: 13px;
    border-bottom: 3px rgba(194,192,192,1) dashed;
    width: 60%;
    text-align: right;
    margin-top:2%;
}
.diycover-author{
      border: none;
     border-bottom: 3px #d3d3d3 dashed;
    top: 75%;
    width: 30%;
    left: 35%;
    display: block;
    position: absolute;
    text-align: center;
    background: rgba(0,0,0,0);
}
.white-volume {
  margin-top:2%;
  font-size: 12px;
}
.diycover-volume{
      font-size: 13px;
    display: block;
    position: absolute;
    top: 71%;
    text-align: center;
    width: 30%;
    left: 35%;
}
.diycover-volume101{
      display: block;
    position: absolute;
    text-align: center;
    right: 7%;
    background: rgba(216,216,216,.8);
    color: #323232;
    border-radius: 50%;
        font-size: 12px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    top: 65%;
}
/*瀑布流排版样式 开始*/
.page-content,.page-header{
  width: 94%;
  margin:0 auto;
}
.page-header{
  border-bottom: 1px #D8D8D8 solid;
  padding-bottom: 1%;
  margin-bottom: 1%;
}
.page-header:after{
  visibility: hidden;
  display: block;
  font-size: 0;
  content: ".";
  clear: both;
  height: 0;
}
.page-header-year-month{
  float: right;
  font-size: 12px;
}
.page-header-book-name{
  float: left;
  font-size: 12px;
}

.record {
    display: inline-block;
    clear: both;
    vertical-align: top;
    margin-bottom: 3%;
    width: 100%;
    max-height: 900px;
}


/*只有图片*/

.pic-box {
    display: inline-block;
    font-size: 17px;
    position: relative;
    width: 100%;
    max-height: 900px;
    word-break: break-all;
    text-align: justify;
}

.pic-only {
    display: inline-block;
    height: auto;
    vertical-align: top;
    margin-right: 2%;
    margin-bottom: 2%;
    max-height: 900px;
    overflow: hidden;
    position: relative;
}

.pic-only img,
.float-pic img {
  border-radius: 5px;
  width:100%;
}
.pic-only .deleteWrap img,
.tl-img-wrap .deleteWrap img,
.float-pic .deleteWrap img{
  width:45px;
  position: absolute;
  top:50%;
  left:50%;
  margin-top:-22px;
  margin-left:-22px;
}
.float-pic {
    float: left;
    margin-right: 1%;
    position: relative;
    max-height: 900px;
}


.recover-img {
    position: absolute;
    right: 2px;
    bottom: 3px;
}

/*瀑布流排版样式 结束*/
/*时光轴*/
.col-left{
    display: inline-block;
    width: 45%;
    height:auto;
    vertical-align: top;
    margin-left: 1%;
    padding-right:5px;
    max-height: 900px;
    overflow: hidden;
}
.col-right{
    display: inline-block;
    width: 45%;
    height: auto;
    vertical-align: top;
    margin-left: 1%;
    padding-left:10px;
    max-height: 900px;
    overflow: hidden;

}

.kk-day {
    display: inline-block;
    background: #ff5454;
    color: white;
    padding: 4px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    cursor: pointer;
}
.col-left .kk-day{
    padding-left:8px;
}

.kk-time {
    display: inline-block;
    color: #333333;
    background: #e5e5e5;
    padding: 4px;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    cursor: pointer;
}
.col-right .kk-time{
    padding-right:8px;
}
.tl-week{
    color:#9b9a9a;
    line-height:28px ;
    font-size: 12px;
}
.put-on-timeline-left .tl-week{
    float: left;
}
.put-on-timeline-right .tl-week{
    float: right;
}
.put-on-timeline-right {
    margin-left: -13px;
}
.arr-wrap {
      position: relative;
    margin-bottom: 1%;
    font-size: 12px;
    padding-top: 5px;
    height: 33px;
}
.put-on-timeline-left {
    margin-right: -7px;
}
.text-right {
    text-align: right;
}
.text-left {
    text-align: left;
}
.tl-img{

    border-radius: 5px;
    width:100%;
}
.tl-img-wrap{
  margin-bottom:2%;
    position: relative;
}
.date-block, .p-block {
    margin-bottom: 2%;
    position: relative;
}

.deleteWrap{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  top:0;
  background:rgba(0, 0, 0, 0.74);
  text-align:center;
  /*padding-top:55%;*/
}
.p-one-one{
    width: 100%;
    vertical-align: top;
    display: inline-block;
    overflow: hidden;
    position: relative;
    max-height: 900px;
    word-break: break-all;
    text-align: justify;
}
.upload-tip{
  position: absolute;
  top:35%;
  left:35%;
  width:30%;
  text-align: center;
  z-index: 10;
  color:white;
  font-size: 15px;
  border:solid 1px white;
  padding:5px 15px;
  background:rgba(255,255,255,.4)


}
.load-next-month{
  width:80%;
  margin-left:10%;
  background: #00A474;
  color: white;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  text-align: center;
  border-radius: 5px;
}
.btn-default-color{
  color: #fff;
  background-color: #00A474;
  border-color: #00A474;
}
  .page-number{
    position: absolute;
    bottom:0;
    left:50%;
    transform: translateX(-50%);
    font-size:12px;

  }
  .img-dashed{
    border:1px dashed black;
  }
</style>
