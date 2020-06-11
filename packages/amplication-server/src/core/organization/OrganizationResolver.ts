import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Parent,
  ResolveField
} from '@nestjs/graphql';
import {
  FindManyOrganizationArgs,
  UpdateOneOrganizationArgs,
  InviteUserArgs
} from './dto';
import { FindOneArgs } from 'src/dto';

import { Organization, App, User } from 'src/models';
import { AppService } from 'src/core/app/app.service';
import { GqlResolverExceptionsFilter } from 'src/filters/GqlResolverExceptions.filter';
import { UseFilters } from '@nestjs/common';
import { UserEntity } from 'src/decorators/user.decorator';

@Resolver(() => Organization)
@UseFilters(GqlResolverExceptionsFilter)
export class OrganizationResolver {
  constructor(
    private readonly OrganizationService: OrganizationService,
    private readonly appService: AppService
  ) {}

  @Query(() => Organization, {
    nullable: true,
    description: undefined
  })
  async Organization(
    @Context() ctx: any,
    @Args() args: FindOneArgs
  ): Promise<Organization | null> {
    return this.OrganizationService.Organization(args);
  }

  @ResolveField(() => [App])
  async apps(@Parent() organization: Organization) {
    return this.appService.apps({
      where: { organization: { id: organization.id } }
    });
  }

  @Query(() => [Organization], {
    nullable: false,
    description: undefined
  })
  async Organizations(
    @Context() ctx: any,
    @Args() args: FindManyOrganizationArgs
  ): Promise<Organization[]> {
    return this.OrganizationService.Organizations(args);
  }

  @Mutation(() => Organization, {
    nullable: true,
    description: undefined
  })
  async deleteOrganization(
    @Context() ctx: any,
    @Args() args: FindOneArgs
  ): Promise<Organization | null> {
    return this.OrganizationService.deleteOrganization(args);
  }

  @Mutation(() => Organization, {
    nullable: true,
    description: undefined
  })
  async updateOrganization(
    @Context() ctx: any,
    @Args() args: UpdateOneOrganizationArgs
  ): Promise<Organization | null> {
    return this.OrganizationService.updateOrganization(args);
  }

  @Mutation(() => User, {
    nullable: true,
    description: undefined
  })
  async inviteUser(
    @UserEntity() currentUser: User,
    @Args() args: InviteUserArgs
  ): Promise<User | null> {
    return this.OrganizationService.inviteUser(currentUser, args);
  }
}
