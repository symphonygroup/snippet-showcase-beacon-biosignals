import { Field, Int, ObjectType } from '@nestjs/graphql';

type TollFreeVehicles =
  | Motorcycle
  | Tractor
  | Emergency
  | Diplomat
  | Foreign
  | Military
  | Busses;

type TollChargeVehicleType = Car;

type VehicleType = TollFreeVehicles['type'] | TollChargeVehicleType['type'];

@ObjectType()
class Vehicle {
  @Field()
  public readonly type: VehicleType;
}

class Car extends Vehicle {
  public readonly type = 'Car' as const;
}

class Motorcycle extends Vehicle {
  public readonly type = 'Motorcycle' as const;
}

class Tractor extends Vehicle {
  public readonly type = 'Tractor' as const;
}

class Emergency extends Vehicle {
  public readonly type = 'Emergency' as const;
}

class Diplomat extends Vehicle {
  public readonly type = 'Diplomat' as const;
}

class Foreign extends Vehicle {
  public readonly type = 'Foreign' as const;
}

class Military extends Vehicle {
  public readonly type = 'Military' as const;
}

class Busses extends Vehicle {
  public readonly type = 'Busses' as const;
}

export { Vehicle, VehicleType, TollFreeVehicles, TollChargeVehicleType };
