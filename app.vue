<template>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
  
</template>

<script setup lang="ts">
useSeoMeta({
  titleTemplate: (title) => {
    return title ? `${title} | Analisis Kelayakan Usaha` : 'Analisis Kelayakan Usaha'
  },
})
</script>