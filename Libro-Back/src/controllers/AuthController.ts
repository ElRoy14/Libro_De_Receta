import { Router } from 'express';
import passport from 'passport';
import { injectable, inject } from 'tsyringe';
import IOAuthService from '../interfaces/IOAuthService';
import IAuthService from '../interfaces/IAuthService';
import { CreateUserDto } from '../dtos/CreateUserDto';

@injectable()
export default class AuthController {

    constructor(
        @inject("IOAuthService")
        private readonly oAuthService: IOAuthService,
        @inject("IAuthService")
        private readonly authService: IAuthService
    ) {}

    login = async (req: any, res: any, next: any) => {
        try
        {
            const result = await this.authService.login(req, res, next);
            res.status(200).json(result);
        }
        catch(error){
            next(error);
        }
    }

    logout = async (req: any, res: any, next: any) => {
        try
        {
            const result = await this.authService.logout(req, res, next);
            res.status(200).json(result);
        }
        catch(error){
            next(error);
        }
    }

    signup = async (req: any, res: any, next: any) => {
        try
        {
            const userDto: CreateUserDto = req.body;
            const result = await this.authService.signup(userDto, res, next);
            res.status(201).json(result);
        }
        catch(error){
            next(error);
        }
    }

    AuthGoogle = async (req: any, res: any, next: any) => {
        try
        {
            const result = await this.oAuthService.AuthGoogle(req, res);
            res.status(200).json(result);
        }
        catch(error){
            next(error);
        }
    }

    AuthGoogleCallback = async (req: any, res: any, next: any) => {
        try
        {
            const result = await this.oAuthService.AuthGoogleCallback(req, res);
            res.status(200).json(result);
        }
        catch(error){
            next(error);
        }
    }
}
