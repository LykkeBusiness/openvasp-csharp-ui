import {Validators} from '@angular/forms';
import {
  // validators
  AccuracyValidator,
  MoneyFormatValidator,
  MoneyMaxNumberValidator,
  MoneyMinMoreZeroValidator,
  MoneyMinZeroValidator,
} from 'src/app/shared/utils/validators';
import * as constants from 'src/app/core/constants/const';

export const defaultTokenZeroValidators = [
  // validators
  Validators.required,
  MoneyFormatValidator(),
  MoneyMinZeroValidator(),
  MoneyMaxNumberValidator(),
  AccuracyValidator(constants.TOKENS_INPUT_ACCURACY),
];

export const defaultTokenMoreZeroValidators = [
  // validators
  Validators.required,
  MoneyFormatValidator(),
  MoneyMinMoreZeroValidator(),
  MoneyMaxNumberValidator(),
  AccuracyValidator(constants.TOKENS_INPUT_ACCURACY),
];

export const defaultCurrencyMoreZeroValidators = [
  // validators
  Validators.required,
  Validators.min(constants.CURRENCY_INPUT_MIN_NUMBER),
  Validators.max(constants.CURRENCY_INPUT_MAX_NUMBER),
  AccuracyValidator(constants.CURRENCY_INPUT_ACCURACY),
];

export const defaultPercentageZeroValidators = [
  // validators
  Validators.required,
  Validators.min(0),
  Validators.max(constants.PERCENTAGE_INPUT_MAX_NUMBER),
  AccuracyValidator(constants.PERCENTAGE_INPUT_ACCURACY),
];

export const defaultPercentageMoreZeroValidators = [
  // validators
  Validators.required,
  Validators.min(constants.PERCENTAGE_INPUT_MIN_NUMBER),
  Validators.max(constants.PERCENTAGE_INPUT_MAX_NUMBER),
  AccuracyValidator(constants.PERCENTAGE_INPUT_ACCURACY),
];
