import * as jspb from 'google-protobuf'



export class RegisterRequest extends jspb.Message {
  getFirstName(): string;
  setFirstName(value: string): RegisterRequest;

  getLastName(): string;
  setLastName(value: string): RegisterRequest;

  getEmail(): string;
  setEmail(value: string): RegisterRequest;

  getPassword(): string;
  setPassword(value: string): RegisterRequest;

  getRole(): string;
  setRole(value: string): RegisterRequest;

  getPhone(): string;
  setPhone(value: string): RegisterRequest;

  getAddress(): string;
  setAddress(value: string): RegisterRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterRequest): RegisterRequest.AsObject;
  static serializeBinaryToWriter(message: RegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterRequest;
  static deserializeBinaryFromReader(message: RegisterRequest, reader: jspb.BinaryReader): RegisterRequest;
}

export namespace RegisterRequest {
  export type AsObject = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    phone: string,
    address: string,
  }
}

export class LoginRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): LoginRequest;

  getPassword(): string;
  setPassword(value: string): LoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class GetUserRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): GetUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserRequest): GetUserRequest.AsObject;
  static serializeBinaryToWriter(message: GetUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserRequest;
  static deserializeBinaryFromReader(message: GetUserRequest, reader: jspb.BinaryReader): GetUserRequest;
}

export namespace GetUserRequest {
  export type AsObject = {
    userId: string,
  }
}

export class UpdateUserRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): UpdateUserRequest;

  getFirstName(): string;
  setFirstName(value: string): UpdateUserRequest;

  getLastName(): string;
  setLastName(value: string): UpdateUserRequest;

  getEmail(): string;
  setEmail(value: string): UpdateUserRequest;

  getPhone(): string;
  setPhone(value: string): UpdateUserRequest;

  getAddress(): string;
  setAddress(value: string): UpdateUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserRequest): UpdateUserRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserRequest;
  static deserializeBinaryFromReader(message: UpdateUserRequest, reader: jspb.BinaryReader): UpdateUserRequest;
}

export namespace UpdateUserRequest {
  export type AsObject = {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
  }
}

export class UpdatePasswordRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): UpdatePasswordRequest;

  getCurrentPassword(): string;
  setCurrentPassword(value: string): UpdatePasswordRequest;

  getNewPassword(): string;
  setNewPassword(value: string): UpdatePasswordRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdatePasswordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdatePasswordRequest): UpdatePasswordRequest.AsObject;
  static serializeBinaryToWriter(message: UpdatePasswordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdatePasswordRequest;
  static deserializeBinaryFromReader(message: UpdatePasswordRequest, reader: jspb.BinaryReader): UpdatePasswordRequest;
}

export namespace UpdatePasswordRequest {
  export type AsObject = {
    userId: string,
    currentPassword: string,
    newPassword: string,
  }
}

export class UserReply extends jspb.Message {
  getId(): string;
  setId(value: string): UserReply;

  getFirstName(): string;
  setFirstName(value: string): UserReply;

  getLastName(): string;
  setLastName(value: string): UserReply;

  getEmail(): string;
  setEmail(value: string): UserReply;

  getPhone(): string;
  setPhone(value: string): UserReply;

  getAddress(): string;
  setAddress(value: string): UserReply;

  getRole(): string;
  setRole(value: string): UserReply;

  getIsVerified(): boolean;
  setIsVerified(value: boolean): UserReply;

  getCreatedAt(): string;
  setCreatedAt(value: string): UserReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserReply.AsObject;
  static toObject(includeInstance: boolean, msg: UserReply): UserReply.AsObject;
  static serializeBinaryToWriter(message: UserReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserReply;
  static deserializeBinaryFromReader(message: UserReply, reader: jspb.BinaryReader): UserReply;
}

export namespace UserReply {
  export type AsObject = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    role: string,
    isVerified: boolean,
    createdAt: string,
  }
}

