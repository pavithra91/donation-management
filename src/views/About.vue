<template>

<v-container>
<div style="margin-top: 150px;"></div>

<div class="wrapper">
  <div class="static-txt">I'm</div>
  <ul class="dynamic-txts">
    <li><span>Youtuber</span></li>
    <li><span>Designer</span></li>
    <li><span>Developer</span></li>
  </ul>
</div>
</v-container>
</template>
 
<script>

</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrapper{
  display: flex;
}
.wrapper .static-txt{
  color: black;
  font-size: 60px;
  font-weight: 400;
}

.wrapper .dynamic-txts{
  margin-left: 15px;
  line-height: 90px;
  height: 90px;
  overflow: hidden;
}
.dynamic-txts li{
  list-style:none;
  color: red;
  font-size: 60px;
  font-weight: 500;
  top:0;
  position: relative;
  
  animation: slide 12s steps(4)
  infinite;
}
.dynamic-txts li {
  position: relative;
}

.dynamic-txts li ::after{
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;
  border-left: 2px solid red;
  left:0;
  animation: typing 3s steps(10)
  infinite;
}

@keyframes typing{
  40%,
  60%{
    left: calc(100% + 30px);
  }
  100%{
    left:0;
  }
}

@keyframes slide{
  100%{
    top: -360px;
  }
}
</style>