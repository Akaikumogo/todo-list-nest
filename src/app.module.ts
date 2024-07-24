import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './Middleware/Middlewarebase64';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://sarvarbekred147:akaikumogo@cluster0.o33vpve.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UserModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'user/register', method: RequestMethod.ALL },
        { path: 'user/login', method: RequestMethod.ALL },
      )   
      .forRoutes('*');
  }
}
