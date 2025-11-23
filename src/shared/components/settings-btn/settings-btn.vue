<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToSetting() {
  router.push({ name: 'SettingsCityList' })
}
</script>

<template>
  <v-btn flat @click="goToSetting" icon><v-icon>mdi-cog-outline</v-icon></v-btn>
</template>
