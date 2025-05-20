/**
 * Configuration and secrets for the Demo Web Shop automation
 */

// Types for our configuration
interface User {
  email: string;
  password: string;
}

interface Users {
  admin: User;
  customer: User;
}

interface Config {
  baseUrl: string;
  users: Users;
  timeouts: {
    defaultTimeout: number;
    navigationTimeout: number;
  };
}

// Configuration object
export const secrets: Config = {
  baseUrl: 'https://demowebshop.tricentis.com/',
  users: {
    admin: {
      email: 'caspi45@gmail.com',
      password: 'QS!X5GB6KSpzZn'
    },
    customer: {
      email: 'customer@example.com',
      password: 'customer123'
    }
  },
  timeouts: {
    defaultTimeout: 30000, // 30 seconds
    navigationTimeout: 60000 // 60 seconds
  }
};

// Export types for use in other files
export type { Config, User, Users }; 