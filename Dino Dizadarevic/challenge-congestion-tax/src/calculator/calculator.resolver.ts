import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CalculatorInput } from './models/calculatorInput.model';
import { CalculatorResult } from './models/calculatorResult.model';
import { Vehicle } from '../vehicle/models/vehicle.model';
import { CalculatorService } from './calculator.service';

@Resolver((of) => Vehicle)
class CalculatorResolver {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Mutation((returns) => CalculatorResult)
  async calculate(
    @Args('calculate') calculateInput: CalculatorInput,
  ): Promise<CalculatorResult> {
    return this.calculatorService.getTax(
      calculateInput.type,
      calculateInput.interval,
    );
  }
}

export { CalculatorResolver };
