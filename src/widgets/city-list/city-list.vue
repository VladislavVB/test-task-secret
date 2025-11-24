<script setup lang="ts">
import type { City } from '@/entities/city/city.interface'
import { ref, watch } from 'vue'
import { useDreagAndDrop } from '@/shared/composables/use-drag-and-drop'

interface Props {
  cities: City[]
}

const props = withDefaults(defineProps<Props>(), {
  cities: () => [],
})

const emit = defineEmits<{
  'update:cities': [cities: City[]]
  'cities-reordered': [cities: City[]]
  edit: [index: number]
  delete: [index: number]
}>()

const cities = ref<City[]>([...props.cities])

const {
  dragOverIndex,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  moveItem,
} = useDreagAndDrop()

watch(
  () => props.cities,
  (newCities) => {
    cities.value = [...newCities]
  },
  { deep: true },
)

const handleCityMove = (fromIndex: number, toIndex: number) => {
  const newCities = moveItem(cities.value, fromIndex, toIndex)
  updateCities(newCities)
}

const updateCities = (newCities: City[]) => {
  cities.value = newCities
  emit('update:cities', newCities)
  emit('cities-reordered', newCities)
}
</script>

<template>
  <div class="d-flex flex-column">
    <template v-if="cities.length">
      <div
        v-for="(city, index) in cities"
        :key="index"
        class="city-item mb-4"
        :class="{ 'drag-over': dragOverIndex === index }"
        @dragover.prevent="onDragOver(index, $event)"
        @drop="onDrop(index, $event, handleCityMove)"
        @dragenter.prevent="onDragEnter(index)"
        @dragleave="onDragLeave"
      >
        <div
          class="drag-handle"
          draggable="true"
          @dragstart="onDragStart(index, $event)"
          @dragend="onDragEnd"
        >
          <v-icon>mdi-menu</v-icon>
        </div>

        <div class="city-content">
          <span>{{ city.name }}</span>
        </div>

        <div>
          <v-btn icon variant="text" size="small" @click="emit('delete', index)">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </template>
    <div v-else class="text-center my-4">
      <p>Use "Add Location"</p>
    </div>
  </div>
</template>
