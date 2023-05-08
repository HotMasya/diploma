import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';

import { User } from './entities/user.entity';
import { Journal } from '../common/journals/journal.entity';
import { Student } from '../common/students/student.entity';
import * as _ from 'lodash';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeRemove(event: RemoveEvent<User>) {
    const student = await event.manager.findOne(Student, {
      where: {
        user: { id: event.entity.id },
      },
    });

    if (!student) return;

    const journals = await event.manager.find(Journal, {
      relations: ['group', 'group.students'],
      where: {
        group: {
          students: {
            id: student.id,
          },
        },
      },
    });

    if (!journals.length) return;

    journals.forEach((j) => {
      j.rows = j.rows.filter((row) => row.id !== student.id);
    });

    await event.manager.save(journals);
  }

  async afterUpdate(event: UpdateEvent<User>) {
    const student = await event.manager.findOneBy(Student, {
      user: {
        email: event.entity.email,
      },
    });

    if (!student) return;

    const journals = await event.manager.find(Journal, {
      relations: ['group', 'group.students'],
      where: {
        group: {
          students: {
            id: student.id,
          },
        },
      },
    });

    journals.forEach((j) => {
      const row = j.rows.find((row) => row.id === student.id);

      row.fullName = event.manager.create(User, event.entity).fullName;

      j.rows = _.orderBy(j.rows, (row) => row.fullName, 'asc');
    });

    await event.manager.save(journals);
  }
}
