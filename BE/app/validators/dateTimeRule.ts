import { FieldContext } from '@vinejs/vine/types'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

/**
 * Schema for checking whether input value is DateTime value
 */
export const dateTimeRule = vine.createRule((value: unknown, options, field: FieldContext) => {
  if (typeof value !== 'string') {
    field.report('The {{ field }} must be a date string', 'datetime', field)
    return
  }

  if (!DateTime.fromISO(value).isValid) {
    field.report('The {{ field }} is not a valid datetime', 'datetime', field)
    return
  }

  //   Return date time value if valid
  const dateTime = DateTime.fromISO(value)
  return dateTime
})