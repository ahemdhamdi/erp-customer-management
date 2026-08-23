export interface Customer {
  Id: number;
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
  City: string;
  CityName: string;
  Address: string;
  RegionName: string;

  RequestSource: string;
  Employment: string;

  Type: number;
  PaymentProfile: number;

  CountryId: number;
  CityId: number;
  RegionId: number;

  ClientType: string;

  ClassificationId: number;
  ClassificationNam: string;

  AccountManagerId: number;
  AccountManagerName: string;

  CreatedDate: string;
  CreatedEmpId: number;

  UpdatedDate: string;
  UpdatedEmpId: number;

  DeletedDate: string | null;
  DeletedEmpId: number | null;

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
}

export interface CustomerApiResponse {
  Data: Customer[];
  Total: number;
}