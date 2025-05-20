import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseApiService {
  public async request<T>(
    path: string,
    method: string,
    body?: any,
    headers?: Record<string, string>,
  ): Promise<T> {
    try {
      const response = await fetch(`${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}
