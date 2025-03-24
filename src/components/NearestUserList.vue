<template>
  <div class="nearest-user-list">
    <h2>Nearest Users to Hotels</h2>
    
    <div class="controls">
      <button @click="findNearestUsers" class="btn" :disabled="loading">
        {{ loading ? 'Finding...' : 'Find Nearest Users' }}
      </button>
    </div>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Finding nearest users...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="nearestUsers.length > 0" class="results">
      <div v-for="(result, index) in nearestUsers" :key="index" class="result-card">
        <div class="hotel-info">
          <h3>{{ result.hotel.name }}</h3>
          <p>Coordinates: {{ result.hotel.latitude }}, {{ result.hotel.longitude }}</p>
        </div>
        
        <div class="nearest-user-info">
          <h4>Nearest User: {{ result.nearestUser.name }}</h4>
          <p>Distance: {{ result.distance.toFixed(2) }} km</p>
          <p>User Location: {{ result.nearestUser.address.geo.lat }}, {{ result.nearestUser.address.geo.lng }}</p>
          <p>Email: {{ result.nearestUser.email }}</p>
        </div>
      </div>
    </div>
    
    <div v-else class="no-results">
      <p>Click the button above to find the nearest users to each hotel.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useUserStore } from '../stores/userStore';

export default defineComponent({
  name: 'NearestUserList',
  
  setup() {
    const userStore = useUserStore();
    
    const findNearestUsers = () => {
      userStore.findNearestUsers();
    };
    
    return {
      nearestUsers: computed(() => userStore.nearestUsers),
      loading: computed(() => userStore.loading),
      error: computed(() => userStore.error),
      findNearestUsers
    };
  }
});
</script>

<style scoped>
.nearest-user-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.controls {
  margin-bottom: 20px;
}

.btn {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn:hover:not(:disabled) {
  background-color: #1976d2;
}

.btn:disabled {
  background-color: #bbdefb;
  cursor: not-allowed;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  background-color: #ffebee;
  color: #c62828;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 20px;
}

.results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.result-card {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.hotel-info {
  background-color: #4caf50;
  color: white;
  padding: 15px;
}

.hotel-info h3 {
  margin: 0;
  margin-bottom: 5px;
}

.hotel-info p {
  margin: 0;
}

.nearest-user-info {
  padding: 15px;
}

.nearest-user-info h4 {
  margin-top: 0;
  color: #333;
}

.nearest-user-info p {
  margin: 8px 0;
}

.no-results {
  background-color: #e3f2fd;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
}
</style>

