import { Body, Controller, Get, Header, HttpCode, HttpRedirectResponse, Inject, Optional, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {

    @Inject()
    private userService: UserService;

    constructor(private service: UserService) {}

    @Post("/post/sample")
    post() : string {
        return 'Sample response'; 
    }

    @Get("/get/sample")
    get() : string {
        return 'Sample response'; 

    }


    @Get("/hello")
    async sayHello(
        @Query("first_name") first_name : string,
        @Query("last_name") last_name : string
    ) : Promise<string> {
       return `Hello ${first_name + " "+ last_name}`
    }

    
    @Get("/id/:id")
    getById(@Param("id") id : string) : string {
       return `Get ${id}`
    }

    @Post("/body")
    getByBody(@Body("name") name : string) : string {
       return `Get ${name}`
    }

    @Get("/sample-response")
    @Header("Content-Type", "application/json")
    @HttpCode(200)
    sampleResponse() : Record<string,string> {
       return {
        "data" : "Hello JSON" 
       }
    }

    @Get("/redirect")
    @Redirect()
    redirect(): HttpRedirectResponse{
        return {
            url : "/api/user/sample-response",
            statusCode: 302
        }
    }

    @Get("/set-cookie")
    @Header("Content-Type", "application/json")
    sampleCookies(@Query("name") name:string, @Res() response:Response){
        response.cookie("name", name);
        response.status(200).send("Success set status cookie");

    }

    @Get("/get-cookie")
    setCookie(@Req() request:Request) : string {
        return request.cookies['name'];
    }

    @Get("/view/hello")
    viewHello(@Query("name") name: string, @Query("last_name") last_name: string, @Res() response: Response) {
        return response.render("index.html", {
            title: "Template Engine",
            name: name,
            last_name:last_name
        });
    }


    @Get("/helloDepends")
    async sayHelloDepends(@Query("name") name:string ): Promise<string>{
        return this.userService.sayHello(name);
        // return "test";
    }

}
