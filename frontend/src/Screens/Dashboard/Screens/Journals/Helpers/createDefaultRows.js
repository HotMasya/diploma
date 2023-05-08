// Modules
import orderBy from 'lodash/orderBy';

export const createDefaultRows = (students) =>
  orderBy(students, (student) => student.user.fullName, 'asc').map(
    ({ id, user }) => ({
      fullName: {
        value: user.fullName,
        updatedAt: new Date(),
      },
      id,
    })
  );
