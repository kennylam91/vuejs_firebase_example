<template>
  <div>
    <h2>Create Todo</h2>
  </div>
</template>

<script>
import firebase from '../FireBase'
export default {
  data () {
    return {
      ref: firebase.firestore().collection('todos'),
      newTodo: {}
    }
  }
}
</script>
