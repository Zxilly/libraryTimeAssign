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
                    />
                  </v-col>
                  <v-col
                      cols="6"
                  >
                    <v-text-field
                        label="学号"
                        :counter="10"
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
                              v-if="!!assign[i*5+j]"
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
            <v-spacer/>
            <v-btn text>
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
  data() {
    return {
      weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      timeparts: [8, 10, 14, 16, 18],
      assign: new Array(36),
    }
  },
  methods: {
    setAvailable: function (i, j) {
      console.log(i, j)
      this.$set(this.assign, i * 5 + j, !this.assign[i * 5 + j])
      //this.assign[i*5+j]=!this.assign[i*5+j]
    }
  }
}
</script>

<style scoped>
td:not(:last-child), th:not(:last-child) {
  border-right: thin solid rgba(0, 0, 0, 0.12);
}
</style>