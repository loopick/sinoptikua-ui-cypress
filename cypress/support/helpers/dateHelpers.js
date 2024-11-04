import { weekdays, months } from '../../fixtures/dateFixtures';

export default class DateHelpers {
  getDaysArray(numDaysFromNow) {
    const daysArray = [];

    for (let i = 0; i < numDaysFromNow; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      const day = weekdays[currentDate.getDay()];
      const date = currentDate.getDate().toString().padStart(2, '0');
      const monthIndex = currentDate.getMonth();
      const month = months[monthIndex];

      daysArray.push({
        day,
        date,
        month,
      });
    }

    return daysArray;
  }
}
