<template>
  <div>
    <h2>Create Todo</h2>
    <form @submit="submitCreateTodo">
      <label for="">Name</label>
      <input v-model="todo.name" type="text" />
      <label for="">Status</label>
      <select id="status" v-model="todo.status">
        <option value="1">Will do</option>
        <option value="2">Doing</option>
        <option value="3">Done</option>
      </select>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
import firebase from '../FireBase'
import router from '../router/index'
export default {
  data () {
    return {
      ref: firebase.firestore().collection('todos'),
      todo: {
        name: '',
        status: 1
      }
    }
  },
  methods: {
    submitCreateTodo () {
      console.log(this.todo)
      if (!this.todo.id) {
        this.ref.add(this.todo).then(response => {
          console.log(response)
          this.todo.name = ''
          this.todo.status = 1
          router.push({
            name: 'HelloWorld'
          })
        })
      } else {
        const updateRef = this.ref.doc(this.todo.id)
        updateRef.set(this.todo).then((docRef) => {
          this.resetTodo()
          router.push({path: '/'})
        }).catch(error => {
          console.log(error)
        })
      }
    },
    resetTodo () {
      this.todo.name = ''
      this.todo.status = 1
      this.todo.id = null
    }
  },
  created () {
    console.log(this.$route)
    if (this.$route.name === 'Edit') {
      const id = this.$route.params.id
      const ref = this.ref.doc(id)
      ref.get().then(doc => {
        console.log(doc)
        if (doc.exists) {
          this.todo.id = doc.id
          this.todo.name = doc.data().name
          this.todo.status = doc.data().status
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
