<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-toolbar-title
      >timeAssign
      </v-toolbar-title>
      <v-spacer/>
      <router-link
          v-if="this.$route.path!=='/add'"
          to="/add">
        <v-btn
            text
        >
          添加
        </v-btn>
      </router-link>
      <router-link
          v-if="this.$route.path!=='/generate'"
          to="/generate"
      >
        <v-btn
            text
        >
          重新排班
        </v-btn>
      </router-link>
      <router-link
          v-if="this.$route.path!=='/'"
          to="/"
      >
        <v-btn
            text
        >
          回到主页
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <v-snackbar
          v-model="snackbarBool"
          :color="snackbarColor"
          top
      >
        {{ snackbarMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn
              dark
              text
              v-bind="attrs"
              @click="snackbarBool = false"
          >
            关闭
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    this.$bus.$on('snackbar', this.showSnackbar)
  },
  data: () => ({
    snackbarBool: false,
    snackbarMessage: '',
    snackbarColor: '',
    title: {
      '/': '欢迎',
      '/add': '添加',
      '/generate': '生成排班表'
    },
  }),
  methods:{
    showSnackbar: function (arg) {
      this.snackbarMessage = arg[0]
      this.snackbarColor = arg[1]
      this.snackbarBool = true
    }
  }
};
</script>
