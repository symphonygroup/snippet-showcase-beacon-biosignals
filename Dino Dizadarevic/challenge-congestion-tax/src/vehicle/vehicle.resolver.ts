import { Args, Query, Resolver } from '@nestjs/graphql';
import { Vehicle } from './models/vehicle.model';

@Resolver((of) => Vehicle)
class VehicleResolver {
  @Query((returns) => Vehicle)
  async vehicle(@Args('id') id: number): Promise<Vehicle> {
    return {
      type: 'Car',
    };
  }
}

export { VehicleResolver };
