<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="padding: 10px;margin-bottom:10px">
    <router-link to="/" class="navbar-brand">ASHITA</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">

        <router-link
          v-for="link in links"
          v-if="showOnNav(link)"
          tag="li" :to="link.path" class="nav-item"
          :key="link.path"
        >
          <a class="nav-link">{{link.meta.humanName}}</a>
        </router-link>

      </ul>
      <ul class="navbar-nav my-2 my-md-0 mr-md-3 ">

      </ul>
    </div>
  </nav>
</template>

<script>
import store from "@/store";

export default {
  name: 'app-nav',
  data() {
    return {
      links: []
    }
  },
  methods: {
    showOnNav(link) {
      return link.meta && link.meta.showOnNav
    }
  },
  beforeMount() {
    this.links = this.$router.options.routes;
  }
}
</script>
