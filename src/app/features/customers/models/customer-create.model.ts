export interface CreateCustomerRequest {

  NameAR: string;
  NameEN: string;
  Name: string;
  CommercialName: string;

  Code: string;

  MobileWithPrefix: string;
  PhoneWithPrefix: string;

  Mobile: string;
  Phone: string;
  Fax: string;

  Email: string;
  Website: string;

  Country: string;
  CountryName: string;
  CountryId: number;

  City: string;
  CityName: string;
  CityId: number;

  RequestSource: string;
  Address: string;

  Employment: string;

  Type: number;
  PaymentProfile: number;

  RegionId: number;
  RegionName: string;

  ClientType: string;

  ClassificationId: number;
  ClassificationNam: string;

  AccountManagerId: number | null;
  AccountManagerName: string;

  ProPresentClientName: string;

  PaymentProfileName: string;
  PaymentProfileId: number;

  BusinessFieldName: string;
  BusinessFieldId: number;

  Latitude: number;
  Longitude: number;

  AccountTypeName: string;
  AccountTypeId: number;

  CountLeadRequests: number;

  JobTitle: string;
  Message: string;

  ProjectId: number;
  UnitId: number;

  Religion: string;

  InvitedEmployeesIds: string;
}

export interface CreateCustomerResponse {
  Result: boolean;
  ErrorMessage: string;
}