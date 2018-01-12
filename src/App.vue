<template>
  <v-app id="inspire" dark>
    <!-- <v-navigation-drawer temporary v-model="drawer" app>
      <v-list dense style="margin-top: 60px">
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <div class="text-xs-left burger" style="">
      <button class="hamburger hamburger--collapse" type="button" :class="{ ' is-active ': drawer}" @click.stop="toggleDrawer">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div> -->


    <router-view />

    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import "../static/vendor/hamburgers/_sass/hamburgers/hamburgers.scss"
  export default {
    data: () => ({
      drawer: false,

    }),
    methods: {

      toggleDrawer: function (e) {
        this.drawer = !this.drawer

        return
      }

    },
    props: {
      source: String
    }
  }
</script>

<style>
  /* @import "hamburgers/_sass/hamburgers/hamburgers"; */

  .toolbar {
    -webkit-transition: none;
    transition: none;
    -webkit-box-shadow: none;
    box-shadow: none;

  }

  button:focus {
    outline: 0;
  }

  .burger {
    position: fixed;
    top: 10px;
    left: 10px;
    background: #424242;
    z-index: 20;
  }
</style>