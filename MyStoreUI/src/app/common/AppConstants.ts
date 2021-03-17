
enum menuNavigation {
    ProviderDashboard=1,
    StoreMaster=2,
    StoreSubunits=3,
    StoreProducts=4,
    StoreOrders=5,
    StoreDelivery=6,
    StoreCustomers=7,
    ServiceDashboard=8,
    BusinessMaster=9,
    LocationsSubunits=10,
    Services=11
}
export class AppConstants {

    public static get displayDateFormat(): string {
        return 'dd/MM/yyyy';
    }

    public static get primeNgDateDisplayFormat(): string {
        return 'dd/mm/yy';
    }

    public static get datePlaceHolderFormat(): string {
        return 'DD/MM/YYYY';
    }

    public static get sendingDateFormat(): string {
        return 'yyyy-MM-dd';
    }

    public static get gridPageSize(): number {
        return 10;
    }    

    public static get displayDateFormatWithHHMM(): string {
        return 'dd/MM/yyyy hh:mm:ss';
    }

    public static get dateFormatWithMMSEC(): string {
        return 'hh:mm:ss';
    }   
    public static get menuNavigation() {
        return menuNavigation;
    } 
}
