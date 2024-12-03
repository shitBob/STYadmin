<template>
   <div class="common-layout" style="width: 1000px;height: 800px; ">
  <h1>学员数据展示</h1>
    <el-container >
    
      <el-header>
        
  <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content ep-bg-purple" ><el-date-picker
          v-model="timeValue"
          type="month"
          placeholder="选择考试的月份"
          size="default"
          style="width: 200px;"
          format="YYYY/MM"
          value-format="YYYY-MM"
        /></div></el-col>
    <el-col :span="6"><div class="grid-content ep-bg-purple" > <el-select
      v-model="professionValue"
      placeholder="Select"
      size="default"
      style="width:200px; "
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        style="width:200px;height: 40px;"
      />
    </el-select></div></el-col>
    <el-col :span="6"><div class="grid-content ep-bg-purple" ><el-checkbox v-model="checked1" label="仅展示考试优秀不满3次的学员"
        size="large" /></div></el-col>
    <el-col :span="6"><div class="grid-content ep-bg-purple" > <el-input v-model="input_name" style="width:200px" placeholder="请输入学员姓名" /></div></el-col>
  </el-row>
        
         

        </el-header>
        <el-button type="primary" size="large" @click="getData">查询</el-button>

      <el-main> 
        <el-scrollbar style="height: 500px;">
         <el-table
    :data="tableData"
    style="width: 100%"
   
  >
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="90" />
    <el-table-column prop="profession" label="工种" width="90" />
    <el-table-column prop="score" label="考试情况"  />
    <el-table-column
      prop="tag"
      label="Tag"
      width="100"
      :filters="[
        { text: '合格', value: true },
        { text: '未合格', value: false },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.flag === true ? 'success' : 'warning'"
          disable-transitions
          >{{ scope.row.flag ? '合格' : '未合格' }}</el-tag
        >
      </template>
    </el-table-column>
  </el-table>
 </el-scrollbar>
</el-main>
    </el-container>
  </div>
 


</template>

<script setup lang="ts">
import { ref ,Ref} from 'vue'
import {instance} from '@/instance'
import {useMemberStore} from '@/stores/member'
const timeValue = ref('')
const professionValue = ref(0)
const checked1 = ref(false)
const input_name = ref('')
const memberStore = useMemberStore()
const options = [
  {
    value: 1,
    label: '低压',
  },
  {
    value: 2,
    label: '高压',
  },
  {
    value: 3,
    label: '高处',
  },
  {
    value: 4,
    label: '焊工',
  },
  {
    value: 0,
    label: '选择工种',
  },
]
const filterTag = (value: boolean, row: User) => {
  return row.flag === value
}



interface User {
  date: string
  name: string
  profession: string
  score: Array<number>
    flag: boolean
}



const tableData:Ref<User[]> = ref([])
const getData = () => {
    console.log(timeValue.value)
    instance.post('/administrator/search',{
        token: memberStore.profile.token,
        time: timeValue.value,
        name: input_name.value,
        profession: professionValue.value,
        flag: checked1.value
    }).then(res =>{
        if (res.data.code === 200) {
            tableData.value=res.data.data.table;
            console.log(tableData)
        }
    })
}

</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.common-layout {
    padding: 20px;
    background-color: #f0f2f5;
}
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .container {
  flex: 1;
  border-right: solid 1px var(--el-border-color);
}

.demo-date-picker .container .block {
  border-right: none;
}

.demo-date-picker .container .block:last-child {
  border-top: solid 1px var(--el-border-color);
}

.demo-date-picker .container:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>