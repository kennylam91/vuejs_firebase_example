<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button>
      <router-link to="create">Create</router-link>
    </button>
    <table style="margin: 10px auto 0 auto" border cellpadding="10" >
      <tr>
        <th>Todo name</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    <tr v-for="(todo) in todoList" :key="todo.id">
      <td>
        {{todo.name}}
      </td>
      <td>{{todo.status}}</td>
      <td>
        <button>
          <router-link :to="{path:`edit/${todo.id}`}">Edit</router-link>
        </button>
        <input type="button" value="Delete">
      </td>
    </tr>
  </table>
  </div>
</template>

<script>
import firebase from '../FireBase'
export default {
  name: 'HelloWorld',
  data () {
    return {
      ref: firebase.firestore().collection('todos'),
      todoList: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.todoList = []
      querySnapshot.forEach((todo) => {
        console.log(todo.data())
        this.todoList.push({
          id: todo.id,
          name: todo.data().name,
          status: todo.data().status
        })
      })
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
