<script setup lang="ts">
import { ref } from 'vue'

interface Emits {
  (e: 'submit', value: string): void
}

const emit = defineEmits<Emits>()

const inputValue = ref('')

const handleSubmit = () => {
  const trimmedValue = inputValue.value.trim()
  if (trimmedValue) {
    emit('submit', trimmedValue)
    inputValue.value = ''
  }
}
</script>

<template>
  <h3>Add Location</h3>
  <v-text-field
    v-auto-focus
    v-model="inputValue"
    dense
    label="City"
    variant="outlined"
    @keyup.enter="handleSubmit"
    hide-details
  >
    <template #append>
      <v-btn @click="handleSubmit" :disabled="!inputValue.trim()" class="h-100"> Add </v-btn>
    </template>
  </v-text-field>
</template>
