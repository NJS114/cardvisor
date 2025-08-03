import * as jspb from 'google-protobuf'



export class UpdateExpertPriceRequest extends jspb.Message {
  getExpertId(): string;
  setExpertId(value: string): UpdateExpertPriceRequest;

  getNewPrice(): number;
  setNewPrice(value: number): UpdateExpertPriceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateExpertPriceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateExpertPriceRequest): UpdateExpertPriceRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateExpertPriceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateExpertPriceRequest;
  static deserializeBinaryFromReader(message: UpdateExpertPriceRequest, reader: jspb.BinaryReader): UpdateExpertPriceRequest;
}

export namespace UpdateExpertPriceRequest {
  export type AsObject = {
    expertId: string,
    newPrice: number,
  }
}

export class GetExpertsByYearsOfExperienceRequest extends jspb.Message {
  getYearsOfExperience(): number;
  setYearsOfExperience(value: number): GetExpertsByYearsOfExperienceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetExpertsByYearsOfExperienceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetExpertsByYearsOfExperienceRequest): GetExpertsByYearsOfExperienceRequest.AsObject;
  static serializeBinaryToWriter(message: GetExpertsByYearsOfExperienceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetExpertsByYearsOfExperienceRequest;
  static deserializeBinaryFromReader(message: GetExpertsByYearsOfExperienceRequest, reader: jspb.BinaryReader): GetExpertsByYearsOfExperienceRequest;
}

export namespace GetExpertsByYearsOfExperienceRequest {
  export type AsObject = {
    yearsOfExperience: number,
  }
}

export class GetExpertsByRatingRequest extends jspb.Message {
  getRating(): string;
  setRating(value: string): GetExpertsByRatingRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetExpertsByRatingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetExpertsByRatingRequest): GetExpertsByRatingRequest.AsObject;
  static serializeBinaryToWriter(message: GetExpertsByRatingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetExpertsByRatingRequest;
  static deserializeBinaryFromReader(message: GetExpertsByRatingRequest, reader: jspb.BinaryReader): GetExpertsByRatingRequest;
}

export namespace GetExpertsByRatingRequest {
  export type AsObject = {
    rating: string,
  }
}

export class UploadCertificationRequest extends jspb.Message {
  getExpertId(): string;
  setExpertId(value: string): UploadCertificationRequest;

  getFileName(): string;
  setFileName(value: string): UploadCertificationRequest;

  getChunkData(): Uint8Array | string;
  getChunkData_asU8(): Uint8Array;
  getChunkData_asB64(): string;
  setChunkData(value: Uint8Array | string): UploadCertificationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadCertificationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UploadCertificationRequest): UploadCertificationRequest.AsObject;
  static serializeBinaryToWriter(message: UploadCertificationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadCertificationRequest;
  static deserializeBinaryFromReader(message: UploadCertificationRequest, reader: jspb.BinaryReader): UploadCertificationRequest;
}

export namespace UploadCertificationRequest {
  export type AsObject = {
    expertId: string,
    fileName: string,
    chunkData: Uint8Array | string,
  }
}

export class UploadCertificationReply extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): UploadCertificationReply;

  getFileUrl(): string;
  setFileUrl(value: string): UploadCertificationReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadCertificationReply.AsObject;
  static toObject(includeInstance: boolean, msg: UploadCertificationReply): UploadCertificationReply.AsObject;
  static serializeBinaryToWriter(message: UploadCertificationReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadCertificationReply;
  static deserializeBinaryFromReader(message: UploadCertificationReply, reader: jspb.BinaryReader): UploadCertificationReply;
}

export namespace UploadCertificationReply {
  export type AsObject = {
    message: string,
    fileUrl: string,
  }
}

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

export class CreateExpertRequest extends jspb.Message {
  getUserEmail(): string;
  setUserEmail(value: string): CreateExpertRequest;

  getUserPassword(): string;
  setUserPassword(value: string): CreateExpertRequest;

  getFirstName(): string;
  setFirstName(value: string): CreateExpertRequest;

  getLastName(): string;
  setLastName(value: string): CreateExpertRequest;

  getSpecialities(): string;
  setSpecialities(value: string): CreateExpertRequest;

  getCertificationDocs(): string;
  setCertificationDocs(value: string): CreateExpertRequest;

  getIsAvailable(): boolean;
  setIsAvailable(value: boolean): CreateExpertRequest;

  getRating(): number;
  setRating(value: number): CreateExpertRequest;

  getYearsOfExperience(): number;
  setYearsOfExperience(value: number): CreateExpertRequest;

  getServicePrice(): number;
  setServicePrice(value: number): CreateExpertRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateExpertRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateExpertRequest): CreateExpertRequest.AsObject;
  static serializeBinaryToWriter(message: CreateExpertRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateExpertRequest;
  static deserializeBinaryFromReader(message: CreateExpertRequest, reader: jspb.BinaryReader): CreateExpertRequest;
}

export namespace CreateExpertRequest {
  export type AsObject = {
    userEmail: string,
    userPassword: string,
    firstName: string,
    lastName: string,
    specialities: string,
    certificationDocs: string,
    isAvailable: boolean,
    rating: number,
    yearsOfExperience: number,
    servicePrice: number,
  }
}

export class GetExpertByIdRequest extends jspb.Message {
  getId(): string;
  setId(value: string): GetExpertByIdRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetExpertByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetExpertByIdRequest): GetExpertByIdRequest.AsObject;
  static serializeBinaryToWriter(message: GetExpertByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetExpertByIdRequest;
  static deserializeBinaryFromReader(message: GetExpertByIdRequest, reader: jspb.BinaryReader): GetExpertByIdRequest;
}

export namespace GetExpertByIdRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetExpertsByAvailabilityRequest extends jspb.Message {
  getIsAvailable(): boolean;
  setIsAvailable(value: boolean): GetExpertsByAvailabilityRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetExpertsByAvailabilityRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetExpertsByAvailabilityRequest): GetExpertsByAvailabilityRequest.AsObject;
  static serializeBinaryToWriter(message: GetExpertsByAvailabilityRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetExpertsByAvailabilityRequest;
  static deserializeBinaryFromReader(message: GetExpertsByAvailabilityRequest, reader: jspb.BinaryReader): GetExpertsByAvailabilityRequest;
}

export namespace GetExpertsByAvailabilityRequest {
  export type AsObject = {
    isAvailable: boolean,
  }
}

export class GetExpertsBySpecialityRequest extends jspb.Message {
  getSpeciality(): string;
  setSpeciality(value: string): GetExpertsBySpecialityRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetExpertsBySpecialityRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetExpertsBySpecialityRequest): GetExpertsBySpecialityRequest.AsObject;
  static serializeBinaryToWriter(message: GetExpertsBySpecialityRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetExpertsBySpecialityRequest;
  static deserializeBinaryFromReader(message: GetExpertsBySpecialityRequest, reader: jspb.BinaryReader): GetExpertsBySpecialityRequest;
}

export namespace GetExpertsBySpecialityRequest {
  export type AsObject = {
    speciality: string,
  }
}

export class DeleteExpertRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeleteExpertRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteExpertRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteExpertRequest): DeleteExpertRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteExpertRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteExpertRequest;
  static deserializeBinaryFromReader(message: DeleteExpertRequest, reader: jspb.BinaryReader): DeleteExpertRequest;
}

export namespace DeleteExpertRequest {
  export type AsObject = {
    id: string,
  }
}

export class ExpertReply extends jspb.Message {
  getId(): string;
  setId(value: string): ExpertReply;

  getSpecialities(): string;
  setSpecialities(value: string): ExpertReply;

  getCertificationDocs(): string;
  setCertificationDocs(value: string): ExpertReply;

  getIsAvailable(): boolean;
  setIsAvailable(value: boolean): ExpertReply;

  getRating(): number;
  setRating(value: number): ExpertReply;

  getUserId(): string;
  setUserId(value: string): ExpertReply;

  getFirstName(): string;
  setFirstName(value: string): ExpertReply;

  getLastName(): string;
  setLastName(value: string): ExpertReply;

  getEmail(): string;
  setEmail(value: string): ExpertReply;

  getYearsOfExperience(): number;
  setYearsOfExperience(value: number): ExpertReply;

  getReviewCount(): string;
  setReviewCount(value: string): ExpertReply;

  getServicePrice(): number;
  setServicePrice(value: number): ExpertReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExpertReply.AsObject;
  static toObject(includeInstance: boolean, msg: ExpertReply): ExpertReply.AsObject;
  static serializeBinaryToWriter(message: ExpertReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExpertReply;
  static deserializeBinaryFromReader(message: ExpertReply, reader: jspb.BinaryReader): ExpertReply;
}

export namespace ExpertReply {
  export type AsObject = {
    id: string,
    specialities: string,
    certificationDocs: string,
    isAvailable: boolean,
    rating: number,
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    yearsOfExperience: number,
    reviewCount: string,
    servicePrice: number,
  }
}

export class ExpertsReply extends jspb.Message {
  getExpertsList(): Array<ExpertReply>;
  setExpertsList(value: Array<ExpertReply>): ExpertsReply;
  clearExpertsList(): ExpertsReply;
  addExperts(value?: ExpertReply, index?: number): ExpertReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExpertsReply.AsObject;
  static toObject(includeInstance: boolean, msg: ExpertsReply): ExpertsReply.AsObject;
  static serializeBinaryToWriter(message: ExpertsReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExpertsReply;
  static deserializeBinaryFromReader(message: ExpertsReply, reader: jspb.BinaryReader): ExpertsReply;
}

export namespace ExpertsReply {
  export type AsObject = {
    expertsList: Array<ExpertReply.AsObject>,
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

export class ServicePriceReply extends jspb.Message {
  getServicePrice(): number;
  setServicePrice(value: number): ServicePriceReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServicePriceReply.AsObject;
  static toObject(includeInstance: boolean, msg: ServicePriceReply): ServicePriceReply.AsObject;
  static serializeBinaryToWriter(message: ServicePriceReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServicePriceReply;
  static deserializeBinaryFromReader(message: ServicePriceReply, reader: jspb.BinaryReader): ServicePriceReply;
}

export namespace ServicePriceReply {
  export type AsObject = {
    servicePrice: number,
  }
}

