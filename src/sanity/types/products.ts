

export interface Product {
    _id : string;
    title: string;
    _type: "product";
    image?: {
        asset : {
            _ref : string;
            _type : "productImage";
        }
    };
    price : number;
    description?: string;
    slug : {
        _type : "slug";
        current : string
    };
}