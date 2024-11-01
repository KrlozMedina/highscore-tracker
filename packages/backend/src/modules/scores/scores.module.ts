import { Module } from '@nestjs/common';
import { ScoreController, ScoresByAdmin } from './scores.controller';
import { ScoresService } from './scores.service';

@Module({
  controllers: [ScoreController, ScoresByAdmin],
  providers: [ScoresService]
})
export class ScoresModule {}
