import * as protobuf from 'google-protobuf';
import { GrpcWebClientBase } from 'grpc-web';

// Configuration globale pour les imports de protobuf
(window as any).protobuf = protobuf;
(window as any).proto = (window as any).proto || {};

// Export des types nécessaires
export const ProtoConfig = {
  protobuf: protobuf,
  Message: protobuf.Message,
  BinaryWriter: protobuf.BinaryWriter,
  BinaryReader: protobuf.BinaryReader,
  jspb: protobuf,
  goog: protobuf,
  proto: (window as any).proto
};

// Export des classes de base
export const Message = protobuf.Message;
export const BinaryWriter = protobuf.BinaryWriter;
export const BinaryReader = protobuf.BinaryReader;

// Configuration du client gRPC-Web
const grpcClientConfig = {
  format: 'binary',
  suppressCorsPreflight: false,
  unaryInterceptors: [],
  streamInterceptors: []
};

// Fonction utilitaire pour créer un client gRPC
export function createGrpcClient<T>(ClientClass: new (hostname: string, credentials?: any) => T, host: string): T {
  const client = new ClientClass(host);
  (client as any).client_ = new GrpcWebClientBase(grpcClientConfig);
  return client;
} 