import * as jspb from 'google-protobuf'



export class UploadReportFileRequest extends jspb.Message {
  getReportId(): string;
  setReportId(value: string): UploadReportFileRequest;

  getFileName(): string;
  setFileName(value: string): UploadReportFileRequest;

  getChunkData(): Uint8Array | string;
  getChunkData_asU8(): Uint8Array;
  getChunkData_asB64(): string;
  setChunkData(value: Uint8Array | string): UploadReportFileRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadReportFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UploadReportFileRequest): UploadReportFileRequest.AsObject;
  static serializeBinaryToWriter(message: UploadReportFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadReportFileRequest;
  static deserializeBinaryFromReader(message: UploadReportFileRequest, reader: jspb.BinaryReader): UploadReportFileRequest;
}

export namespace UploadReportFileRequest {
  export type AsObject = {
    reportId: string,
    fileName: string,
    chunkData: Uint8Array | string,
  }
}

export class VerifyAttachmentRequest extends jspb.Message {
  getAttachmentId(): string;
  setAttachmentId(value: string): VerifyAttachmentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyAttachmentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyAttachmentRequest): VerifyAttachmentRequest.AsObject;
  static serializeBinaryToWriter(message: VerifyAttachmentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyAttachmentRequest;
  static deserializeBinaryFromReader(message: VerifyAttachmentRequest, reader: jspb.BinaryReader): VerifyAttachmentRequest;
}

export namespace VerifyAttachmentRequest {
  export type AsObject = {
    attachmentId: string,
  }
}

export class VerifyAttachmentReply extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): VerifyAttachmentReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyAttachmentReply.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyAttachmentReply): VerifyAttachmentReply.AsObject;
  static serializeBinaryToWriter(message: VerifyAttachmentReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyAttachmentReply;
  static deserializeBinaryFromReader(message: VerifyAttachmentReply, reader: jspb.BinaryReader): VerifyAttachmentReply;
}

export namespace VerifyAttachmentReply {
  export type AsObject = {
    message: string,
  }
}

export class DeleteAttachmentRequest extends jspb.Message {
  getAttachmentId(): string;
  setAttachmentId(value: string): DeleteAttachmentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAttachmentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAttachmentRequest): DeleteAttachmentRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteAttachmentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAttachmentRequest;
  static deserializeBinaryFromReader(message: DeleteAttachmentRequest, reader: jspb.BinaryReader): DeleteAttachmentRequest;
}

export namespace DeleteAttachmentRequest {
  export type AsObject = {
    attachmentId: string,
  }
}

export class DeleteAttachmentReply extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): DeleteAttachmentReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAttachmentReply.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAttachmentReply): DeleteAttachmentReply.AsObject;
  static serializeBinaryToWriter(message: DeleteAttachmentReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAttachmentReply;
  static deserializeBinaryFromReader(message: DeleteAttachmentReply, reader: jspb.BinaryReader): DeleteAttachmentReply;
}

export namespace DeleteAttachmentReply {
  export type AsObject = {
    message: string,
  }
}

export class UploadReportFileReply extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): UploadReportFileReply;

  getFileUrl(): string;
  setFileUrl(value: string): UploadReportFileReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadReportFileReply.AsObject;
  static toObject(includeInstance: boolean, msg: UploadReportFileReply): UploadReportFileReply.AsObject;
  static serializeBinaryToWriter(message: UploadReportFileReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadReportFileReply;
  static deserializeBinaryFromReader(message: UploadReportFileReply, reader: jspb.BinaryReader): UploadReportFileReply;
}

export namespace UploadReportFileReply {
  export type AsObject = {
    message: string,
    fileUrl: string,
  }
}

export class CreateReportRequest extends jspb.Message {
  getAppointmentId(): string;
  setAppointmentId(value: string): CreateReportRequest;

  getSummary(): string;
  setSummary(value: string): CreateReportRequest;

  getRecommendations(): string;
  setRecommendations(value: string): CreateReportRequest;

  getEstimatedValue(): number;
  setEstimatedValue(value: number): CreateReportRequest;

  getPriceNegotiationAdvice(): string;
  setPriceNegotiationAdvice(value: string): CreateReportRequest;

  getDocumentUrl(): string;
  setDocumentUrl(value: string): CreateReportRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateReportRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateReportRequest): CreateReportRequest.AsObject;
  static serializeBinaryToWriter(message: CreateReportRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateReportRequest;
  static deserializeBinaryFromReader(message: CreateReportRequest, reader: jspb.BinaryReader): CreateReportRequest;
}

export namespace CreateReportRequest {
  export type AsObject = {
    appointmentId: string,
    summary: string,
    recommendations: string,
    estimatedValue: number,
    priceNegotiationAdvice: string,
    documentUrl: string,
  }
}

export class ReportsReply extends jspb.Message {
  getReportsList(): Array<ReportReply>;
  setReportsList(value: Array<ReportReply>): ReportsReply;
  clearReportsList(): ReportsReply;
  addReports(value?: ReportReply, index?: number): ReportReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReportsReply.AsObject;
  static toObject(includeInstance: boolean, msg: ReportsReply): ReportsReply.AsObject;
  static serializeBinaryToWriter(message: ReportsReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReportsReply;
  static deserializeBinaryFromReader(message: ReportsReply, reader: jspb.BinaryReader): ReportsReply;
}

export namespace ReportsReply {
  export type AsObject = {
    reportsList: Array<ReportReply.AsObject>,
  }
}

export class GetReportByAppointmentRequest extends jspb.Message {
  getAppointmentId(): string;
  setAppointmentId(value: string): GetReportByAppointmentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetReportByAppointmentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetReportByAppointmentRequest): GetReportByAppointmentRequest.AsObject;
  static serializeBinaryToWriter(message: GetReportByAppointmentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetReportByAppointmentRequest;
  static deserializeBinaryFromReader(message: GetReportByAppointmentRequest, reader: jspb.BinaryReader): GetReportByAppointmentRequest;
}

export namespace GetReportByAppointmentRequest {
  export type AsObject = {
    appointmentId: string,
  }
}

export class GetReportsByUserRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): GetReportsByUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetReportsByUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetReportsByUserRequest): GetReportsByUserRequest.AsObject;
  static serializeBinaryToWriter(message: GetReportsByUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetReportsByUserRequest;
  static deserializeBinaryFromReader(message: GetReportsByUserRequest, reader: jspb.BinaryReader): GetReportsByUserRequest;
}

export namespace GetReportsByUserRequest {
  export type AsObject = {
    userId: string,
  }
}

export class ReportReply extends jspb.Message {
  getId(): string;
  setId(value: string): ReportReply;

  getAppointmentId(): string;
  setAppointmentId(value: string): ReportReply;

  getSummary(): string;
  setSummary(value: string): ReportReply;

  getRecommendations(): string;
  setRecommendations(value: string): ReportReply;

  getEstimatedValue(): number;
  setEstimatedValue(value: number): ReportReply;

  getPriceNegotiationAdvice(): string;
  setPriceNegotiationAdvice(value: string): ReportReply;

  getDocumentUrl(): string;
  setDocumentUrl(value: string): ReportReply;

  getCreatedAt(): string;
  setCreatedAt(value: string): ReportReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReportReply.AsObject;
  static toObject(includeInstance: boolean, msg: ReportReply): ReportReply.AsObject;
  static serializeBinaryToWriter(message: ReportReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReportReply;
  static deserializeBinaryFromReader(message: ReportReply, reader: jspb.BinaryReader): ReportReply;
}

export namespace ReportReply {
  export type AsObject = {
    id: string,
    appointmentId: string,
    summary: string,
    recommendations: string,
    estimatedValue: number,
    priceNegotiationAdvice: string,
    documentUrl: string,
    createdAt: string,
  }
}

export class GetReportDocumentUrlRequest extends jspb.Message {
  getReportId(): string;
  setReportId(value: string): GetReportDocumentUrlRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetReportDocumentUrlRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetReportDocumentUrlRequest): GetReportDocumentUrlRequest.AsObject;
  static serializeBinaryToWriter(message: GetReportDocumentUrlRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetReportDocumentUrlRequest;
  static deserializeBinaryFromReader(message: GetReportDocumentUrlRequest, reader: jspb.BinaryReader): GetReportDocumentUrlRequest;
}

export namespace GetReportDocumentUrlRequest {
  export type AsObject = {
    reportId: string,
  }
}

export class GetReportDocumentUrlReply extends jspb.Message {
  getDocumentUrl(): string;
  setDocumentUrl(value: string): GetReportDocumentUrlReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetReportDocumentUrlReply.AsObject;
  static toObject(includeInstance: boolean, msg: GetReportDocumentUrlReply): GetReportDocumentUrlReply.AsObject;
  static serializeBinaryToWriter(message: GetReportDocumentUrlReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetReportDocumentUrlReply;
  static deserializeBinaryFromReader(message: GetReportDocumentUrlReply, reader: jspb.BinaryReader): GetReportDocumentUrlReply;
}

export namespace GetReportDocumentUrlReply {
  export type AsObject = {
    documentUrl: string,
  }
}

export class UpdateReportRequest extends jspb.Message {
  getId(): string;
  setId(value: string): UpdateReportRequest;

  getSummary(): string;
  setSummary(value: string): UpdateReportRequest;

  getRecommendations(): string;
  setRecommendations(value: string): UpdateReportRequest;

  getEstimatedValue(): number;
  setEstimatedValue(value: number): UpdateReportRequest;

  getPriceNegotiationAdvice(): string;
  setPriceNegotiationAdvice(value: string): UpdateReportRequest;

  getDocumentUrl(): string;
  setDocumentUrl(value: string): UpdateReportRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateReportRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateReportRequest): UpdateReportRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateReportRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateReportRequest;
  static deserializeBinaryFromReader(message: UpdateReportRequest, reader: jspb.BinaryReader): UpdateReportRequest;
}

export namespace UpdateReportRequest {
  export type AsObject = {
    id: string,
    summary: string,
    recommendations: string,
    estimatedValue: number,
    priceNegotiationAdvice: string,
    documentUrl: string,
  }
}

