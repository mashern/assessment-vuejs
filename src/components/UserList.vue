<template>
    <div class="user-list">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading users...</p>
      </div>
      
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="fetchUsers" class="retry-btn">Retry</button>
      </div>
      
      <div v-else>
        <div class="user-controls">
          <button @click="showAddUserForm = !showAddUserForm" class="btn">
            {{ showAddUserForm ? 'Cancel' : 'Add User' }}
          </button>
        </div>
        
        <div v-if="showAddUserForm" class="add-user-form">
          <h3>Add New User</h3>
          <form @submit.prevent="addUser">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="newUser.name" required>
            </div>
            
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" v-model="newUser.username" required>
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="newUser.email" required>
            </div>
            
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="text" id="phone" v-model="newUser.phone">
            </div>
            
            <div class="form-group">
              <label for="website">Website</label>
              <input type="text" id="website" v-model="newUser.website">
            </div>
            
            <div class="form-group">
              <label for="lat">Latitude</label>
              <input type="text" id="lat" v-model="newUser.address.geo.lat">
            </div>
            
            <div class="form-group">
              <label for="lng">Longitude</label>
              <input type="text" id="lng" v-model="newUser.address.geo.lng">
            </div>
            
            <button type="submit" class="btn submit-btn">Add User</button>
          </form>
        </div>
        
        <div class="users-grid">
          <div v-for="user in users" :key="user.id" class="user-card">
            <div class="user-header">
              <h3>{{ user.name }}</h3>
              <div class="user-actions">
                <button @click="deleteUser(user.id)" class="delete-btn">Delete</button>
              </div>
            </div>
            
            <div class="user-details">
              <p><strong>Username:</strong> {{ user.username }}</p>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Phone:</strong> {{ user.phone }}</p>
              <p><strong>Website:</strong> {{ user.website }}</p>
              <p><strong>Location:</strong> {{ user.address.geo.lat }}, {{ user.address.geo.lng }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import { useUserStore } from '../stores/userStore';
  
  export default defineComponent({
    name: 'UserList',
    
    setup() {
      const userStore = useUserStore();
      const showAddUserForm = ref(false);
      
      const newUser = ref<any>({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: ''
          }
        },
        company: {
          name: '',
          catchPhrase: '',
          bs: ''
        }
      });
      
      const resetForm = () => {
        newUser.value = {
          name: '',
          username: '',
          email: '',
          phone: '',
          website: '',
          address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: {
              lat: '',
              lng: ''
            }
          },
          company: {
            name: '',
            catchPhrase: '',
            bs: ''
          }
        };
      };
      
      const addUser = async () => {
        await userStore.addUser(newUser.value);
        resetForm();
        showAddUserForm.value = false;
      };
      
      const fetchUsers = () => {
        userStore.fetchUsers();
      };
      
      const deleteUser = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
          userStore.deleteUser(id);
        }
      };
      
      onMounted(() => {
        fetchUsers();
      });
      
      return {
        users: computed(() => userStore.users),
        loading: computed(() => userStore.loading),
        error: computed(() => userStore.error),
        showAddUserForm,
        newUser,
        addUser,
        fetchUsers,
        deleteUser
      };
    }
  });
  </script>
  
  <style scoped>
  .user-list {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
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
  
  .retry-btn {
    background-color: #c62828;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .user-controls {
    display: flex;
    justify-content: flex-end;
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
  
  .btn:hover {
    background-color: #1976d2;
  }
  
  .add-user-form {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  
  .add-user-form h3 {
    margin-top: 0;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .submit-btn {
    margin-top: 10px;
    background-color: #4caf50;
  }
  
  .submit-btn:hover {
    background-color: #388e3c;
  }
  
  .users-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .user-card {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .user-header {
    background-color: #2196f3;
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .user-header h3 {
    margin: 0;
  }
  
  .user-actions {
    display: flex;
    gap: 10px;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-btn:hover {
    background-color: #d32f2f;
  }
  
  .user-details {
    padding: 15px;
  }
  
  .user-details p {
    margin: 8px 0;
  }
  </style>