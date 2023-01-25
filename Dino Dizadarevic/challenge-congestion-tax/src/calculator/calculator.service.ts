import { Injectable } from '@nestjs/common';
import { VehicleType } from '../vehicle/models/vehicle.model';
import { CalculatorResult } from './models/calculatorResult.model';

@Injectable()
class CalculatorService {
  public getTax(vehicle: VehicleType, dates: Date[]): CalculatorResult {
    const intervalStart: number = dates[0].getTime();
    let prevFee = 0;

    const totalFee = dates
      .sort((a, b) => a.getTime() - b.getTime())
      .reduce((fee: number, date: Date) => {
        const currentFee: number = this.getTollFee(date, vehicle);
        const diffInMillies: number = date.getTime() - intervalStart;
        const minutes: number = diffInMillies / 1000 / 60;

        if (minutes > 60) {
          return fee + currentFee;
        }
        if (prevFee < currentFee) {
          fee = fee - prevFee + currentFee;
          prevFee = currentFee;
        }

        return fee;
      }, 0);

    return new CalculatorResult(totalFee > 60 ? 60 : totalFee);
  }

  private isTollFreeVehicle(vehicle: VehicleType): boolean {
    if (vehicle == null) return false;

    switch (vehicle) {
      case 'Car':
        return false;
      case 'Diplomat':
      case 'Emergency':
      case 'Busses':
      case 'Foreign':
      case 'Military':
      case 'Motorcycle':
      case 'Tractor':
        return true;
      default:
        this.notHappening(vehicle);
    }
  }

  private getTollFee(date: Date, vehicle: VehicleType): number {
    if (this.isTollFreeDate(date) || this.isTollFreeVehicle(vehicle)) return 0;

    const hour: number = date.getHours();
    const minute: number = date.getMinutes();

    const minutesFromDayBeginning = this.convertToTimeOfADay(hour, minute);

    if (minutesFromDayBeginning > this.convertToTimeOfADay(18, 29)) return 0;
    if (minutesFromDayBeginning > this.convertToTimeOfADay(17, 59)) return 8;
    if (minutesFromDayBeginning > this.convertToTimeOfADay(16, 59)) return 13;
    if (minutesFromDayBeginning > this.convertToTimeOfADay(15, 29)) return 18;
    if (minutesFromDayBeginning > this.convertToTimeOfADay(14, 59)) return 13;
    if (minutesFromDayBeginning > this.convertToTimeOfADay(8, 29)) return 8;
    if (minutesFromDayBeginning > this.convertToTimeOfADay(7, 59)) return 13;
    if (minutesFromDayBeginning > this.convertToTimeOfADay(6, 59)) return 18;
    if (minutesFromDayBeginning > this.convertToTimeOfADay(6, 29)) return 13;
    if (minutesFromDayBeginning > this.convertToTimeOfADay(5, 59)) return 8;

    return 0;
  }

  private convertToTimeOfADay(hours: number, minutes: number) {
    return hours * 60 + minutes;
  }

  private isTollFreeDate(date: Date): boolean {
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDay() + 1;
    const dayOfMonth: number = date.getDate();

    // is weekend
    if (day === 7 || day === 1) return true;
    // is july
    if (month === 7) return true;

    const publicHolidays: Record<number, Array<number>> = {
      1: [1],
      3: [28, 29],
      4: [1, 30],
      5: [1, 8, 9],
      6: [5, 6, 21],
      11: [1],
      12: [24, 25, 26, 31],
    };

    if (year === 2013 && publicHolidays[month]?.includes(dayOfMonth)) {
      return true;
    }

    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  private notHappening(_: never) {}
}

export { CalculatorService };
