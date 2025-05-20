import { Injectable } from '@nestjs/common';
import { BaseApiService } from 'src/modules/common/services/base-api.service';

@Injectable()
export class RouterService extends BaseApiService {
  private auth_url = 'http://localhost:3001';
  private campaign_url = 'http://localhost:3002';

  constructor() {
    super();
  }

  async requestAuth(
    path: string,
    method: string,
    body: any,
    headers: Record<string, string>,
  ) {
    return this.request(`${this.auth_url}${path}`, method, body, headers);
  }

  async requestCampaign(
    path: string,
    method: string,
    body: any,
    headers: Record<string, string>,
  ) {
    return this.request(`${this.campaign_url}${path}`, method, body, headers);
  }
}
