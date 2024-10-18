import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
const httpMocks = require('node-mocks-http');


describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should say hello", async () =>{
    const response = await controller.sayHello("Fachrul", "Faathirullah");
    expect(response).toBe("Hello Fachrul Faathirullah")
  })


  it("should can get view", async () => {
    const response = httpMocks.createResponse();
    controller.viewHello("Fachrul", "Faathirullah", response);

    expect(response._getRenderView()).toBe("index.html");
    expect(response._getRenderData()).toEqual({
      name: "Fachrul",
      last_name: "Faathirullah",
      title: "Template Engine"
    })

  })
});
