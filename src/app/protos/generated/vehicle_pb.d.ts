import * as jspb from 'google-protobuf'



export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class CreateVehicleRequest extends jspb.Message {
  getBrand(): string;
  setBrand(value: string): CreateVehicleRequest;

  getModel(): string;
  setModel(value: string): CreateVehicleRequest;

  getVin(): string;
  setVin(value: string): CreateVehicleRequest;

  getFuelType(): string;
  setFuelType(value: string): CreateVehicleRequest;

  getGearbox(): string;
  setGearbox(value: string): CreateVehicleRequest;

  getYear(): number;
  setYear(value: number): CreateVehicleRequest;

  getMileage(): number;
  setMileage(value: number): CreateVehicleRequest;

  getUserId(): string;
  setUserId(value: string): CreateVehicleRequest;

  getPriceAnnounced(): number;
  setPriceAnnounced(value: number): CreateVehicleRequest;

  getLocation(): string;
  setLocation(value: string): CreateVehicleRequest;

  getState(): string;
  setState(value: string): CreateVehicleRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateVehicleRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateVehicleRequest): CreateVehicleRequest.AsObject;
  static serializeBinaryToWriter(message: CreateVehicleRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateVehicleRequest;
  static deserializeBinaryFromReader(message: CreateVehicleRequest, reader: jspb.BinaryReader): CreateVehicleRequest;
}

export namespace CreateVehicleRequest {
  export type AsObject = {
    brand: string,
    model: string,
    vin: string,
    fuelType: string,
    gearbox: string,
    year: number,
    mileage: number,
    userId: string,
    priceAnnounced: number,
    location: string,
    state: string,
  }
}

export class GetVehicleByIdRequest extends jspb.Message {
  getId(): string;
  setId(value: string): GetVehicleByIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVehicleByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVehicleByIdRequest): GetVehicleByIdRequest.AsObject;
  static serializeBinaryToWriter(message: GetVehicleByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVehicleByIdRequest;
  static deserializeBinaryFromReader(message: GetVehicleByIdRequest, reader: jspb.BinaryReader): GetVehicleByIdRequest;
}

export namespace GetVehicleByIdRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetVehicleByVINRequest extends jspb.Message {
  getVin(): string;
  setVin(value: string): GetVehicleByVINRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVehicleByVINRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVehicleByVINRequest): GetVehicleByVINRequest.AsObject;
  static serializeBinaryToWriter(message: GetVehicleByVINRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVehicleByVINRequest;
  static deserializeBinaryFromReader(message: GetVehicleByVINRequest, reader: jspb.BinaryReader): GetVehicleByVINRequest;
}

export namespace GetVehicleByVINRequest {
  export type AsObject = {
    vin: string,
  }
}

export class GetVehiclesByBrandRequest extends jspb.Message {
  getBrand(): string;
  setBrand(value: string): GetVehiclesByBrandRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVehiclesByBrandRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVehiclesByBrandRequest): GetVehiclesByBrandRequest.AsObject;
  static serializeBinaryToWriter(message: GetVehiclesByBrandRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVehiclesByBrandRequest;
  static deserializeBinaryFromReader(message: GetVehiclesByBrandRequest, reader: jspb.BinaryReader): GetVehiclesByBrandRequest;
}

export namespace GetVehiclesByBrandRequest {
  export type AsObject = {
    brand: string,
  }
}

export class GetVehiclesByFuelTypeRequest extends jspb.Message {
  getFuelType(): string;
  setFuelType(value: string): GetVehiclesByFuelTypeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVehiclesByFuelTypeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVehiclesByFuelTypeRequest): GetVehiclesByFuelTypeRequest.AsObject;
  static serializeBinaryToWriter(message: GetVehiclesByFuelTypeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVehiclesByFuelTypeRequest;
  static deserializeBinaryFromReader(message: GetVehiclesByFuelTypeRequest, reader: jspb.BinaryReader): GetVehiclesByFuelTypeRequest;
}

export namespace GetVehiclesByFuelTypeRequest {
  export type AsObject = {
    fuelType: string,
  }
}

export class GetVehiclesByGearboxRequest extends jspb.Message {
  getGearbox(): string;
  setGearbox(value: string): GetVehiclesByGearboxRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVehiclesByGearboxRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVehiclesByGearboxRequest): GetVehiclesByGearboxRequest.AsObject;
  static serializeBinaryToWriter(message: GetVehiclesByGearboxRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVehiclesByGearboxRequest;
  static deserializeBinaryFromReader(message: GetVehiclesByGearboxRequest, reader: jspb.BinaryReader): GetVehiclesByGearboxRequest;
}

export namespace GetVehiclesByGearboxRequest {
  export type AsObject = {
    gearbox: string,
  }
}

export class GetVehiclesByYearRequest extends jspb.Message {
  getYear(): number;
  setYear(value: number): GetVehiclesByYearRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVehiclesByYearRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVehiclesByYearRequest): GetVehiclesByYearRequest.AsObject;
  static serializeBinaryToWriter(message: GetVehiclesByYearRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVehiclesByYearRequest;
  static deserializeBinaryFromReader(message: GetVehiclesByYearRequest, reader: jspb.BinaryReader): GetVehiclesByYearRequest;
}

export namespace GetVehiclesByYearRequest {
  export type AsObject = {
    year: number,
  }
}

export class GetVehiclesByMaxMileageRequest extends jspb.Message {
  getMaxMileage(): number;
  setMaxMileage(value: number): GetVehiclesByMaxMileageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVehiclesByMaxMileageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVehiclesByMaxMileageRequest): GetVehiclesByMaxMileageRequest.AsObject;
  static serializeBinaryToWriter(message: GetVehiclesByMaxMileageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVehiclesByMaxMileageRequest;
  static deserializeBinaryFromReader(message: GetVehiclesByMaxMileageRequest, reader: jspb.BinaryReader): GetVehiclesByMaxMileageRequest;
}

export namespace GetVehiclesByMaxMileageRequest {
  export type AsObject = {
    maxMileage: number,
  }
}

export class GetVehiclesByCriteriaRequest extends jspb.Message {
  getFuelType(): string;
  setFuelType(value: string): GetVehiclesByCriteriaRequest;

  getGearbox(): string;
  setGearbox(value: string): GetVehiclesByCriteriaRequest;

  getMaxMileage(): number;
  setMaxMileage(value: number): GetVehiclesByCriteriaRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVehiclesByCriteriaRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVehiclesByCriteriaRequest): GetVehiclesByCriteriaRequest.AsObject;
  static serializeBinaryToWriter(message: GetVehiclesByCriteriaRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVehiclesByCriteriaRequest;
  static deserializeBinaryFromReader(message: GetVehiclesByCriteriaRequest, reader: jspb.BinaryReader): GetVehiclesByCriteriaRequest;
}

export namespace GetVehiclesByCriteriaRequest {
  export type AsObject = {
    fuelType: string,
    gearbox: string,
    maxMileage: number,
  }
}

export class GetVehiclesByUserIdRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): GetVehiclesByUserIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVehiclesByUserIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVehiclesByUserIdRequest): GetVehiclesByUserIdRequest.AsObject;
  static serializeBinaryToWriter(message: GetVehiclesByUserIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVehiclesByUserIdRequest;
  static deserializeBinaryFromReader(message: GetVehiclesByUserIdRequest, reader: jspb.BinaryReader): GetVehiclesByUserIdRequest;
}

export namespace GetVehiclesByUserIdRequest {
  export type AsObject = {
    userId: string,
  }
}

export class DeleteVehicleRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeleteVehicleRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteVehicleRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteVehicleRequest): DeleteVehicleRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteVehicleRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteVehicleRequest;
  static deserializeBinaryFromReader(message: DeleteVehicleRequest, reader: jspb.BinaryReader): DeleteVehicleRequest;
}

export namespace DeleteVehicleRequest {
  export type AsObject = {
    id: string,
  }
}

export class VehicleReply extends jspb.Message {
  getId(): string;
  setId(value: string): VehicleReply;

  getBrand(): string;
  setBrand(value: string): VehicleReply;

  getModel(): string;
  setModel(value: string): VehicleReply;

  getYear(): number;
  setYear(value: number): VehicleReply;

  getKilometers(): number;
  setKilometers(value: number): VehicleReply;

  getFuelType(): string;
  setFuelType(value: string): VehicleReply;

  getPriceAnnounced(): number;
  setPriceAnnounced(value: number): VehicleReply;

  getLocation(): string;
  setLocation(value: string): VehicleReply;

  getVin(): string;
  setVin(value: string): VehicleReply;

  getMileage(): number;
  setMileage(value: number): VehicleReply;

  getGearbox(): string;
  setGearbox(value: string): VehicleReply;

  getUserId(): string;
  setUserId(value: string): VehicleReply;

  getState(): string;
  setState(value: string): VehicleReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VehicleReply.AsObject;
  static toObject(includeInstance: boolean, msg: VehicleReply): VehicleReply.AsObject;
  static serializeBinaryToWriter(message: VehicleReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VehicleReply;
  static deserializeBinaryFromReader(message: VehicleReply, reader: jspb.BinaryReader): VehicleReply;
}

export namespace VehicleReply {
  export type AsObject = {
    id: string,
    brand: string,
    model: string,
    year: number,
    kilometers: number,
    fuelType: string,
    priceAnnounced: number,
    location: string,
    vin: string,
    mileage: number,
    gearbox: string,
    userId: string,
    state: string,
  }
}

export class VehiclesReply extends jspb.Message {
  getVehiclesList(): Array<VehicleReply>;
  setVehiclesList(value: Array<VehicleReply>): VehiclesReply;
  clearVehiclesList(): VehiclesReply;
  addVehicles(value?: VehicleReply, index?: number): VehicleReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VehiclesReply.AsObject;
  static toObject(includeInstance: boolean, msg: VehiclesReply): VehiclesReply.AsObject;
  static serializeBinaryToWriter(message: VehiclesReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VehiclesReply;
  static deserializeBinaryFromReader(message: VehiclesReply, reader: jspb.BinaryReader): VehiclesReply;
}

export namespace VehiclesReply {
  export type AsObject = {
    vehiclesList: Array<VehicleReply.AsObject>,
  }
}

export class DeleteReply extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): DeleteReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteReply.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteReply): DeleteReply.AsObject;
  static serializeBinaryToWriter(message: DeleteReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteReply;
  static deserializeBinaryFromReader(message: DeleteReply, reader: jspb.BinaryReader): DeleteReply;
}

export namespace DeleteReply {
  export type AsObject = {
    message: string,
  }
}

