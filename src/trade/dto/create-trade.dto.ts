import { IsNumber, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating a trade request between users.
 */
export class CreateTradeDto {
  /**
   * ID of the user initiating the trade.
   */
  @IsNumber()
  sender_id: number;

  /**
   * ID of the user receiving the trade request.
   */
  @IsNumber()
  receiver_id: number;

  /**
   * Current status of the trade (e.g., 'pending', 'accepted').
   */
  @IsString()
  status: string;

  /**
   * Optional reference to the sender (populated internally).
   */
  sender?: number;

  /**
   * Optional reference to the receiver (populated internally).
   */
  receiver?: number;
}
