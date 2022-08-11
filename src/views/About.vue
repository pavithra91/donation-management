<template>
  <form>
    <label>Campaign Name</label>
    <input type="text" />

  </form>
</template>

<script>

export default ({
data(){
  return{
    campaignName: "",
    campaignNameRules: [(v) => !!v || "Campaign Name required"],
  }
}
})
</script>



<style scoped>
form{
max-width: 420px;
margin: 30px auto;
background: white;
text-align: left;
padding: 40px;
border-radius: 10px;  
}

label{
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 15px;
  letter-spacing: 1px;
  font-weight: bold;
}

input{
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
</style>