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

export class CreateAppointmentRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): CreateAppointmentRequest;

  getExpertId(): string;
  setExpertId(value: string): CreateAppointmentRequest;

  getVehicleId(): string;
  setVehicleId(value: string): CreateAppointmentRequest;

  getDate(): string;
  setDate(value: string): CreateAppointmentRequest;

  getStatus(): string;
  setStatus(value: string): CreateAppointmentRequest;

  getAddress(): string;
  setAddress(value: string): CreateAppointmentRequest;

  getNotes(): string;
  setNotes(value: string): CreateAppointmentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateAppointmentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateAppointmentRequest): CreateAppointmentRequest.AsObject;
  static serializeBinaryToWriter(message: CreateAppointmentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateAppointmentRequest;
  static deserializeBinaryFromReader(message: CreateAppointmentRequest, reader: jspb.BinaryReader): CreateAppointmentRequest;
}

export namespace CreateAppointmentRequest {
  export type AsObject = {
    userId: string,
    expertId: string,
    vehicleId: string,
    date: string,
    status: string,
    address: string,
    notes: string,
  }
}

export class GetAppointmentByIdRequest extends jspb.Message {
  getAppointmentId(): string;
  setAppointmentId(value: string): GetAppointmentByIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAppointmentByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAppointmentByIdRequest): GetAppointmentByIdRequest.AsObject;
  static serializeBinaryToWriter(message: GetAppointmentByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAppointmentByIdRequest;
  static deserializeBinaryFromReader(message: GetAppointmentByIdRequest, reader: jspb.BinaryReader): GetAppointmentByIdRequest;
}

export namespace GetAppointmentByIdRequest {
  export type AsObject = {
    appointmentId: string,
  }
}

export class GetAppointmentsByUserIdRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): GetAppointmentsByUserIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAppointmentsByUserIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAppointmentsByUserIdRequest): GetAppointmentsByUserIdRequest.AsObject;
  static serializeBinaryToWriter(message: GetAppointmentsByUserIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAppointmentsByUserIdRequest;
  static deserializeBinaryFromReader(message: GetAppointmentsByUserIdRequest, reader: jspb.BinaryReader): GetAppointmentsByUserIdRequest;
}

export namespace GetAppointmentsByUserIdRequest {
  export type AsObject = {
    userId: string,
  }
}

export class GetAppointmentsByExpertIdRequest extends jspb.Message {
  getExpertId(): string;
  setExpertId(value: string): GetAppointmentsByExpertIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAppointmentsByExpertIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAppointmentsByExpertIdRequest): GetAppointmentsByExpertIdRequest.AsObject;
  static serializeBinaryToWriter(message: GetAppointmentsByExpertIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAppointmentsByExpertIdRequest;
  static deserializeBinaryFromReader(message: GetAppointmentsByExpertIdRequest, reader: jspb.BinaryReader): GetAppointmentsByExpertIdRequest;
}

export namespace GetAppointmentsByExpertIdRequest {
  export type AsObject = {
    expertId: string,
  }
}

export class DeleteAppointmentRequest extends jspb.Message {
  getAppointmentId(): string;
  setAppointmentId(value: string): DeleteAppointmentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAppointmentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAppointmentRequest): DeleteAppointmentRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteAppointmentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAppointmentRequest;
  static deserializeBinaryFromReader(message: DeleteAppointmentRequest, reader: jspb.BinaryReader): DeleteAppointmentRequest;
}

export namespace DeleteAppointmentRequest {
  export type AsObject = {
    appointmentId: string,
  }
}

export class AppointmentReply extends jspb.Message {
  getId(): string;
  setId(value: string): AppointmentReply;

  getUserId(): string;
  setUserId(value: string): AppointmentReply;

  getExpertId(): string;
  setExpertId(value: string): AppointmentReply;

  getVehicleId(): string;
  setVehicleId(value: string): AppointmentReply;

  getDate(): string;
  setDate(value: string): AppointmentReply;

  getStatus(): string;
  setStatus(value: string): AppointmentReply;

  getAddress(): string;
  setAddress(value: string): AppointmentReply;

  getNotes(): string;
  setNotes(value: string): AppointmentReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AppointmentReply.AsObject;
  static toObject(includeInstance: boolean, msg: AppointmentReply): AppointmentReply.AsObject;
  static serializeBinaryToWriter(message: AppointmentReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AppointmentReply;
  static deserializeBinaryFromReader(message: AppointmentReply, reader: jspb.BinaryReader): AppointmentReply;
}

export namespace AppointmentReply {
  export type AsObject = {
    id: string,
    userId: string,
    expertId: string,
    vehicleId: string,
    date: string,
    status: string,
    address: string,
    notes: string,
  }
}

export class AppointmentsReply extends jspb.Message {
  getAppointmentsList(): Array<AppointmentReply>;
  setAppointmentsList(value: Array<AppointmentReply>): AppointmentsReply;
  clearAppointmentsList(): AppointmentsReply;
  addAppointments(value?: AppointmentReply, index?: number): AppointmentReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AppointmentsReply.AsObject;
  static toObject(includeInstance: boolean, msg: AppointmentsReply): AppointmentsReply.AsObject;
  static serializeBinaryToWriter(message: AppointmentsReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AppointmentsReply;
  static deserializeBinaryFromReader(message: AppointmentsReply, reader: jspb.BinaryReader): AppointmentsReply;
}

export namespace AppointmentsReply {
  export type AsObject = {
    appointmentsList: Array<AppointmentReply.AsObject>,
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

