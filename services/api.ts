
import { supabase } from './supabaseClient';
import { User, ServiceRequest, ServiceStatus, UserRole, DeliveryMethod } from '../types';

export const ApiService = {
  // --- AUTHENTICATION MODULE ---
  auth: {
    // Rejestracja użytkownika w Supabase Auth
    register: async (data: Omit<User, 'id' | 'role'>): Promise<{ user: User }> => {
      // PROSTY TRICK DO TESTÓW: Jeśli w nazwie jest słowo "ADMIN" (wielkimi literami), nadaj rolę ADMIN.
      // W produkcji robi się to ręcznie w bazie danych.
      const assignedRole = data.name.includes('ADMIN') ? UserRole.ADMIN : UserRole.CLIENT;

      // 1. Tworzymy konto w systemie Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password!, // Password is required for registration
        options: {
          data: {
            name: data.name,
            phone: data.phone,
            role: assignedRole
          }
        }
      });

      if (authError) throw new Error(authError.message);
      if (!authData.user) throw new Error('Nie udało się utworzyć użytkownika.');

      // Mapujemy obiekt Supabase User na nasz typ User
      const newUser: User = {
        id: authData.user.id,
        email: authData.user.email!,
        name: authData.user.user_metadata.name,
        phone: authData.user.user_metadata.phone,
        role: authData.user.user_metadata.role || UserRole.CLIENT
      };

      return { user: newUser };
    },

    // Logowanie
    login: async (email: string, password: string): Promise<{ user: User }> => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw new Error('Nieprawidłowy email lub hasło.');
      if (!data.user) throw new Error('Błąd logowania.');

      // DEBUG: Logowanie roli
      console.log('Zalogowano użytkownika:', data.user.email);
      console.log('Rola z metadanych:', data.user.user_metadata.role);

      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata.name,
        phone: data.user.user_metadata.phone,
        role: data.user.user_metadata.role || UserRole.CLIENT
      };

      return { user };
    },

    // Wylogowanie
    logout: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Error logging out:', error);
    },

    // Pobranie aktualnej sesji (przy odświeżeniu strony)
    me: async (): Promise<User | null> => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return null;

      console.log('Sesja aktywna. Rola:', session.user.user_metadata.role);

      const user: User = {
        id: session.user.id,
        email: session.user.email!,
        name: session.user.user_metadata.name,
        phone: session.user.user_metadata.phone,
        role: session.user.user_metadata.role || UserRole.CLIENT
      };
      
      return user;
    }
  },

  // --- REQUESTS MODULE ---
  requests: {
    // Dodanie nowego zgłoszenia do tabeli 'service_requests'
    create: async (userId: string, data: { 
      componentModel: string; 
      problemDescription: string; 
      deliveryMethod: DeliveryMethod; 
      preferredDate: string;
      clientName: string;
      clientPhone: string;
    }): Promise<ServiceRequest> => {
      
      // Mapowanie nazw pól na snake_case (standard SQL)
      const { data: result, error } = await supabase
        .from('service_requests')
        .insert({
          user_id: userId,
          component_model: data.componentModel,
          problem_description: data.problemDescription,
          delivery_method: data.deliveryMethod,
          preferred_date: data.preferredDate,
          client_name: data.clientName,
          client_phone: data.clientPhone,
          status: ServiceStatus.PENDING
        })
        .select()
        .single();

      if (error) {
        console.error('Database Error:', error);
        throw new Error('Nie udało się zapisać zgłoszenia.');
      }

      return ApiService.mapResponse(result);
    },

    // Pobranie zgłoszeń użytkownika
    getAllForUser: async (userId: string): Promise<ServiceRequest[]> => {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch Error:', error);
        return [];
      }

      return data.map(ApiService.mapResponse);
    },

    // --- ADMIN METHODS ---
    
    // Pobranie WSZYSTKICH zgłoszeń (dla Admina)
    getAll: async (): Promise<ServiceRequest[]> => {
      // Pobieramy zgłoszenia
      const { data: requests, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Admin Fetch Error:', error);
        return [];
      }

      return requests.map(ApiService.mapResponse);
    },

    // Aktualizacja statusu i ceny
    updateStatus: async (id: string, status: ServiceStatus, estimatedCost?: number): Promise<void> => {
      const updateData: any = { status };
      if (estimatedCost !== undefined) {
        updateData.estimated_cost = estimatedCost;
      }

      const { error } = await supabase
        .from('service_requests')
        .update(updateData)
        .eq('id', id);

      if (error) throw new Error('Nie udało się zaktualizować zgłoszenia');
    }
  },

  // Helper do mapowania Snake Case -> Camel Case
  mapResponse: (row: any): ServiceRequest => ({
    id: row.id,
    userId: row.user_id,
    createdAt: row.created_at,
    componentModel: row.component_model,
    problemDescription: row.problem_description,
    deliveryMethod: row.delivery_method as DeliveryMethod,
    preferredDate: row.preferred_date,
    status: row.status as ServiceStatus,
    estimatedCost: row.estimated_cost,
    clientName: row.client_name,
    clientPhone: row.client_phone
  })
};
