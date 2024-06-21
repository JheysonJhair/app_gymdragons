export interface PaymentMembreship {
  idClient: number;
  idMembership: number;
  IdUser: number;
  StartDate: string;
  EndDate: string;
  Total: number;
  Discount: number;
  PriceDiscount: number;
  QuantityDays: number;
  DatePayment: string;
  Due: number;
  PrePaid: number;
  PaymentType: string;
  PaymentReceipt: string;
  Observation: string;
}
