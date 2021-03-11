import { DateTime } from 'luxon'

export interface VoucherDTO {
  expiration: DateTime
  title: string
}
