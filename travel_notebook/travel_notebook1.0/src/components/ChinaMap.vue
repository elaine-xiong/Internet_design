<template>
  <div class="map-wrapper">
    <object
      type="image/svg+xml"
      data="/src/assets/china.svg"
      class="china-map"
      @load="bindEvents"
    ></object>
  </div>
</template>

<script>
export default {
  name: 'ChinaMap',
  emits: ['select'],
  methods: {
    bindEvents(e) {
      const svg = e.target.contentDocument
      const provinces = {
        shanghai: '上海',
        jiangsu: '江苏',
        zhejiang: '浙江'
      }

      Object.keys(provinces).forEach(id => {
        const el = svg.getElementById(id)
        if (el) {
          el.style.cursor = 'pointer'
          el.addEventListener('click', () => {
            this.$emit('select', provinces[id])
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.china-map {
  width: 500px;
}
</style>
