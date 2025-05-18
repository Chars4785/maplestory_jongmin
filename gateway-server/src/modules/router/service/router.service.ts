import { Injectable } from '@nestjs/common';
import { BaseApiService } from 'src/modules/common/services/base-api.service';

@Injectable()
export class RouterService extends BaseApiService {
  constructor() {
    super('http://localhost:3000');
  }

  async requestAuth(
    path: string,
    method: string,
    body: any,
    headers: Record<string, string>,
  ) {
    return this.request(`/auth${path}`, method, body, headers);
  }

  async requestCampaign(
    path: string,
    method: string,
    body: any,
    headers: Record<string, string>,
  ) {
    return this.request(`/campaign${path}`, method, body, headers);
  }
}
