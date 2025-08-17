// API client for the byNolo backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Projects API
  async getProjects() {
    return this.request('/api/projects');
  }

  async getProject(id) {
    return this.request(`/api/projects/${id}`);
  }

  // Contact API
  async submitContactForm(data) {
    return this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Stats API
  async getStats() {
    return this.request('/api/stats');
  }

  // Hub API
  async getHubItems(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.status) params.append('status', filters.status);
    
    const endpoint = `/api/hub${params.toString() ? '?' + params.toString() : ''}`;
    return this.request(endpoint);
  }

  async getHubItem(id) {
    return this.request(`/api/hub/${id}`);
  }

  async getHubCategories() {
    return this.request('/api/hub/categories');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();
export default apiClient;

// Named exports for individual methods
export const {
  getProjects,
  getProject,
  submitContactForm,
  getStats,
  getHubItems,
  getHubItem,
  getHubCategories,
  healthCheck
} = apiClient;
