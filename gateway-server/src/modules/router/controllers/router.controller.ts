import { All, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { LoginDto } from '../dto/login.dto';
import { RouterService } from '../service/router.service';

@Controller()
export class RouterController {
  constructor(private readonly routerService: RouterService) {}

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.routerService.requestAuth(
      '/auth/login',
      'POST',
      credentials,
      {},
    );
  }

  @All('auth')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard, RoleGuard)
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
