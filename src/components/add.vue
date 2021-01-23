<template>
  <v-container
      class="mt-6"
  >
    <v-row
        justify="center"
    >
      <v-col
          cols="6"
      >
        <v-card>
          <v-card-text>
            <v-form
                ref="form"
            >
              <v-container>
                <v-row>
                  <v-col
                      cols="6"
                  >
                    <v-text-field
                        label="姓名"
                        :counter="6"
                        autocomplete="off"
                        v-model="name"
                    />
                  </v-col>
                  <v-col
                      cols="6"
                  >
                    <v-text-field
                        label="学号"
                        :counter="10"
                        autocomplete="off"
                        v-model="studentID"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                      cols="12"
                  >
                    <v-simple-table>
                      <thead>
                      <tr>
                        <th
                            colspan="8"
                            style="text-align: center"
                        >
                          选择可用时间
                        </th>
                      </tr>
                      <tr>
                        <th></th>
                        <th
                            v-for="(weekday,i) in weekdays"
                            :key="i"
                        >{{ weekday }}
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr
                          v-for="(weektime,j) in timeparts"
                          :key="j"
                      >
                        <td>
                          {{ weektime + " - " + (weektime + 2) }}
                        </td>
                        <td
                            v-for="(weekday,i) in weekdays"
                            :key="i"
                            @click="setAvailable(i,j)"
                            style="text-align: center"
                        >
                          <v-icon
                              v-if="assign.indexOf(i*5+j)!==-1"
                              color="success"
                          >
                            mdi-checkbox-blank-circle
                          </v-icon>
                        </td>
                      </tr>
                      </tbody>
                      <tfoot>
                      <tr>
                        <td
                            colspan="8"
                        >
                          点击格子添加/删除对应的时间块
                        </td>
                      </tr>
                      </tfoot>
                    </v-simple-table>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-card-text>已添加学生 {{ this.$bus.studentCount }}</v-card-text>

            <v-spacer/>
            <v-btn
                @click="save"
                text>
              提交
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "add",
  created() {
    if (localStorage.getItem('studentData')!==null){
      this.$bus.studentData = JSON.parse(localStorage.getItem('studentData'))
    } else {
      this.$bus.studentData = []
    }
    if (localStorage.getItem('studentCount')!==null){
      this.$bus.studentCount = JSON.parse(localStorage.getItem('studentCount'))
    } else {
      this.$bus.studentCount = 0
    }


  },
  data: () => ({
    name: '',
    studentID: '',
    weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    timeparts: [8, 10, 14, 16, 18],
    assign: [],
  }),
  methods: {
    setAvailable: function (i, j) {
      // console.log(i, j)
      let index = i * 5 + j
      if (this.assign.indexOf(index) !== -1) {
        this.assign.splice(this.assign.indexOf(index), 1)
      } else {
        this.assign.push(index)
      }
    },
    save: function () {
      if (!this.studentID) {
        this.$bus.$emit('snackbar', ['学号未填写', 'error'])
        return
      }

      if (!this.name) {
        this.$bus.$emit('snackbar', ['姓名未填写', 'error'])
        return;
      }

      if (this.assign.length === 0) {
        this.$bus.$emit('snackbar', ['可用时间未填写', 'error'])
        return;
      }

      let studentData = this.$bus.studentData

      for (let student of studentData) {
        if (student['studentID'] === this.studentID) {
          this.$bus.$emit('snackbar', ['此学生已经添加', 'error'])
          return;
        }
      }

      this.assign.sort((a,b)=>(a-b))

      studentData.push({
        'studentID': this.studentID,
        'name': this.name,
        'assign': this.assign
      })

      this.$bus.studentCount++

      this.$bus.$emit('snackbar', ['此学生添加成功', 'success'])

      //console.log(this.$bus.studentData)
      //console.log(this.$bus.studentCount)

      localStorage.setItem('studentData',JSON.stringify(this.$bus.studentData))
      localStorage.setItem('studentCount',JSON.stringify(this.$bus.studentCount))

      this.assign = []
      this.studentID = ''
      this.name = ''
    }
  }
}
</script>

<style scoped>
td:not(:last-child), th:not(:last-child) {
  border-right: thin solid rgba(0, 0, 0, 0.12);
}
</style>