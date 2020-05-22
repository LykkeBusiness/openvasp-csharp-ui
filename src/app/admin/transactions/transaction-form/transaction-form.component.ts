import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormMode} from 'src/app/shared/models/form-mode.interface';
import {CreateOutgoingTransactionRequest} from '../models/OpenVASP.Host.Models/create-outgoing-transaction-request.interface';
import {NaturalIdentificationType} from '../models/OpenVASP.Messaging.Messages.Entities/natural-identification-type.enum';
import {JuridicalIdentificationType} from '../models/OpenVASP.Messaging.Messages.Entities/juridical-identification-type.enum';
import {FormBuilder, Validators, FormArray, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as constants from 'src/app/core/constants/const';
import {CountriesService} from 'src/app/shared/services/countries.service';
import {Country} from 'src/app/shared/models/country.interface';
import {markFormControlAsTouched} from 'src/app/shared/utils/markFormControlAsTouched';
import {TranslateService} from 'src/app/shared/services/translate.service';
import {LengthValidator, AccuracyValidator, IntegerValidator} from 'src/app/shared/utils/validators';
import {ROUTE_ADMIN_ROOT, ROUTE_TRANSACTIONS} from 'src/app/core/constants/routes';
import {GlobalTemplates} from 'src/app/shared/models/global-templates.interface';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
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

  naturalPersonIdFormProps = {
    IdentificationType: 'IdentificationType',
    Identifier: 'Identifier',
    CountryIso2Code: 'CountryIso2Code',
    NonStateIssuer: 'NonStateIssuer',
  };

  juridicalPersonIdFormProps = {
    IdentificationType: 'IdentificationType',
    Identifier: 'Identifier',
    CountryIso2Code: 'CountryIso2Code',
    NonStateIssuer: 'NonStateIssuer',
  };

  NaturalIdentificationType = NaturalIdentificationType;
  JuridicalIdentificationType = JuridicalIdentificationType;
  constants = constants;
  navigateToListUrl = `${ROUTE_ADMIN_ROOT}/${ROUTE_TRANSACTIONS}`;
  templates: GlobalTemplates;

  transactionForm = this.fb.group({
    [this.transactionFormProps.BeneficiaryFullName]: [null, [Validators.required, LengthValidator(3, 200)]],
    [this.transactionFormProps.BeneficiaryVaan]: [null, [Validators.required, LengthValidator(15, 50)]],
    [this.transactionFormProps.OriginatorFullName]: [null, [Validators.required]],
    [this.transactionFormProps.OriginatorVaan]: [null, [Validators.required, LengthValidator(15, 50)]],
    [this.transactionFormProps.OriginatorPostalAddress]: this.fb.group({
      [this.postalAddressFormProps.Street]: [null, [Validators.required, LengthValidator(3, 200)]],
      [this.postalAddressFormProps.Building]: [
        null,
        [Validators.required, Validators.min(1), Validators.max(constants.INTEGER_MAX_NUMBER), IntegerValidator],
      ],
      [this.postalAddressFormProps.AddressLine]: [null, [Validators.required, LengthValidator(3, 500)]],
      [this.postalAddressFormProps.PostCode]: [null, [Validators.required, LengthValidator(3, 10)]],
      [this.postalAddressFormProps.Town]: [null, [Validators.required, LengthValidator(2, 100)]],
      [this.postalAddressFormProps.CountryIso2Code]: [null, [Validators.required]],
    }),
    [this.transactionFormProps.OriginatorPlaceOfBirth]: this.generatePlaceOfBirth(),
    [this.transactionFormProps.OriginatorNaturalPersonIds]: this.fb.array([]),
    [this.transactionFormProps.OriginatorJuridicalPersonIds]: this.fb.array([]),
    [this.transactionFormProps.OriginatorBic]: [null],
    [this.transactionFormProps.Asset]: [null, [Validators.required]],
    [this.transactionFormProps.Amount]: [
      null,
      [Validators.required, Validators.min(0.0001), Validators.max(constants.INTEGER_MAX_NUMBER), AccuracyValidator(4)],
    ],
  });

  get originatorNaturalPersonIdsFormArray(): FormArray {
    return this.transactionForm.get(this.transactionFormProps.OriginatorNaturalPersonIds) as FormArray;
  }

  get originatorJuridicalPersonIdsFormArray(): FormArray {
    return this.transactionForm.get(this.transactionFormProps.OriginatorJuridicalPersonIds) as FormArray;
  }
  //#region  values for select fields
  assetValues = ['BTC', 'ETH'];
  countries: Country[] = [];
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
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    this.countries = this.countriesService.countries;
    this.templates = this.translateService.templates;
  }

  ngOnInit(): void {
    this.originatorNaturalPersonIdsFormArray.push(this.generateNaturalPersonIdsFormGroup());
    // this.originatorJuridicalPersonIdsFormArray.push(this.generateNaturalPersonIdsFormGroup());

    const testPrefilledModel: CreateOutgoingTransactionRequest = {
      BeneficiaryFullName: 'BeneficiaryFullName',
      BeneficiaryVaan: 'BBB4 eE5C 524e e3fb 0828 0970',
      OriginatorFullName: 'OriginatorFullName',
      OriginatorVaan: '7dfa ce61 524e e3fb 0828 095d',
      OriginatorPostalAddress: {
        Street: 'Street',
        Building: 1,
        AddressLine: 'AddressLine',
        PostCode: 'PostCode',
        Town: 'Town',
        CountryIso2Code: 'CH',
      },
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
      OriginatorJuridicalPersonIds: [],
      OriginatorBic: null,
      Asset: 'ETH',
      Amount: 0.0001,
    };

    this.transactionForm.reset(testPrefilledModel);
  }

  generateNaturalPersonIdsFormGroup(): FormGroup {
    return this.fb.group({
      [this.naturalPersonIdFormProps.IdentificationType]: [null, [Validators.required]],
      [this.naturalPersonIdFormProps.Identifier]: [null, [Validators.required]],
      [this.naturalPersonIdFormProps.CountryIso2Code]: [null, [Validators.required]],
      [this.naturalPersonIdFormProps.NonStateIssuer]: [null, [Validators.required]],
    });
  }

  generatePlaceOfBirth(): FormGroup {
    return this.fb.group({
      [this.placeOfBirthFormProps.Town]: [null, [LengthValidator(2, 100)]],
      [this.placeOfBirthFormProps.CountryIso2Code]: [null, []],
      [this.placeOfBirthFormProps.Date]: [null, []],
    });
  }

  onSubmit() {
    markFormControlAsTouched(this.transactionForm);

    if (!this.transactionForm.valid) {
      console.log(this.transactionForm);
      this.snackBar.open('Please check the form and fill the required fields', this.translateService.translates.CloseSnackbarBtnText, {
        duration: 5000,
      });
      return;
    }

    const model = this.transactionForm.getRawValue() as CreateOutgoingTransactionRequest;

    // workaround for current backend validation
    model.OriginatorPlaceOfBirth = null;

    this.submitSuccess.emit(model);
  }
}
