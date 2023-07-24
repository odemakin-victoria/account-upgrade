export interface ICustomer {
    customerId?:       string;
    maritalStatus:    string;
    motherMaidenName: string;
    nextOfKinName:    string;
    nextOfKinPhone:   string;
    dateCreated?:      Date;
    dateLastModified?: Date;
}


export interface IContactAddress {
    postalCode:       string;
    localGovt:        string;
    state:            string;
    line1:            string;
    line2:            string;
    city:             string;
    dateCreated:      Date;
    dateLastModified: Date;
    country: string;
    requestId:        string;
}

