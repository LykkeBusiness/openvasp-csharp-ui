import {Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {FormMode} from 'src/app/shared/models/form-mode.interface';
import {CreateOutgoingTransactionRequest} from '../models/OpenVASP.Host.Models/create-outgoing-transaction-request.interface';
import {NaturalIdentificationType} from '../models/OpenVASP.Messaging.Messages.Entities/natural-identification-type.enum';
import {JuridicalIdentificationType} from '../models/OpenVASP.Messaging.Messages.Entities/juridical-identification-type.enum';
import {FormBuilder, Validators, FormArray, FormGroup, AbstractControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as constants from 'src/app/core/constants/const';
import {CountriesService} from 'src/app/shared/services/countries.service';
import {Country} from 'src/app/shared/models/country.interface';
import {markFormControlAsTouched} from 'src/app/shared/utils/markFormControlAsTouched';
import {TranslateService} from 'src/app/shared/services/translate.service';
import {LengthValidator, AccuracyValidator, VaanValidator} from 'src/app/shared/utils/validators';
import {ROUTE_ADMIN_ROOT, ROUTE_TRANSACTIONS} from 'src/app/core/constants/routes';
import {GlobalTemplates} from 'src/app/shared/models/global-templates.interface';
import {OriginatorType} from '../models/originator-type.enum';
import {DictionariesService} from 'src/app/shared/services/dictionaries.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TransactionFormComponent implements OnInit {
  @Input()
  type: FormMode = FormMode.Create;

  @Input()
  isSaving: boolean;

  @Input()
  errors: string[] = [];

  @Output()
  submitSuccess = new EventEmitter<CreateOutgoingTransactionRequest>();

  transactionFormProps = {
    BeneficiaryFullName: 'BeneficiaryFullName',
    BeneficiaryVaan: 'BeneficiaryVaan',
    OriginatorFullName: 'OriginatorFullName',
    OriginatorVaan: 'OriginatorVaan',
    OriginatorPostalAddress: 'OriginatorPostalAddress',
    OriginatorPlaceOfBirth: 'OriginatorPlaceOfBirth',
    OriginatorNaturalPersonIds: 'OriginatorNaturalPersonIds',
    OriginatorJuridicalPersonIds: 'OriginatorJuridicalPersonIds',
    OriginatorBic: 'OriginatorBic',
    Asset: 'Asset',
    Amount: 'Amount',
  };

  postalAddressFormProps = {
    Street: 'Street',
    Building: 'Building',
    AddressLine: 'AddressLine',
    PostCode: 'PostCode',
    Town: 'Town',
    CountryIso2Code: 'CountryIso2Code',
  };

  placeOfBirthFormProps = {
    Town: 'Town',
    CountryIso2Code: 'CountryIso2Code',
    Date: 'Date',
  };

  personFormProps = {
    IdentificationType: 'IdentificationType',
    Identifier: 'Identifier',
    CountryIso2Code: 'CountryIso2Code',
    NonStateIssuer: 'NonStateIssuer',
  };

  originatorTypeValue: OriginatorType = OriginatorType.BIC;
  OriginatorType: OriginatorType;
  NaturalIdentificationType = NaturalIdentificationType;
  JuridicalIdentificationType = JuridicalIdentificationType;
  constants = constants;
  navigateToListUrl = `${ROUTE_ADMIN_ROOT}/${ROUTE_TRANSACTIONS}`;
  templates: GlobalTemplates;

  transactionFormValidations = {
    FullName: {
      MinLength: 3,
      MaxLength: 200,
    },
    Vaan: {
      MinLength: 24,
      MaxLength: 29,
    },
    Bic: {
      MinLength: 8,
      MaxLength: 11,
    },
    Town: {
      MinLength: 2,
      MaxLength: 100,
    },
    Street: {
      MinLength: 3,
      MaxLength: 200,
    },
    Building: {
      MinLength: 1,
      MaxLength: 50,
    },
    AddressLine: {
      MinLength: 3,
      MaxLength: 500,
    },
    PostCode: {
      MinLength: 3,
      MaxLength: 10,
    },
    Amount: {
      Accuracy: 4,
      MinNumber: 0.0001,
    },
  };

  transactionFormDynamicValidators = {
    [this.transactionFormProps.OriginatorBic]: [
      LengthValidator(this.transactionFormValidations.Bic.MinLength, this.transactionFormValidations.Bic.MaxLength),
    ],
    [this.placeOfBirthFormProps.Town]: [
      LengthValidator(this.transactionFormValidations.Town.MinLength, this.transactionFormValidations.Town.MaxLength),
    ],
  };

  transactionForm = this.fb.group({
    [this.transactionFormProps.BeneficiaryFullName]: [
      null,
      [
        Validators.required,
        LengthValidator(this.transactionFormValidations.FullName.MinLength, this.transactionFormValidations.FullName.MaxLength),
      ],
    ],
    [this.transactionFormProps.BeneficiaryVaan]: [
      null,
      [
        Validators.required,
        LengthValidator(this.transactionFormValidations.Vaan.MinLength, this.transactionFormValidations.Vaan.MaxLength),
        VaanValidator,
      ],
    ],
    [this.transactionFormProps.OriginatorFullName]: [
      null,
      [
        Validators.required,
        LengthValidator(this.transactionFormValidations.FullName.MinLength, this.transactionFormValidations.FullName.MaxLength),
      ],
    ],
    [this.transactionFormProps.OriginatorVaan]: [
      null,
      [
        Validators.required,
        LengthValidator(this.transactionFormValidations.Vaan.MinLength, this.transactionFormValidations.Vaan.MaxLength),
        VaanValidator,
      ],
    ],
    [this.transactionFormProps.OriginatorPostalAddress]: this.fb.group({
      [this.postalAddressFormProps.Street]: [
        null,
        [
          Validators.required,
          LengthValidator(this.transactionFormValidations.Street.MinLength, this.transactionFormValidations.Street.MaxLength),
        ],
      ],
      [this.postalAddressFormProps.Building]: [
        null,
        [
          Validators.required,
          LengthValidator(this.transactionFormValidations.Street.MinLength, this.transactionFormValidations.Street.MaxLength),
        ],
      ],
      [this.postalAddressFormProps.AddressLine]: [
        null,
        [
          Validators.required,
          LengthValidator(this.transactionFormValidations.AddressLine.MinLength, this.transactionFormValidations.AddressLine.MaxLength),
        ],
      ],
      [this.postalAddressFormProps.PostCode]: [
        null,
        [
          Validators.required,
          LengthValidator(this.transactionFormValidations.PostCode.MinLength, this.transactionFormValidations.PostCode.MaxLength),
        ],
      ],
      [this.postalAddressFormProps.Town]: [
        null,
        [
          Validators.required,
          LengthValidator(this.transactionFormValidations.Town.MinLength, this.transactionFormValidations.Town.MaxLength),
        ],
      ],
      [this.postalAddressFormProps.CountryIso2Code]: [null, [Validators.required]],
    }),
    [this.transactionFormProps.OriginatorPlaceOfBirth]: this.generatePlaceOfBirth(),
    [this.transactionFormProps.OriginatorNaturalPersonIds]: this.fb.array([]),
    [this.transactionFormProps.OriginatorJuridicalPersonIds]: this.fb.array([]),
    [this.transactionFormProps.OriginatorBic]: [null],
    [this.transactionFormProps.Asset]: [null, [Validators.required]],
    [this.transactionFormProps.Amount]: [
      null,
      [
        Validators.required,
        Validators.min(this.transactionFormValidations.Amount.MinNumber),
        Validators.max(constants.INTEGER_MAX_NUMBER),
        AccuracyValidator(this.transactionFormValidations.Amount.Accuracy),
      ],
    ],
  });

  get originatorTypeIndex(): number {
    return this.originatorTypeValues.findIndex((x) => x.Value === this.originatorTypeValue);
  }

  get originatorNaturalPersonIdsFormArray(): FormArray {
    return this.transactionForm.get(this.transactionFormProps.OriginatorNaturalPersonIds) as FormArray;
  }

  get originatorPlaceOfBirth(): FormGroup {
    return this.transactionForm.get(this.transactionFormProps.OriginatorPlaceOfBirth) as FormGroup;
  }

  get originatorJuridicalPersonIdsFormArray(): FormArray {
    return this.transactionForm.get(this.transactionFormProps.OriginatorJuridicalPersonIds) as FormArray;
  }
  //#region  values for select fields
  assetValues: string[] = [];
  countries: Country[] = [];
  searchCountry = '';
  originatorTypeValues: Array<{Value: OriginatorType; DisplayName: string}> = [
    {Value: OriginatorType.BIC, DisplayName: 'BIC'},
    {Value: OriginatorType.JuridicalPerson, DisplayName: 'Juridical Person'},
    {Value: OriginatorType.NaturalPerson, DisplayName: 'Natural Person'},
  ];
  juridicalIdentificationTypeValues: Array<{Value: JuridicalIdentificationType; DisplayName: string}> = [
    {Value: JuridicalIdentificationType.CountryIdentificationNumber, DisplayName: 'Country Identification Number'},
    {Value: JuridicalIdentificationType.TaxIdentificationNumber, DisplayName: 'Tax Identification Number'},
    {Value: JuridicalIdentificationType.CertificateOfIncorporationNo, DisplayName: 'Certificate of Incorporation Number'},
    {Value: JuridicalIdentificationType.LegalEntityIdentifier, DisplayName: 'Legal Entity Identifier'},
    {Value: JuridicalIdentificationType.BankPartyIdentification, DisplayName: 'Bank Party Identification'},
    {Value: JuridicalIdentificationType.Other, DisplayName: 'Other'},
  ];
  naturalIdentificationTypeValues: Array<{Value: NaturalIdentificationType; DisplayName: string}> = [
    {Value: NaturalIdentificationType.PassportNumber, DisplayName: 'Passport Number'},
    {Value: NaturalIdentificationType.NationalIdentityNumber, DisplayName: 'National Identity Number'},
    {Value: NaturalIdentificationType.SocialSecurityNumber, DisplayName: 'Social Security Number'},
    {Value: NaturalIdentificationType.TaxIdentificationNumber, DisplayName: 'Tax Identification Number'},
    {Value: NaturalIdentificationType.AlienRegistrationNumber, DisplayName: 'Alien Registration Number'},
    {Value: NaturalIdentificationType.DriversLicenseNumber, DisplayName: 'Drivers License Number'},
    {Value: NaturalIdentificationType.Other, DisplayName: 'Other'},
  ];
  //#endregion

  constructor(
    // services
    private countriesService: CountriesService,
    private dictionariesService: DictionariesService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    this.assetValues = this.dictionariesService.assetValues;
    this.countries = this.countriesService.countries;
    this.templates = this.translateService.templates;
  }

  ngOnInit(): void {
    this.originatorNaturalPersonIdsFormArray.push(this.generatePersonFormGroup());
    this.originatorJuridicalPersonIdsFormArray.push(this.generatePersonFormGroup());

    //#region prefilled test data
    if (!!localStorage.getItem('prefillTestData')) {
      const testPrefilledModel: CreateOutgoingTransactionRequest = {
        BeneficiaryFullName: 'BeneficiaryFullName',
        BeneficiaryVaan: 'BBB4 eE5C 524e e3fb 0828 0970',
        OriginatorFullName: 'OriginatorFullName',
        OriginatorVaan: '7dfa ce61 524e e3fb 0828 095d',
        OriginatorPostalAddress: {
          Street: 'Street',
          Building: '1',
          AddressLine: 'AddressLine',
          PostCode: 'PostCode',
          Town: 'Town',
          CountryIso2Code: 'CH',
        },
        // OriginatorPlaceOfBirth: null,
        OriginatorPlaceOfBirth: {
          Town: 'Town',
          CountryIso2Code: 'CH',
          Date: '2000-05-20T00:00:00.000Z',
        },
        // OriginatorNaturalPersonIds: [],
        OriginatorNaturalPersonIds: [
          {
            IdentificationType: NaturalIdentificationType.PassportNumber,
            Identifier: 'Identifier',
            CountryIso2Code: 'CH',
            NonStateIssuer: 'NonStateIssuer',
          },
        ],
        // OriginatorJuridicalPersonIds: [],
        OriginatorJuridicalPersonIds: [
          {
            IdentificationType: JuridicalIdentificationType.CountryIdentificationNumber,
            Identifier: 'Identifier',
            CountryIso2Code: 'CH',
            NonStateIssuer: 'NonStateIssuer',
          },
        ],
        // OriginatorBic: null,
        OriginatorBic: 'AAAABBCCDDD',
        Asset: 'ETH',
        Amount: 0.0001,
      };

      if (window.location.port === '4201') {
        testPrefilledModel.BeneficiaryVaan = '7dfa ce61 524e e3fb 0828 095d';
        testPrefilledModel.OriginatorVaan = 'BBB4 eE5C 524e e3fb 0828 0970';
      }

      this.transactionForm.reset(testPrefilledModel);
    }
    //#endregion

    this.originatorTypeValueChange(this.originatorTypeValue);
  }

  generatePersonFormGroup(): FormGroup {
    return this.fb.group({
      [this.personFormProps.IdentificationType]: [null],
      [this.personFormProps.Identifier]: [null],
      [this.personFormProps.CountryIso2Code]: [null],
      [this.personFormProps.NonStateIssuer]: [null],
    });
  }

  generatePlaceOfBirth(): FormGroup {
    return this.fb.group({
      [this.placeOfBirthFormProps.Town]: [null],
      [this.placeOfBirthFormProps.CountryIso2Code]: [null],
      [this.placeOfBirthFormProps.Date]: [null],
    });
  }

  originatorTypeValueChange(value: OriginatorType) {
    const bicControl = this.transactionForm.get(this.transactionFormProps.OriginatorBic);

    const juridicalPersonControls = {
      [this.personFormProps.IdentificationType]: this.originatorJuridicalPersonIdsFormArray.controls[0].get(
        this.personFormProps.IdentificationType
      ),
      [this.personFormProps.Identifier]: this.originatorJuridicalPersonIdsFormArray.controls[0].get(this.personFormProps.Identifier),
      [this.personFormProps.CountryIso2Code]: this.originatorJuridicalPersonIdsFormArray.controls[0].get(
        this.personFormProps.CountryIso2Code
      ),
      [this.personFormProps.NonStateIssuer]: this.originatorJuridicalPersonIdsFormArray.controls[0].get(
        this.personFormProps.NonStateIssuer
      ),
    };

    const naturalPersonControls = {
      [this.personFormProps.IdentificationType]: this.originatorNaturalPersonIdsFormArray.controls[0].get(
        this.personFormProps.IdentificationType
      ),
      [this.personFormProps.Identifier]: this.originatorNaturalPersonIdsFormArray.controls[0].get(this.personFormProps.Identifier),
      [this.personFormProps.CountryIso2Code]: this.originatorNaturalPersonIdsFormArray.controls[0].get(
        this.personFormProps.CountryIso2Code
      ),
      [this.personFormProps.NonStateIssuer]: this.originatorNaturalPersonIdsFormArray.controls[0].get(this.personFormProps.NonStateIssuer),
    };

    const placeOfBirthControls = {
      [this.placeOfBirthFormProps.Town]: this.originatorPlaceOfBirth.get(this.placeOfBirthFormProps.Town),
      [this.placeOfBirthFormProps.CountryIso2Code]: this.originatorPlaceOfBirth.get(this.placeOfBirthFormProps.CountryIso2Code),
      [this.placeOfBirthFormProps.Date]: this.originatorPlaceOfBirth.get(this.placeOfBirthFormProps.Date),
    };

    switch (value) {
      case OriginatorType.BIC:
        bicControl.setValidators([Validators.required, ...this.transactionFormDynamicValidators[this.transactionFormProps.OriginatorBic]]);
        bicControl.updateValueAndValidity();

        this.clearJuridicalPersonValidators(juridicalPersonControls);
        this.clearNaturalPersonValidators(naturalPersonControls, placeOfBirthControls);
        break;
      case OriginatorType.JuridicalPerson:
        juridicalPersonControls[this.personFormProps.IdentificationType].setValidators([Validators.required]);
        juridicalPersonControls[this.personFormProps.Identifier].setValidators([Validators.required]);
        juridicalPersonControls[this.personFormProps.CountryIso2Code].setValidators([Validators.required]);
        juridicalPersonControls[this.personFormProps.NonStateIssuer].setValidators([Validators.required]);

        this.updateValidityOfJuridicalPerson(juridicalPersonControls);

        this.clearBicValidators(bicControl);
        this.clearNaturalPersonValidators(naturalPersonControls, placeOfBirthControls);
        break;
      case OriginatorType.NaturalPerson:
        naturalPersonControls[this.personFormProps.IdentificationType].setValidators([Validators.required]);
        naturalPersonControls[this.personFormProps.Identifier].setValidators([Validators.required]);
        naturalPersonControls[this.personFormProps.CountryIso2Code].setValidators([Validators.required]);
        naturalPersonControls[this.personFormProps.NonStateIssuer].setValidators([Validators.required]);

        placeOfBirthControls[this.placeOfBirthFormProps.Town].setValidators([
          Validators.required,
          ...this.transactionFormDynamicValidators[this.placeOfBirthFormProps.Town],
        ]);
        placeOfBirthControls[this.placeOfBirthFormProps.CountryIso2Code].setValidators([Validators.required]);
        placeOfBirthControls[this.placeOfBirthFormProps.Date].setValidators([Validators.required]);

        this.updateValidityOfNaturalPerson(naturalPersonControls, placeOfBirthControls);

        this.clearBicValidators(bicControl);
        this.clearJuridicalPersonValidators(juridicalPersonControls);
        break;
      default:
        throw new Error('Unhandled OriginatorType');
    }
  }

  private clearBicValidators(bicControl: AbstractControl) {
    bicControl.setValidators(null);
    bicControl.updateValueAndValidity();
  }

  private clearJuridicalPersonValidators(juridicalPersonControls: {[x: string]: AbstractControl}) {
    juridicalPersonControls[this.personFormProps.IdentificationType].setValidators(null);
    juridicalPersonControls[this.personFormProps.Identifier].setValidators(null);
    juridicalPersonControls[this.personFormProps.CountryIso2Code].setValidators(null);
    juridicalPersonControls[this.personFormProps.NonStateIssuer].setValidators(null);
    this.updateValidityOfJuridicalPerson(juridicalPersonControls);
  }

  private updateValidityOfJuridicalPerson(juridicalPersonControls: {[x: string]: AbstractControl}) {
    juridicalPersonControls[this.personFormProps.IdentificationType].updateValueAndValidity();
    juridicalPersonControls[this.personFormProps.Identifier].updateValueAndValidity();
    juridicalPersonControls[this.personFormProps.CountryIso2Code].updateValueAndValidity();
    juridicalPersonControls[this.personFormProps.NonStateIssuer].updateValueAndValidity();
  }

  private clearNaturalPersonValidators(
    naturalPersonControls: {[x: string]: AbstractControl},
    placeOfBirthControls: {[x: string]: AbstractControl}
  ) {
    naturalPersonControls[this.personFormProps.IdentificationType].setValidators(null);
    naturalPersonControls[this.personFormProps.Identifier].setValidators(null);
    naturalPersonControls[this.personFormProps.CountryIso2Code].setValidators(null);
    naturalPersonControls[this.personFormProps.NonStateIssuer].setValidators(null);

    placeOfBirthControls[this.placeOfBirthFormProps.Town].setValidators(null);
    placeOfBirthControls[this.placeOfBirthFormProps.CountryIso2Code].setValidators(null);
    placeOfBirthControls[this.placeOfBirthFormProps.Date].setValidators(null);

    this.updateValidityOfNaturalPerson(naturalPersonControls, placeOfBirthControls);
  }

  private updateValidityOfNaturalPerson(
    naturalPersonControls: {[x: string]: AbstractControl},
    placeOfBirthControls: {[x: string]: AbstractControl}
  ) {
    naturalPersonControls[this.personFormProps.IdentificationType].updateValueAndValidity();
    naturalPersonControls[this.personFormProps.Identifier].updateValueAndValidity();
    naturalPersonControls[this.personFormProps.CountryIso2Code].updateValueAndValidity();
    naturalPersonControls[this.personFormProps.NonStateIssuer].updateValueAndValidity();

    placeOfBirthControls[this.placeOfBirthFormProps.Town].updateValueAndValidity();
    placeOfBirthControls[this.placeOfBirthFormProps.CountryIso2Code].updateValueAndValidity();
    placeOfBirthControls[this.placeOfBirthFormProps.Date].updateValueAndValidity();
  }

  onSubmit() {
    markFormControlAsTouched(this.transactionForm);

    if (!this.transactionForm.valid) {
      // log(this.transactionForm);
      this.snackBar.open('Please check the form and fill the required fields', this.translateService.translates.CloseSnackbarBtnText, {
        duration: 5000,
      });
      return;
    }

    const model = this.transactionForm.getRawValue() as CreateOutgoingTransactionRequest;

    // originator type cleaning
    switch (this.originatorTypeValue) {
      case OriginatorType.BIC:
        model.OriginatorJuridicalPersonIds = null;
        model.OriginatorNaturalPersonIds = null;
        model.OriginatorPlaceOfBirth = null;
        break;
      case OriginatorType.JuridicalPerson:
        model.OriginatorBic = null;
        model.OriginatorNaturalPersonIds = null;
        model.OriginatorPlaceOfBirth = null;
        break;
      case OriginatorType.NaturalPerson:
        model.OriginatorBic = null;
        model.OriginatorJuridicalPersonIds = null;
        break;
      default:
        throw new Error('Unhandled OriginatorType');
    }

    this.submitSuccess.emit(model);
  }
}
