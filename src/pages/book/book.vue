<template>
  <div>
    <Card v-for="book in books" :key="book.id" :book='book'></Card>
  </div>
</template>
<script>
import {get} from '@/util'
import Card from '@/components/card'
export default {
  data(){
    return {
      books: []
    }
  },
  methods: {
    async getList() {
      const books = await get('/weapp/booklist')
      this.books = books.list
      console.log(this.books)
    }
  },
  mounted() {
    this.getList()
  },
  components: {
    Card
  }
}
</script>
<style scoped>
</style>
