<template>
  <div class="diary-panel">
    <h2 v-if="province">📖 {{ province }} 旅行手账</h2>
    <p v-else>请点击地图中的省份</p>

    <!-- 日记卡片 -->
    <div
      v-for="item in diaries"
      :key="item.id"
      class="diary-card"
    >
      <div class="time">{{ item.time }}</div>

      <div v-if="editId !== item.id">
        <p>{{ item.content }}</p>
        <button @click="startEdit(item)">编辑</button>
        <button @click="deleteDiary(item.id)">删除</button>
      </div>

      <div v-else>
        <textarea v-model="editContent"></textarea>
        <button @click="saveEdit(item)">保存</button>
        <button @click="cancelEdit">取消</button>
      </div>
    </div>

    <!-- 新增日记 -->
    <div v-if="province" class="add-diary">
      <textarea
        v-model="newDiary"
        placeholder="写下这一段时间的旅行记录..."
      ></textarea>
      <button @click="addDiary">保存新记录</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  watch: {
  province(newVal) {
    if (!newVal) return
    axios
      .get('http://localhost:3000/api/diary', {
        params: { province: newVal }
      })
      .then(res => {
        this.diaryData[newVal] = res.data
      })
  }
},
  name: 'DiaryPanel',
  props: {
    province: String
  },
  data() {
    return {
      newDiary: '',
      editId: null,
      editContent: '',
      diaryData: {
        上海: [],
        江苏: [],
        浙江: []
      }
    }
  },
  computed: {
    diaries() {
      return this.diaryData[this.province] || []
    }
  },
  methods: {
    addDiary() {
  if (!this.newDiary.trim()) return

  const newItem = {
    id: Date.now(),
    province: this.province,
    content: this.newDiary,
    time: new Date().toLocaleString()
  }

  axios
    .post('http://localhost:3000/api/diary', newItem)
    .then(() => {
      this.diaryData[this.province].unshift(newItem)
      this.newDiary = ''
    })
},
    deleteDiary(id) {
  axios
    .delete(`http://localhost:3000/api/diary/${id}`)
    .then(() => {
      this.diaryData[this.province] =
        this.diaryData[this.province].filter(item => item.id !== id)
    })
},
    startEdit(item) {
      this.editId = item.id
      this.editContent = item.content
    },
    saveEdit(item) {
  axios
    .put('http://localhost:3000/api/diary', {
      id: item.id,
      content: this.editContent
    })
    .then(() => {
      item.content = this.editContent
      this.editId = null
      this.editContent = ''
    })
    },
    cancelEdit() {
      this.editId = null
      this.editContent = ''
    },
    
  }
}
</script>

<style scoped>
.diary-panel {
  width: 340px;
  padding: 20px;
  border-left: 1px solid #ddd;
}

.diary-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 12px;
  background: #fafafa;
}

.time {
  font-size: 12px;
  color: #888;
  margin-bottom: 6px;
}

textarea {
  width: 100%;
  height: 70px;
}

button {
  margin-right: 8px;
  margin-top: 6px;
}
</style>
