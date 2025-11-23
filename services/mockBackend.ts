import { User, ServiceRequest, ServiceStatus, UserRole, DeliveryMethod } from '../types';

const USERS_KEY = 'skoczek_users';
const REQUESTS_KEY = 'skoczek_requests';
const CURRENT_USER_KEY = 'skoczek_current_user';

// Initialize mock DB if empty
const initDB = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(REQUESTS_KEY)) {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify([]));
  }
};

export const MockBackend = {
  // --- Auth ---
  register: async (name: string, email: string, phone: string, password: string): Promise<User> => {
    initDB();
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    if (users.find(u => u.email === email)) {
      throw new Error('Użytkownik o podanym adresie email już istnieje.');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      role: UserRole.CLIENT,
      password // storing plain text strictly for demo purposes
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return newUser;
  },

  login: async (email: string, password: string): Promise<User> => {
    initDB();
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Nieprawidłowy email lub hasło.');
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  // --- Requests ---
  createRequest: async (
    userId: string, 
    data: { 
      componentModel: string; 
      problemDescription: string; 
      deliveryMethod: DeliveryMethod; 
      preferredDate: string 
    }
  ): Promise<ServiceRequest> => {
    initDB();
    const requests: ServiceRequest[] = JSON.parse(localStorage.getItem(REQUESTS_KEY) || '[]');
    
    const newRequest: ServiceRequest = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      createdAt: new Date().toISOString(),
      status: ServiceStatus.PENDING,
      ...data
    };

    requests.push(newRequest);
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return newRequest;
  },

  getUserRequests: async (userId: string): Promise<ServiceRequest[]> => {
    initDB();
    const requests: ServiceRequest[] = JSON.parse(localStorage.getItem(REQUESTS_KEY) || '[]');
    return requests.filter(r => r.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
};