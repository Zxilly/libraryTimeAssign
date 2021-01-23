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
            <v-simple-table>
              <thead>
              <tr>
                <th
                    colspan="8"
                    style="text-align: center">排班表
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
                    style="text-align: center"
                >

                </td>
              </tr>
              </tbody>
            </v-simple-table>

          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "generate",
  data: () => ({
    weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    timeparts: [8, 10, 14, 16, 18],
    assign: [],
    studentGather: [],
    studentWorkGather: [],
    studentWorkCounter: {}
  }),
  mounted () {
    console.log("update")
    let studentData = this.$bus.studentData
    if (studentData===undefined){
      return
    }
    for (let student of studentData){
      this.studentGather[student.studentID] = student.name
      this.studentWorkCounter[student.studentID] = 3
      for (let oneWork of student.assign){
        if (!this.studentWorkGather[oneWork]){
          this.studentWorkGather[oneWork] = []
        }
        this.studentWorkGather[oneWork].push(student.studentID)
      }
    }
  },
}
</script>

<style scoped>
td:not(:last-child), th:not(:last-child) {
  border-right: thin solid rgba(0, 0, 0, 0.12);
}
</style>