<template>
<div>
  <img src="@/assets/logo.png" alt="logo">
  <p>{{ msg }}</p>
  <button @click="getAxiosData()">Axios Test</button>
  <br/>
  <br/>
  <div class="result">{{ result }}</div>
</div>
</template>
<script>
const axios = require('axios');
export default {
  name: 'IndexPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      result: ['axios test']
    }
  },
  methods: {
    getAxiosData() {
      axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => {
        this.result = response.data;
      }, (error) => {
        this.result = error;
      });
    }
  }
}
</script>
