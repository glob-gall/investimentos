import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { AssetModule } from './modules/asset/asset.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './modules/auth/guard/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    PortfolioModule,
    PurchaseModule,
    AssetModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
