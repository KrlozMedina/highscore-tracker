import { Module } from '@nestjs/common';
import { ScoreController, ScoresByAdmin } from './scores.controller';
import { ScoresService } from './scores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Scores, ScoresSchema } from './scores.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Scores.name,
      schema: ScoresSchema
    }])
  ],
  controllers: [ScoreController, ScoresByAdmin],
  providers: [ScoresService]
})
export class ScoresModule {}
