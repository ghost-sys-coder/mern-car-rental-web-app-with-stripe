import { create } from "zustand";

export type ItemType = {
    creator?: string; 
    title?: string;
    description?: string;
    brand?: string;
    engine?: string;
    transmissionType?: string;
    mileage?: number;
    purchasePrice?: number;
    rentalPrice?: {
        daily: number;
        hourly: number;
    };
    images?: string[];
};

export interface ItemState {
    data: ItemType;
    updateState: (data: ItemType) => void;
    restart: () => void;
}

export const useRentalListingStore = create<ItemState>()((set) => ({
    data: {
        title: "",
        brand: "",
        description: "",
        engine: "",
        transmissionType: "",
        mileage: 0,
        purchasePrice: 0,
        rentalPrice: {
            daily: 10,
            hourly: 10,
        },
        images: [],
    },
    updateState: (data) =>
        set((state) => ({
            data: { ...state.data, ...data },
        })),

    restart: () =>
        set({
            data: {
                title: "",
                brand: "",
                description: "",
                engine: "",
                transmissionType: "",
                mileage: 0,
                purchasePrice: 0,
                rentalPrice: {
                    daily: 0,
                    hourly: 0,
                },
                images: [],
            },
        }),
}));
