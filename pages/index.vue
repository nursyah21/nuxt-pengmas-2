<template>
    hi mom
</template>

<script setup>
useSeoMeta({
  titleTemplate: (title) => {
    return title ? `${title} | Analisis Kelayakan Usaha` : 'Analisis Kelayakan Usaha'
  },
})
// move to dashboard
navigateTo('/dashboard')
</script>