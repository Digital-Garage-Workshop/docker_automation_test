
export const formatCurrency = (price: number, discount?: number): string => {
    const finalPrice = discount ? (price * (100 - discount)) / 100 : price;
    const formattedPrice = new Intl.NumberFormat('mn-MN', {
        style: 'decimal', 
        minimumFractionDigits: 0, 
    }).format(finalPrice).replace(/,/g, ",");

    return `${formattedPrice} ₮`; 
};
