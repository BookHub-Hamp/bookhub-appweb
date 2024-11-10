export interface UserProfile {
  id: number;
  email: string;
  role: 'CUSTOMER' | 'AUTHOR' | null;
  firstName: string;
  lastName: string;
  shippingAddress?: string;
  bio?: string;
  // Otros campos opcionales
}
