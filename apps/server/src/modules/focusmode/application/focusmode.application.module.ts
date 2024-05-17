import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { FocusmodeDomainModule } from '../domain'
import { FocusmodeController } from './focusmode.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { FocusmodeByUserController } from './focusmodeByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    FocusmodeDomainModule,

    UserDomainModule,
  ],
  controllers: [FocusmodeController, FocusmodeByUserController],
  providers: [],
})
export class FocusmodeApplicationModule {}
