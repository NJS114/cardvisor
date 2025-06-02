declare module 'grpc-web' {
  export class GrpcWebClientBase {
    constructor(options?: {
      format?: string;
      suppressCorsPreflight?: boolean;
    });
  }

  export class Metadata {
    constructor();
    append(key: string, value: string): void;
    get(key: string): string[];
  }

  export enum Code {
    OK = 0,
    CANCELLED = 1,
    UNKNOWN = 2,
    INVALID_ARGUMENT = 3,
    DEADLINE_EXCEEDED = 4,
    NOT_FOUND = 5,
    ALREADY_EXISTS = 6,
    PERMISSION_DENIED = 7,
    UNAUTHENTICATED = 16,
    RESOURCE_EXHAUSTED = 8,
    FAILED_PRECONDITION = 9,
    ABORTED = 10,
    OUT_OF_RANGE = 11,
    UNIMPLEMENTED = 12,
    INTERNAL = 13,
    UNAVAILABLE = 14,
    DATA_LOSS = 15,
  }

  export interface RpcOptions {
    transport?: any;
    debug?: boolean;
    onHeaders?: (headers: Metadata) => void;
    onMessage?: (message: any) => void;
    onEnd?: (code: Code, message: string, trailers: Metadata) => void;
  }
} 