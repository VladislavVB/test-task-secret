import { ref, type Ref } from 'vue'

export interface DragAndDropComposable {
  dragStartIndex: Ref<number | null>
  dragOverIndex: Ref<number | null>
  onDragStart: (index: number, event: DragEvent) => void
  onDragEnd: () => void
  onDragOver: (index: number, event: DragEvent) => void
  onDragEnter: (index: number) => void
  onDragLeave: () => void
  onDrop: (
    targetIndex: number,
    event: DragEvent,
    moveCallback: (from: number, to: number) => void,
  ) => void
  moveItem: <T>(items: T[], fromIndex: number, toIndex: number) => T[]
}

export const useDreagAndDrop = (): DragAndDropComposable => {
  const dragStartIndex = ref<number | null>(null)
  const dragOverIndex = ref<number | null>(null)

  const onDragStart = (index: number, event: DragEvent) => {
    dragStartIndex.value = index
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', index.toString())
    }
  }

  const onDragEnd = () => {
    dragStartIndex.value = null
    dragOverIndex.value = null
  }

  const onDragOver = (index: number, event: DragEvent) => {
    event.preventDefault()
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
  }

  const onDragEnter = (index: number) => {
    if (dragStartIndex.value !== null && dragStartIndex.value !== index) {
      dragOverIndex.value = index
    }
  }

  const onDragLeave = () => {
    dragOverIndex.value = null
  }

  const onDrop = (
    targetIndex: number,
    event: DragEvent,
    moveCallback: (from: number, to: number) => void,
  ) => {
    event.preventDefault()

    if (dragStartIndex.value === null || dragStartIndex.value === targetIndex) {
      dragOverIndex.value = null
      return
    }

    moveCallback(dragStartIndex.value, targetIndex)
    dragStartIndex.value = null
    dragOverIndex.value = null
  }

  const moveItem = <T>(items: T[], fromIndex: number, toIndex: number): T[] => {
    if (fromIndex < 0 || fromIndex >= items.length || toIndex < 0 || toIndex >= items.length) {
      return items
    }

    const newItems = [...items]
    const [movedItem] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, movedItem!)
    return newItems
  }

  return {
    dragStartIndex,
    dragOverIndex,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
    moveItem,
  }
}
