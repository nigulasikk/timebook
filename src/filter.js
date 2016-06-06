exports.coverUrlFilter = (value) => {
  return 'static/bookCover/f' + value + '.png'
}
exports.bookCoverRatioFilter = (coverNo) => {
  var coverRatio = {
    '100': 1,
    '101': 1,
    '102': 1.5
  }
  return coverRatio[coverNo]
}
exports.monthUrlFilter = (style, whichMonth) => {
  return 'static/monthStyle/' + style + '/' + whichMonth + '.png'
}
// 书本内容表情处理过滤器
exports.emojiFilter = (text) => {
  if (text != null) {
    var spaceText = text.replace(/ /g, '&nbsp;')
    var qzongTextAfter = spaceText.replace(/\[em\]e.{1,6}\[.{1}em\]/g, function (emoji) {
      return qzongEmoji(emoji)
    })
    var newText = qzongTextAfter.replace(/\[emoji_.{4}\]/g, function (emoji) {
      return softbankMojiImg(emoji)
    })
    var textAfter = newText.replace(/\[.{1,3}\]/g, function (moji) {
      return weixinMojiImg(moji)
    })
    return textAfter.replace(/\n/g,"<br/>")
  }
  return text
}
// 双向过滤器 移除android表情
exports.removeAndroidEmojiFilter = {
  read: function (text) {
    if (text == null) {
      return ''
    } else {
      var newText = text.replace(/\[emoji_.{4}\]/g, function (emoji) {
        return ''
      })
      return newText
    }
  },
  write: function (text, oldText) {
    if (text == null) {
      return ''
    } else {
      var newText = text.replace(/\[emoji_.{4}\]/g, function (emoji) {
        return ''
      })
      return newText
    }
  }
}
var weixinMoji = {
  '[微笑]': 'weixiao',
  '[撇嘴]': 'piezui',
  '[色]': 'se',
  '[发呆]': 'fadai',
  '[得意]': 'deyi',
  '[流泪]': 'liulei',
  '[害羞]': 'haixiu',
  '[闭嘴]': 'bizui',
  '[睡]': 'shui',
  '[大哭]': 'daku',
  '[尴尬]': 'ganga',
  '[发怒]': 'fanu',
  '[调皮]': 'tiaopi',
  '[呲牙]': 'ciya',
  '[惊讶]': 'jingya',
  '[难过]': 'nanguo',
  '[酷]': 'ku',
  '[冷汗]': 'lenghan',
  '[抓狂]': 'zhuakuang',
  '[吐]': 'tu',
  '[偷笑]': 'touxiao',
  '[愉快]': 'yukuai',
  '[白眼]': 'baiyan',
  '[傲慢]': 'aoman',
  '[饥饿]': 'jie',
  '[困]': 'kun',
  '[惊恐]': 'jingkong',
  '[流汗]': 'liuhan',
  '[憨笑]': 'hanxiao',
  '[悠闲]': 'youxian',
  '[奋斗]': 'fendou',
  '[咒骂]': 'zhouma',
  '[疑问]': 'yiwen',
  '[嘘]': 'xu',
  '[晕]': 'yun',
  '[疯了]': 'fengle',
  '[衰]': 'shuai',
  '[骷髅]': 'kulou',
  '[敲打]': 'qiaoda',
  '[再见]': 'zaijian',
  '[擦汗]': 'cahan',
  '[抠鼻]': 'koubi',
  '[鼓掌]': 'guzhang',
  '[糗大了]': 'qiudale',
  '[坏笑]': 'huaixiao',
  '[左哼哼]': 'zuohengheng',
  '[右哼哼]': 'youhengheng',
  '[哈欠]': 'haqian',
  '[鄙视]': 'bishi',
  '[委屈]': 'weiqu',
  '[快哭了]': 'kuaikule',
  '[阴险]': 'yinxian',
  '[亲亲]': 'qinqin',
  '[吓]': 'xia',
  '[可怜]': 'kelian',
  '[菜刀]': 'caidao',
  '[西瓜]': 'xigua',
  '[啤酒]': 'pijiu',
  '[篮球]': 'lanqiu',
  '[乒乓]': 'pingpang',
  '[咖啡]': 'kafei',
  '[饭]': 'fan',
  '[猪头]': 'zhutou',
  '[玫瑰]': 'meigui',
  '[凋谢]': 'diaoxie',
  '[嘴唇]': 'zuichun',
  '[爱心]': 'aixin',
  '[心碎]': 'xinsui',
  '[蛋糕]': 'dangao',
  '[闪电]': 'shandian',
  '[炸弹]': 'zhadan',
  '[刀]': 'dao',
  '[足球]': 'zuqiu',
  '[瓢虫]': 'piaochong',
  '[便便]': 'bianbian',
  '[月亮]': 'yueliang',
  '[太阳]': 'taiyang',
  '[礼物]': 'liwu',
  '[拥抱]': 'yongbao',
  '[强]': 'qiang',
  '[弱]': 'ruo',
  '[握手]': 'woshou',
  '[胜利]': 'shengli',
  '[抱拳]': 'baoquan',
  '[勾引]': 'gouyin',
  '[拳头]': 'quantou',
  '[差劲]': 'chajin',
  '[爱你]': 'aini',
  '[no]': 'no',
  '[ok]': 'ok',
  '[爱情]': 'aiqing',
  '[飞吻]': 'feiwen',
  '[跳跳]': 'tiaotiao',
  '[发抖]': 'fadou',
  '[怄火]': 'ouhuo',
  '[转圈]': 'zhuanquan',
  '[磕头]': 'ketou',
  '[回头]': 'huitou',
  '[跳神]': 'tiaoshen',
  '[投降]': 'touxiang'
}

/**
 *
 * softbank encode emoji transform
 *
 * */
function softbankMojiImg (text) {
  return '<img width="17" src="static/emoji48/' + text.substr(1, 10) + '.png">'
}

function qzongEmoji (text) {
  var eXXX = text.substr(4, text.length - 9)
  return '<img width="17" src="static/QzoneEmoji/' + eXXX + '.gif">'
}
/**
 * 微信中文编码转图片html
 * @param  {[type]} text [中文编码]
 * @return {[type]}      图片html
 *
 */
function weixinMojiImg (text) {
  return '<img width="17" src="static/weixin-moji-img/' + weixinMoji[text] + '.png">'
}
