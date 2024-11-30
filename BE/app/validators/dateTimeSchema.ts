import { BaseLiteralType } from '@vinejs/vine'
import { dateTimeRule } from './dateTimeRule.js'
import { DateTime } from 'luxon'
import { FieldOptions, Validation } from '@vinejs/vine/types'

export class VineDateTime extends BaseLiteralType<DateTime,
    DateTime> {
    constructor(options?: FieldOptions, validations?:
        Validation<any>[]) {
        super(options, validations || [dateTimeRule()])
    }

    clone() {
        return new VineDateTime(this.cloneOptions(),
            this.cloneValidations()) as this
    }
}