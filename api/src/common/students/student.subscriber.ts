import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';

import { Student } from './student.entity';
import { JournalsService } from '../journals/journals.service';

@EventSubscriber()
export class StudentSubscriber implements EntitySubscriberInterface<Student> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly journalsService: JournalsService,
  ) {
    dataSource.subscribers.push(this);
    this.journalsService = journalsService;
  }

  listenTo() {
    return Student;
  }

  async beforeRemove(event: RemoveEvent<Student>) {
    if (event.entity.group) {
      await this.journalsService.removeStudentFromJournal(event.entity);
    }
  }

  async beforeUpdate(event: UpdateEvent<Student>) {
    if (event.updatedRelations.find((rel) => rel.propertyName === 'group')) {
      await this.journalsService.removeStudentFromJournal(event.databaseEntity);
    }
  }

  async afterUpdate(event: UpdateEvent<Student>) {
    if (
      event.updatedRelations.find((rel) => rel.propertyName === 'group') &&
      event.entity.group
    ) {
      await this.journalsService.addStudentToJournal(event.entity as Student);
    }
  }
}
