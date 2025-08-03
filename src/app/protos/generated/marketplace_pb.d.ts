import * as jspb from 'google-protobuf'



export class CheckoutSessionRequest extends jspb.Message {
  getExpertId(): string;
  setExpertId(value: string): CheckoutSessionRequest;

  getAmount(): number;
  setAmount(value: number): CheckoutSessionRequest;

  getCurrency(): string;
  setCurrency(value: string): CheckoutSessionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckoutSessionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CheckoutSessionRequest): CheckoutSessionRequest.AsObject;
  static serializeBinaryToWriter(message: CheckoutSessionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckoutSessionRequest;
  static deserializeBinaryFromReader(message: CheckoutSessionRequest, reader: jspb.BinaryReader): CheckoutSessionRequest;
}

export namespace CheckoutSessionRequest {
  export type AsObject = {
    expertId: string,
    amount: number,
    currency: string,
  }
}

export class CheckoutSessionReply extends jspb.Message {
  getCheckoutUrl(): string;
  setCheckoutUrl(value: string): CheckoutSessionReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckoutSessionReply.AsObject;
  static toObject(includeInstance: boolean, msg: CheckoutSessionReply): CheckoutSessionReply.AsObject;
  static serializeBinaryToWriter(message: CheckoutSessionReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckoutSessionReply;
  static deserializeBinaryFromReader(message: CheckoutSessionReply, reader: jspb.BinaryReader): CheckoutSessionReply;
}

export namespace CheckoutSessionReply {
  export type AsObject = {
    checkoutUrl: string,
  }
}

export class PurchaseRequest extends jspb.Message {
  getBuyerId(): string;
  setBuyerId(value: string): PurchaseRequest;

  getServiceId(): string;
  setServiceId(value: string): PurchaseRequest;

  getAmount(): number;
  setAmount(value: number): PurchaseRequest;

  getCurrency(): string;
  setCurrency(value: string): PurchaseRequest;

  getExpertId(): string;
  setExpertId(value: string): PurchaseRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PurchaseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PurchaseRequest): PurchaseRequest.AsObject;
  static serializeBinaryToWriter(message: PurchaseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PurchaseRequest;
  static deserializeBinaryFromReader(message: PurchaseRequest, reader: jspb.BinaryReader): PurchaseRequest;
}

export namespace PurchaseRequest {
  export type AsObject = {
    buyerId: string,
    serviceId: string,
    amount: number,
    currency: string,
    expertId: string,
  }
}

export class PurchaseResponse extends jspb.Message {
  getClientSecret(): string;
  setClientSecret(value: string): PurchaseResponse;

  getPaymentIntentId(): string;
  setPaymentIntentId(value: string): PurchaseResponse;

  getStatus(): PaymentStatus;
  setStatus(value: PaymentStatus): PurchaseResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PurchaseResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PurchaseResponse): PurchaseResponse.AsObject;
  static serializeBinaryToWriter(message: PurchaseResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PurchaseResponse;
  static deserializeBinaryFromReader(message: PurchaseResponse, reader: jspb.BinaryReader): PurchaseResponse;
}

export namespace PurchaseResponse {
  export type AsObject = {
    clientSecret: string,
    paymentIntentId: string,
    status: PaymentStatus,
  }
}

export class CreateStripeAccountRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): CreateStripeAccountRequest;

  getEmail(): string;
  setEmail(value: string): CreateStripeAccountRequest;

  getCountry(): string;
  setCountry(value: string): CreateStripeAccountRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateStripeAccountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateStripeAccountRequest): CreateStripeAccountRequest.AsObject;
  static serializeBinaryToWriter(message: CreateStripeAccountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateStripeAccountRequest;
  static deserializeBinaryFromReader(message: CreateStripeAccountRequest, reader: jspb.BinaryReader): CreateStripeAccountRequest;
}

export namespace CreateStripeAccountRequest {
  export type AsObject = {
    userId: string,
    email: string,
    country: string,
  }
}

export class CreateStripeAccountReply extends jspb.Message {
  getStripeAccountId(): string;
  setStripeAccountId(value: string): CreateStripeAccountReply;

  getOnboardingUrl(): string;
  setOnboardingUrl(value: string): CreateStripeAccountReply;

  getStatus(): StripeAccountStatus;
  setStatus(value: StripeAccountStatus): CreateStripeAccountReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateStripeAccountReply.AsObject;
  static toObject(includeInstance: boolean, msg: CreateStripeAccountReply): CreateStripeAccountReply.AsObject;
  static serializeBinaryToWriter(message: CreateStripeAccountReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateStripeAccountReply;
  static deserializeBinaryFromReader(message: CreateStripeAccountReply, reader: jspb.BinaryReader): CreateStripeAccountReply;
}

export namespace CreateStripeAccountReply {
  export type AsObject = {
    stripeAccountId: string,
    onboardingUrl: string,
    status: StripeAccountStatus,
  }
}

export class GetStripeAccountStatusRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): GetStripeAccountStatusRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStripeAccountStatusRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetStripeAccountStatusRequest): GetStripeAccountStatusRequest.AsObject;
  static serializeBinaryToWriter(message: GetStripeAccountStatusRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStripeAccountStatusRequest;
  static deserializeBinaryFromReader(message: GetStripeAccountStatusRequest, reader: jspb.BinaryReader): GetStripeAccountStatusRequest;
}

export namespace GetStripeAccountStatusRequest {
  export type AsObject = {
    userId: string,
  }
}

export class GetStripeAccountStatusReply extends jspb.Message {
  getStripeAccountId(): string;
  setStripeAccountId(value: string): GetStripeAccountStatusReply;

  getStatus(): StripeAccountStatus;
  setStatus(value: StripeAccountStatus): GetStripeAccountStatusReply;

  getRequirementsList(): Array<string>;
  setRequirementsList(value: Array<string>): GetStripeAccountStatusReply;
  clearRequirementsList(): GetStripeAccountStatusReply;
  addRequirements(value: string, index?: number): GetStripeAccountStatusReply;

  getPayoutsEnabled(): boolean;
  setPayoutsEnabled(value: boolean): GetStripeAccountStatusReply;

  getChargesEnabled(): boolean;
  setChargesEnabled(value: boolean): GetStripeAccountStatusReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStripeAccountStatusReply.AsObject;
  static toObject(includeInstance: boolean, msg: GetStripeAccountStatusReply): GetStripeAccountStatusReply.AsObject;
  static serializeBinaryToWriter(message: GetStripeAccountStatusReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStripeAccountStatusReply;
  static deserializeBinaryFromReader(message: GetStripeAccountStatusReply, reader: jspb.BinaryReader): GetStripeAccountStatusReply;
}

export namespace GetStripeAccountStatusReply {
  export type AsObject = {
    stripeAccountId: string,
    status: StripeAccountStatus,
    requirementsList: Array<string>,
    payoutsEnabled: boolean,
    chargesEnabled: boolean,
  }
}

export class CreatePaymentIntentRequest extends jspb.Message {
  getBuyerId(): string;
  setBuyerId(value: string): CreatePaymentIntentRequest;

  getExpertId(): string;
  setExpertId(value: string): CreatePaymentIntentRequest;

  getServiceId(): string;
  setServiceId(value: string): CreatePaymentIntentRequest;

  getAmount(): number;
  setAmount(value: number): CreatePaymentIntentRequest;

  getCurrency(): string;
  setCurrency(value: string): CreatePaymentIntentRequest;

  getApplicationFeeAmount(): number;
  setApplicationFeeAmount(value: number): CreatePaymentIntentRequest;

  getDescription(): string;
  setDescription(value: string): CreatePaymentIntentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatePaymentIntentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreatePaymentIntentRequest): CreatePaymentIntentRequest.AsObject;
  static serializeBinaryToWriter(message: CreatePaymentIntentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreatePaymentIntentRequest;
  static deserializeBinaryFromReader(message: CreatePaymentIntentRequest, reader: jspb.BinaryReader): CreatePaymentIntentRequest;
}

export namespace CreatePaymentIntentRequest {
  export type AsObject = {
    buyerId: string,
    expertId: string,
    serviceId: string,
    amount: number,
    currency: string,
    applicationFeeAmount: number,
    description: string,
  }
}

export class CreatePaymentIntentReply extends jspb.Message {
  getClientSecret(): string;
  setClientSecret(value: string): CreatePaymentIntentReply;

  getPaymentIntentId(): string;
  setPaymentIntentId(value: string): CreatePaymentIntentReply;

  getStatus(): PaymentStatus;
  setStatus(value: PaymentStatus): CreatePaymentIntentReply;

  getAmount(): number;
  setAmount(value: number): CreatePaymentIntentReply;

  getCurrency(): string;
  setCurrency(value: string): CreatePaymentIntentReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatePaymentIntentReply.AsObject;
  static toObject(includeInstance: boolean, msg: CreatePaymentIntentReply): CreatePaymentIntentReply.AsObject;
  static serializeBinaryToWriter(message: CreatePaymentIntentReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreatePaymentIntentReply;
  static deserializeBinaryFromReader(message: CreatePaymentIntentReply, reader: jspb.BinaryReader): CreatePaymentIntentReply;
}

export namespace CreatePaymentIntentReply {
  export type AsObject = {
    clientSecret: string,
    paymentIntentId: string,
    status: PaymentStatus,
    amount: number,
    currency: string,
  }
}

export enum StripeAccountStatus { 
  PENDING = 0,
  ACTIVE = 1,
  RESTRICTED = 2,
  REJECTED = 3,
}
export enum PaymentStatus { 
  REQUIRES_PAYMENT_METHOD = 0,
  REQUIRES_CONFIRMATION = 1,
  REQUIRES_ACTION = 2,
  PROCESSING = 3,
  SUCCEEDED = 4,
  CANCELED = 5,
  FAILED = 6,
}
