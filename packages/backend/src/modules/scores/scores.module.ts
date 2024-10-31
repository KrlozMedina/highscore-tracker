import { Module } from '@nestjs/common';
import { LeaderBoardController, ScoreController, ScoresByAdmin } from './scores.controller';
import { ScoresService } from './scores.service';

@Module({
  controllers: [LeaderBoardController, ScoreController, ScoresByAdmin],
  providers: [ScoresService]
})
export class ScoresModule {}
