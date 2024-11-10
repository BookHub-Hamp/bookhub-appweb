export interface RegisterResponse {
    id: number;
    email: string;
    role: string | null;
    firstName: string;
    lastName: string;
    shippingAddress: string;
    bio: string | null;
  }