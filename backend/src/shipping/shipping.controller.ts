import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '@common/guards/jwt.guard';
import { RoleGuard } from '@common/guards/role.guard';
import { Roles } from '@common/decorators/roles.decorator';
import { CurrentUser } from '@common/decorators/user.decorator';
import { Role } from '@common/enums/role.enum';
import { TokenPayload } from '@common/types/token-payload.interface';
import { ShippingService } from './shipping.service';
import { GetBidderShippingsQueryDto } from './dtos/get-bidder-shippings-query.dto';
import { GetBidderShippingsResponseDto } from './dtos/get-bidder-shippings-response.dto';
import { GetSellerShippingsQueryDto } from './dtos/get-seller-shippings-query.dto';
import { GetSellerShippingsResponseDto } from './dtos/get-seller-shippings-response.dto';

@Controller('shipping')
@UseGuards(JwtAuthGuard, RoleGuard)
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get('bidder')
  @Roles(Role.BIDDER)
  async getBidderShippings(
    @Query() query: GetBidderShippingsQueryDto,
    @CurrentUser() user: TokenPayload,
  ): Promise<GetBidderShippingsResponseDto> {
    return this.shippingService.getBidderShippings(user.id, query);
  }

  @Get('seller')
  @Roles(Role.SELLER)
  async getSellerShippings(
    @Query() query: GetSellerShippingsQueryDto,
    @CurrentUser() user: TokenPayload,
  ): Promise<GetSellerShippingsResponseDto> {
    return this.shippingService.getSellerShippings(user.id, query);
  }
}
