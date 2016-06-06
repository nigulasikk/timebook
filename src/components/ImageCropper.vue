<template>
 <!-- 隐藏文件选择框 -->
<input type="file" id="cover-file-chooser" @change="chooseFile" value="" style="display: none;">
<canvas id="canvas-press" style="display: none;"></canvas>

<!-- 模态框 开始-->
<modal :show.sync="showModal" effect="fade">
  <div slot="modal-header" class="modal-header">
    <h4 class="modal-title">封面图片裁剪</h4>
  </div>
  <div slot="modal-body" class="modal-body">
    <div class="scalable-cropper-contrainer">
        <img id="h5-cropbox" width="100%" />
        <input type="hidden" id="h5-x" />
        <input type="hidden" id="h5-y" />
        <input type="hidden" id="h5-w" />
        <input type="hidden" id="h5-h" />
        <input type="hidden" id="bookId" value="{{this.book.id||''}}" />
        <input type="hidden" id="h5-aspectRatio" value="{{this.book.cover|bookCoverRatioFilter}}" />
    </div>
  </div>
   <div slot="modal-footer" class="modal-footer">
    <button type="button" class="btn btn-default" @click='showModal=false'>取消</button>
    <button type="button" class="btn btn-success" @click='confirmCut'>确定裁剪</button>
  </div>
</modal>
<!-- 模态框  结束-->
</template>

<script>
import $ from 'jquery'
import sweetalertcss from 'sweetalert/dist/sweetalert.css'
import sweetalert from 'sweetalert'
import cpcss from 'cropper'
import cp from 'cropper/dist/cropper.css'
import exif from 'assets/ui/exif.js'
import bscss from 'bootstrap/dist/css/bootstrap.min.css'
var Modal = require('vue-strap/dist/vue-strap.min').modal
export default {
  props: ['book', 'cropLoadding'],
  components: {
    $,
    sweetalertcss,
    sweetalert,
    cpcss,
    cp,
    bscss,
    Modal,
    exif
  },
  data () {
    return {
      showModal: false
    }
  },
  ready () {
    this.cropInit()
  },
  methods: {
    chooseFile: function (e) {
      let file = e.target.files[0]
      this.cropLoadding = true
      this.uploadByH5(file)
    },
    confirmCut: function () {
      this.showModal = false
      var postObj = {
        'x': $('#h5-x').val(),
        'y': $('#h5-y').val(),
        'width': $('#h5-w').val(),
        'height': $('#h5-h').val(),
        'id': $('#bookId').val(),
        'coverImage': $('#h5-cropbox').attr('src')
      }
      this.uploadInterface(postObj)
    },
    setCroperInfo: function (imageUrl) {
      $('#h5-cropbox').cropper('clear').cropper('reset').cropper('replace', imageUrl).cropper('setAspectRatio', $('#h5-aspectRatio').val())
    },
    cropInit: function () {
      var self = this
      $('#h5-cropbox').cropper({
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 1,
        restore: false,
        guides: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        checkCrossOrigin: false,
        toggleDragModeOnDblclick: false,
        responsive: false,
        crop: function (c) {
          $('#h5-x').val(c.x)
          $('#h5-y').val(c.y)
          $('#h5-w').val(c.width)
          $('#h5-h').val(c.height)
          $('#h5-r').val(c.rotate)
        },
        built: function () {
          self.cropLoadding = false
          // closeLoadding();
          // 初始化裁剪宽高比
          //                console.log('built');
          self.showModal = true
        }
      })
    },
    uploadByH5: function (file) {
      var self = this
      // 可以重复上传
      $('#cover-file').val('')
      var fileReader = new window.FileReader()
      // 将文件以Data URL形式读入页面
      fileReader.readAsDataURL(file)
      fileReader.onload = function (e) {
        var imageUrl = e.target.result
        //            借用canvas对base64图片进行压缩
        self.canvasPress(imageUrl)
      }
    },
    canvasPress: function (imgurl) {
      var self = this
      //        如果图片宽度超过maxWidth，则宽度缩放至maxWidth
      var maxWidth = 1200
      var image = new window.Image()
      image.onload = function () {
        var canvas = document.getElementById('canvas-press')
        var ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        //            缩放
        if (image.width > maxWidth) {
          image.height *= maxWidth / image.width
          image.width = maxWidth
        }
        exif.getData(this, function () {
          var orientation = exif.getTag(this, 'Orientation')
          switch (orientation) {
            case 6: // 需要顺时针（向左）90度旋转
              // 重置canvas宽高
              canvas.width = image.height
              canvas.height = image.width
              ctx.rotate(90 * Math.PI / 180)
              //                            由于坐标系也发生旋转，所以是下面这样写的
              ctx.drawImage(image, 0, -image.height, image.width, image.height)
              break
            case 8: // 需要逆时针（向右）90度旋转
              // 重置canvas宽高
              canvas.width = image.height
              canvas.height = image.width
              ctx.rotate(-90 * Math.PI / 180)
              //                            由于坐标系也发生旋转，所以是下面这样写的
              ctx.drawImage(image, -image.width, 0, image.width, image.height)
              break
            case 3:
              // 重置canvas宽高
              canvas.width = image.width
              canvas.height = image.height
              ctx.rotate(180 * Math.PI / 180)
              //                            由于坐标系也发生旋转，所以是下面这样写的
              ctx.drawImage(image, -image.width, -image.height, image.width, image.height)
              break
            default:
              // console.log('默认 orientation')
              // 重置canvas宽高
              canvas.width = image.width
              canvas.height = image.height
              ctx.drawImage(image, 0, 0, image.width, image.height)
              break
          }
          // 接下去调用截图插件
          self.setCroperInfo(canvas.toDataURL())
        })
      }
      image.src = imgurl
    },
    uploadInterface: function (postData) {
      var self = this
      var uploadedWidth = $('#h5-w').val()
      if (uploadedWidth < 581) {
        window.swal({ title: '您确定要上传吗?', text: '您好您的照片宽度小于580px，打印出来照片可能会不清晰', type: 'warning', showCancelButton: true, confirmButtonColor: '#DD6B55', confirmButtonText: '是的，我要上传', closeOnConfirm: true, cancelButtonText: '取消' }, function () {
          $.ajax({
            type: 'POST',
            url: '/wxbook/crop',
            data: postData,
            beforeSend: function () {
              // Handle the beforeSend event
              self.cropLoadding = true
            },
            complete: function () {
              // Handle the complete event
              self.cropLoadding = false
            },
            success: function (cropImg) {
              if (cropImg === '') {
                window.alert('服务器繁忙，请稍后再试！')
              } else {
                $('.book-cover-url').attr('src', cropImg + '?v=1')
              }
            }
          })
        })
      } else {
        $.ajax({
          type: 'POST',
          url: '/wxbook/crop',
          data: postData,
          beforeSend: function () {
            // Handle the beforeSend event
            self.cropLoadding = true
          },
          complete: function () {
            // Handle the complete event
            self.cropLoadding = false
          },
          success: function (cropImg) {
            //                    window.location.reload();
            if (cropImg === '') {
              window.alert('服务器繁忙，请稍后再试！')
            } else {
              $('.book-cover-url').attr('src', cropImg + '?v=1')
            }
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scalable-cropper-contrainer {
    margin: 0 auto;
    width: 560px;
    height: 480px;
    overflow: hidden;
}
@media screen and (min-width: 0px) and (max-width: 600px) {
    .scalable-cropper-contrainer {
        width: 260px;
        height: 280px;
    }
  }

</style>
