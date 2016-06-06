<template>
    <!-- 若时间块被删除，则不显示 -->
    <template v-if="record.day!=0||record.week!=0">
      <template v-if="record.day!=undefined">
        <div class="pubu-day-and-time">
          <div class="pubu-day">{{record.day}}</div><div class="pubu-week-day"><div class="pubu-week-day-font">{{record.week}}</div></div>
          <div class="pubu-time"> {{record.time}}</div>
       </div>
      </template>
    </template>
</template>
<script>
export default {
  props: ['record', 'screenScale'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pubu-day-and-time{
    overflow: hidden;
    margin-bottom: 1%;
  }
  .pubu-week-day,.pubu-day,.pubu-time {
    vertical-align: middle;
    display: inline-block;
    font-size: 13px;
    height: 28px;
    line-height: 28px;
    text-align: center;
  }
  .pubu-day{
    background: #e53c3c;
    color: white;
    width:40px;
    font-size: 15px;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;

  }
  .pubu-time{
    color:#999999;
    margin-left:10px;
    font-size:12px;
  }
  .pubu-week-day{
    background: #f27e7e;
    color: white;
    width:45px;
    position: relative;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }
  .pubu-week-day-font{
    position: absolute;
    left:0;
  }
  .pubu-week-day:before{
    content:'';
    position: absolute;
    left:0px;
    top:0px;
    background: #f27e7e;
    width:14px;
    height: 32px;
    border-left:2px solid white;
    transform: rotate(20deg);
    transform-origin: 0 0;
  }

.day-and-time {
    font-size: 14px;
    display: block;
    vertical-align: top;
    font-family: Georgia, Times, TimesNR, 'New York', serif;
    margin-bottom: 1%;
}
.week-day {
    vertical-align: middle;
    display: inline-block;
    font-size: 12px;
}

.record .content {
    display: inline-block;
    vertical-align: top;
}

.day-and-time .day {
    font-weight: bold;
    color: #846059;
    text-align: center;
    width: 55px;
    vertical-align: middle;
}

.day-and-time .time {
    vertical-align: middle;
    font-size: 100%;
    text-align: center;
    line-height: 140%;
    display: inline-block;
    color: #000000;
}
.date-icon {
    vertical-align: middle;
  width: 38px;
  height: 32px;
  display: inline-block;
    cursor: pointer;
    background: url("../assets/dates.png");
}
.date-1 {
  background-position: 20% -0%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-2 {
  background-position: 60% 60%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-3 {
  background-position: -0% 20%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-4 {
  background-position: 20% 20%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-5 {
  background-position: 40% -0%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-6 {
  background-position: 40% 20%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-7 {
  background-position: -0% 40%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-8 {
  background-position: 20% 40%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-9 {
  background-position: 40% 40%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-10 {
  background-position: 60% -0%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-11 {
  background-position: 60% 20%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-12 {
  background-position: 60% 40%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-13 {
  background-position: -0% 60%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-14 {
  background-position: 20% 60%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-15 {
  background-position: 40% 60%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-16 {
  background-position: -0% -0%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-17 {
  background-position: 80% -0%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-18 {
  background-position: 80% 20%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-19 {
  background-position: 80% 40%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-20 {
  background-position: 80% 60%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-21 {
  background-position: -0% 80%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-22 {
  background-position: 20% 80%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-23 {
  background-position: 40% 80%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-24 {
  background-position: 60% 80%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-25 {
  background-position: 80% 80%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-26 {
  background-position: 100% -0%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-27 {
  background-position: 100% 20%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-28 {
  background-position: 100% 40%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-29 {
  background-position: 100% 60%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-30 {
  background-position: 100% 80%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}

.date-31 {
  background-position: -0% 100%;
  background-repeat: no-repeat;
  background-size: 600% 600%;
}
/*瀑布流排版样式 结束*/


</style>
