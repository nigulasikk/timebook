<template>
	<div class="kaikaikiki-flower">
		<div class="petal-wrap">
	        <div class="petal"></div>
		</div>
		<div class="petal-wrap">
	        <div class="petal"></div>
		</div>
		<div class="petal-wrap">
	        <div class="petal"></div>
		</div>
		<div class="petal-wrap">
	        <div class="petal"></div>
		</div>
		<div class="petal-wrap">
	        <div class="petal"></div>
		</div>
		<div class="petal-wrap">
	        <div class="petal"></div>
		</div>
		<div class="petal-wrap">
	        <div class="petal"></div>
		</div>
		<div class="petal-wrap">
	        <div class="petal"></div>
		</div>
		<div class="petal-wrap">
	        <div class="petal"></div>
		</div>
		<div class="petal-wrap">
	        <div class="petal"></div>
		</div>
		<div class="petal-wrap">
	        <div class="petal"></div>
		</div>
		<div class="petal-wrap">
	        <div class="petal"></div>
		</div>
		<div class="flower-heart">
			<div class="eye left-eye"></div>
			<div class="eye right-eye"></div>
			<div class="mouth"></div>
		</div>
	</div>
	动画过程： 素描圆--》花瓣成型--》整体成型--》上色--》 形状优化 
	<div class="animation-kaikaikiki">
		<div class="a-petal-wrap">
	        <div class="a-petal"></div>
		</div>
		<div class="a-flower-heart">
			<div class="a-eye a-left-eye"></div>
			<div class="a-eye a-right-eye"></div>
			<div class="a-mouth"></div>
		</div>
	</div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style>
body{
	margin:0;
}

/*
.petal {
  position: absolute;
  width: 2.88675em;
  height: 2.5em;
  background: linear-gradient(135deg, #e700fc 0%, #ff5bff 75%, #ffc1ff 100%);
  border-radius: 0 50% 50% 50%;
  box-shadow: -2px -2px 20px rgba(255, 255, 255, 0.5) inset, 0px 0px 2px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  transition: opacity 0.25s ease-in-out;
  opacity: 1;
  animation: ani1 2s ease-in-out infinite;
  animation-delay: 0s;
  transform: translateY(6.25em) translateX(11.05662em) rotate(-30deg) skewX(30deg) scale(1);
}*/
.kaikaikiki-flower{
	font-size: 100px;
	position: relative;
}
/*花瓣*/
.petal{
	position:absolute;
	width:.66em;
	height: .66em;
	border:2px solid #232;
	/*box-shadow: 2px 2px 2px white;*/

	top:1.53em;
	left:1.53em;

	border-radius: 0 50% 50% 50%;

	transform-origin: 0 0;
	transform: skewX(30deg);

}
.petal-wrap{
	/*旋转的圆心*/
	transform-origin: 1.33em 1.33em;
}
/*花心*/
.flower-heart{
	border:2px solid #232;
	width:1.1em;
	height: 1.1em;
	border-radius: 50%;
	position: absolute;
	left:1.33em;
	top:1.33em;
	transform:translate(-50%,-50%);
	background: rgb(255,233,92);
}
/*眼睛嘴巴*/
.eye{
	width:.13em;
	height: .16em;
	border:1px solid black;
	border-radius: 50%;
	position: absolute;
	background: black;
	/*眼影*/
	box-shadow: 1px 2px 3px rgba(0,0,0,.5);
}
.eye:before{
	content: '';
	position: absolute;
	top:.02em;
	left:.02em;
	width: .04em;
	height: .053em;
	background: white;
	border-radius: 50%;
	transform: rotate(-40deg);
}
.eye:after{
	content: '';
	position: absolute;
	bottom:.02em;
	right:.02em;
	width: .04em;
	height: .04em;
	background: white;
	border-radius: 50%;
}

.left-eye{
	left:24%;
	top:26%;
}
.right-eye{
	right: 24%;
	top:26%;
}
.mouth{
	width:.6em;
	height: .33em;
	border-left:2px solid #232;
	border-right:2px solid #232;
	border-bottom:2px solid #232;
	border-radius: 0 0 .33em .33em;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top:56%;
	background: #ea1b2c;
}
/*上嘴唇*/
.mouth:before{
	width:.6em;
	height: .06em;
	background: inherit;
	content: '';
	position: absolute;
	top:-.05em;
	left:-2px;
	border-right: 2px solid #232;
	  border-left: 2px solid #232;
	  border-top: 2px solid #232;
	  border-radius: .6em .6em 0 0/.06em .06em 0 0;
}

/*花瓣旋转*/
.petal-wrap:first-child{
	transform: rotate(0deg);
}
.petal-wrap:nth-child(2){
	transform: rotate(30deg);
}
.petal-wrap:nth-child(3){
	transform: rotate(60deg);
}
.petal-wrap:nth-child(4){
	transform: rotate(90deg);
}
.petal-wrap:nth-child(5){
	transform: rotate(120deg);
}
.petal-wrap:nth-child(6){
	transform: rotate(150deg);
}
.petal-wrap:nth-child(7){
	transform: rotate(180deg);
}
.petal-wrap:nth-child(8){
	transform: rotate(210deg);
}
.petal-wrap:nth-child(9){
	transform: rotate(240deg);
}
.petal-wrap:nth-child(10){
	transform: rotate(270deg);
}
.petal-wrap:nth-child(11){
	transform: rotate(300deg);
}
.petal-wrap:nth-child(12){
	transform: rotate(330deg);
}
/*颜色*/
.petal-wrap:first-child .petal{
	background: rgb(62,131,26);
}
.petal-wrap:nth-child(2) .petal{
	background: rgb(54,141,46);
}
.petal-wrap:nth-child(3) .petal{
	background: rgb(24,157,78);
}
.petal-wrap:nth-child(4) .petal{
	background: rgb(66,218,247);
}
.petal-wrap:nth-child(5) .petal{
	background: rgb(49,119,206);
}
.petal-wrap:nth-child(6) .petal{
	background: rgb(23,26,31);
}
.petal-wrap:nth-child(7) .petal{
	background: rgb(61,39,79);
}
.petal-wrap:nth-child(8) .petal{
	background: rgb(224,65,109);
}
.petal-wrap:nth-child(9) .petal{
	background: rgb(246,89,62);
}
.petal-wrap:nth-child(10) .petal{
	background: rgb(235,187,59);
}
.petal-wrap:nth-child(11) .petal{
	background: rgb(218,161,25);
}
.petal-wrap:nth-child(12) .petal{
	background: rgb(178,140,70);
}


/*动画教程*/
.animation-kaikaikiki{
	display: block;
	position: absolute;
	left:500px;
}


</style>
