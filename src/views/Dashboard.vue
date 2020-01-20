<template>
  <div>
    <h1>Dashboard</h1>
    <template v-if="loggedIn">
      <template v-if="!isLoading">
        <EventCard v-for="event in events" :key="event.id" :event="event" />
      </template>
      <p v-else>
        Loading events
      </p>
    </template>
    <template v-else>
      To use this app you'll need to
      <router-link to="/login">
        Login
      </router-link>
      or
      <router-link to="/register">
        Register
      </router-link>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import EventCard from '../components/EventCard'
import { authComputed } from '@/services/AuthHelpers.js'

export default {
  components: { EventCard },
  data () {
    return {
      isLoading: true,
      events: []
    }
  },
  computed: {
    ...authComputed
  },
  created () {
    if(this.loggedIn) {
      axios.get('//localhost:3000/dashboard').then(({ data }) => {
        this.events = data.events.events
        this.isLoading = false
      })
    }
  }
}
</script>
