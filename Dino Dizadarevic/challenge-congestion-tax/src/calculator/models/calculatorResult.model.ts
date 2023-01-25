import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class CalculatorResult {
  constructor(tax: number) {
    this.tax = tax;
  }

  @Field()
  tax: number;
}

export { CalculatorResult };
