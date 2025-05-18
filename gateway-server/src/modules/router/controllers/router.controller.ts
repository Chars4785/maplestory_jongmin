import { All, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/jwt/guards/jwt-auth.guard';
import { RouterService } from '../service/router.service';

@Controller()
export class RouterController {
  constructor(private readonly routerService: RouterService) {}

  @Post('login')
  async login(@Body() credentials: LoginDto): Promise<AuthResponse> {
    return this.routerService.requestAuth(
      '/auth/login',
      'POST',
      credentials,
      {},
    );
  }

  @All('auth')
  @UseGuards(JwtAuthGuard)
  async handleAllAuthRoutes(
    @Req() req: Request,
    @Body() body: any,
  ): Promise<any> {
    const path = req.path.replace('/auth', '');
    return this.routerService.requestAuth(
      `/auth${path}`,
      req.method,
      body,
      req.headers as Record<string, string>,
    );
  }

  @All('campaign')
  @UseGuards(JwtAuthGuard)
  async handleAllCampaignRoutes(
    @Req() req: Request,
    @Body() body: any,
  ): Promise<any> {
    const path = req.path.replace('/campaign', '');
    return this.routerService.requestCampaign(
      `/campaign${path}`,
      req.method,
      body,
      req.headers as Record<string, string>,
    );
  }
}
