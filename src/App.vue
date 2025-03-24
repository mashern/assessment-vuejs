<template>
  <div class="app">
    <header>
      <h1>User Location App</h1>
      <nav>
        <router-link to="/">Users</router-link>
        <router-link to="/nearest">Nearest Users</router-link>
      </nav>
    </header>
    
    <main>
      <router-view />
    </main>
    
    <footer>
      <p>&copy; {{ new Date().getFullYear() }} User Location App</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #2196f3;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header h1 {
  margin-bottom: 10px;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s;
}

nav a:hover,
nav a.router-link-active {
  border-color: white;
}

main {
  flex: 1;
  padding: 2rem;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>

