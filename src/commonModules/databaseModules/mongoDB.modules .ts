import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoUserSchema,  } from 'src/mongo/mongo.service';





@Module({
    //已经加上了用户名和密码还是认证失败  可能的原因时 虽然已经时管理员权限，但是没有给mongo新建的collection(也就是表) 分配权限，所以无法访问
    // docker exec -it  53df33015932 mongosh -u root -p  回车输入密码
    //  show dbs; use mongoDB 就是切换到 mongoDB  这个集合
    // mongoDB> db.createUser({user:"root",pwd:"example",roles:[{role:"dbOwner",db:"mongoDB"}]})
    // 上面的语句就是创建一个用户 用户名时root 并且将角色dbOwner 赋值给root  关于mongoDB这个集合的权限
    imports: [MongooseModule.forRoot('mongodb://root:example@localhost:27017/mongoDB'),
    MongooseModule.forFeature([{ name: 'User', schema: mongoUserSchema }])],
   
    
    exports: [MongooseModule], 
})
export class mongoDatabaseModule { }
