declare module 'google-protobuf' {
  export * from 'google-protobuf/google-protobuf';

  export class Message {
    static initialize(msg: any, data: any, messageId: number, suggestedPivot: number, repeatedFields: number[] | null, oneofFields: any[] | null): void;
    static getFieldWithDefault(msg: any, fieldNumber: number, defaultValue: any): any;
    static getBooleanFieldWithDefault(msg: any, fieldNumber: number, defaultValue: boolean): boolean;
    static getFloatingPointFieldWithDefault(msg: any, fieldNumber: number, defaultValue: number): number;
    static setProto3StringField(msg: any, fieldNumber: number, value: string): any;
    static setProto3BooleanField(msg: any, fieldNumber: number, value: boolean): any;
    static setProto3FloatField(msg: any, fieldNumber: number, value: number): any;
    static setProto3BytesField(msg: any, fieldNumber: number, value: string | Uint8Array): any;
    static bytesAsB64(bytes: string): string;
    static bytesAsU8(bytes: string): Uint8Array;
    static toObjectList(list: any[], toObject: Function, includeInstance?: boolean): any[];
    static getRepeatedWrapperField(msg: any, fieldType: any, fieldNumber: number): any[];
    static setRepeatedWrapperField(msg: any, fieldNumber: number, value: any[]): any;
    static addToRepeatedWrapperField(msg: any, fieldNumber: number, value: any, fieldType: any, index?: number): any;
  }

  export class BinaryWriter {
    constructor();
    writeString(field: number, value: string): void;
    writeBool(field: number, value: boolean): void;
    writeFloat(field: number, value: number): void;
    writeBytes(field: number, value: Uint8Array): void;
    writeRepeatedMessage(field: number, value: any[], writerFunction: Function): void;
    getResultBuffer(): Uint8Array;
  }

  export class BinaryReader {
    constructor(bytes: Uint8Array);
    nextField(): boolean;
    isEndGroup(): boolean;
    getFieldNumber(): number;
    readString(): string;
    readBool(): boolean;
    readFloat(): number;
    readBytes(): Uint8Array;
    readMessage(value: any, readerFunction: Function): void;
    skipField(): void;
  }

  export const GENERATE_TO_OBJECT: boolean;
  export const COMPILED: boolean;
  export const DEBUG: boolean;
} 