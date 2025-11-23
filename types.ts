
export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

export enum ServiceStatus {
  PENDING = 'Oczekuje na przyjęcie',
  RECEIVED = 'Przyjęty na serwis',
  IN_PROGRESS = 'W trakcie naprawy',
  WAITING_FOR_PARTS = 'Oczekiwanie na części',
  READY = 'Gotowy do odbioru',
  COMPLETED = 'Zakończony'
}

export enum DeliveryMethod {
  PERSONAL = 'Osobisty',
  SHIPPING = 'Wysyłka'
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  password?: string; // In real app, never store plain text
}

export interface ServiceRequest {
  id: string;
  userId: string;
  createdAt: string; // ISO Date
  preferredDate: string;
  componentModel: string;
  problemDescription: string;
  deliveryMethod: DeliveryMethod;
  status: ServiceStatus;
  estimatedCost?: number;
  clientName?: string;
  clientPhone?: string;
}

export interface PricingRow {
  model: string;
  priceService: string | null; // Basic service price
  priceFull: string | null;    // Full service price (with seals)
}

export interface PricingBrand {
  name: string;
  rows: PricingRow[];
}

export interface PricingCategory {
  id: 'FRONT' | 'REAR' | 'OTHER';
  title: string;
  brands?: PricingBrand[]; // For Front/Rear
  services?: { name: string; price: string }[]; // For Other
}
