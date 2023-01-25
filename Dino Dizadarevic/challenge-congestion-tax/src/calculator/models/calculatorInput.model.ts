import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { VehicleType } from '../../vehicle/models/vehicle.model';

@InputType()
class CalculatorInput {
  @Field()
  type: VehicleType;

  @Field((type) => [GraphQLISODateTime])
  interval: Date[];

  @Field()
  city: string;
}

export { CalculatorInput };
