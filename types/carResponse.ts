export type CarBrand = {
    manuid: number;
    name: string;
}

export type CarModel = {
    groupid: number;
    groupname: string;
    manuid: number;
    childrens: CarChildrenModel[];
}
export type CarChildrenModel = {
    modelid: number;
    modelname: string;
    yearstart: string;
    yearend: string;
    groupid: number;
}
export type CarEngine = {
    carid: number;
    carname: string;
    manuid: number;
    modelname: string;
    modelid: number;
    cylinder: number;
    motortype: string;
}
