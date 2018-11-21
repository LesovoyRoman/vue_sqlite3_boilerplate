<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="data in datas">{{ data }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home Page',
      datas: []
    }
  },
  beforeCreate(){
    axios.get('http://localhost:7777/users_infos').then(res => {
        this.datas = res.data;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
