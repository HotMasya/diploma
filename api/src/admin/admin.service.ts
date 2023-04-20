import { Injectable } from '@nestjs/common';
import { DepartmentsService } from '../common/departments/departments.service';
import { UsersService } from '../users/users.service';
import { FacultiesService } from '../common/faculties/faculties.service';
import { GroupsService } from '../common/groups/groups.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly departmentsService: DepartmentsService,
    private readonly usersService: UsersService,
    private readonly facultiesService: FacultiesService,
    private readonly groupsService: GroupsService,
  ) {}

  async getInitialInfo() {
    return Promise.all([
      this.usersService.getTotalCount(),
      this.groupsService.getTotalCount(),
      this.departmentsService.getTotalCount(),
      this.facultiesService.getTotalCount(),
    ]).then(([users, groups, departments, faculties]) => ({
      users,
      groups,
      departments,
      faculties,
    }));
  }
}
