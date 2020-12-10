import {Request as RequestExpress, Response as ResponseExpress} from 'express';

interface ParamsDictionary { [key: string]: string; }
interface ParsedQs { [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[] }

export type {NextFunction} from 'express';
export type Request = RequestExpress<ParamsDictionary, any, any, ParsedQs>
export type Response = ResponseExpress<any>
