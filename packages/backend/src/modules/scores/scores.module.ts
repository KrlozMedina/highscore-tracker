import { Module } from '@nestjs/common';
import { ScoreController, ScoresController, ScoresByAdmin } from './scores.controller';
import { ScoresService } from './scores.service';

@Module({
  controllers: [ScoreController, ScoreController, ScoresByAdmin],
  providers: [ScoresService]
})
export class ScoresModule {}
