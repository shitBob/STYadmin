<template>
  <router-view/>
</template>

<script setup lang="ts">
 import { useRouter } from 'vue-router'
  const router = useRouter()
  router.push('/login')

</script>

<style lang="scss" scoped>

</style>