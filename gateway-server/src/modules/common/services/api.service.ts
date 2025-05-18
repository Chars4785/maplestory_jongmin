import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  private readonly authServerUrl = 'http://localhost:3001';

  async forwardToAuthServer(
    path: string,
    method: string,
    body?: any,
    headers?: Record<string, string>,
  ) {
    try {
      const response = await fetch(`${this.authServerUrl}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Auth server error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Auth server request failed:', error);
      throw error;
    }
  }
}
