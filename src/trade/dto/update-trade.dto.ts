import { PartialType } from '@nestjs/mapped-types';
import { CreateTradeDto } from './create-trade.dto';

/**
 * Data Transfer Object for updating a trade.
 * Extends CreateTradeDto with optional fields using PartialType.
 */
export class UpdateTradeDto extends PartialType(CreateTradeDto) {
  /**
   * Updated status of the trade (e.g., 'pending', 'accepted', 'declined').
   */
  status?: 'pending' | 'accepted' | 'declined';

  /**
   * Timestamp indicating when the trade was completed.
   */
  completed_at?: Date;
}
