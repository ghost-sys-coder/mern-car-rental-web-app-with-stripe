import { Dispatch, SetStateAction } from "react";

export interface IResponse {
  clientId?: string;
  credential?: string;
  select_by?: string;
}

export interface IAuth {
  success: boolean;
  loading: boolean;
  handleUserRegister: (
    details: UserSignUpDetails
  ) => Promise<string | undefined>;
  handleUserLogin: (details: UserLoginDetails) => Promise<string | undefined>;
  isUserLoading: boolean;
  isUserAuthenticated: boolean;
  dropdown: boolean;
  userProfile: IUserProfile;
  isOpenSideBar: boolean;
  setIsOpenSideBar: Dispatch<SetStateAction<boolean>>;
  setDropdown: Dispatch<SetStateAction<boolean>>;
  handleFetchUserProfile: () => void;
  handleUserLogout: () => void;
  handleForgotPassword: (email: string) => void;
  handlePasswordReset: (token: string, password: string) => void;
  handleEmailTokenVerification: (token: string) => void;
  handleSidebar: () => void;
  handleOpenDropdown: () => void;
}

export interface IUserProfile {
  _id: string;
  username: string;
  email: string;
  admin: boolean;
}

export interface UserSignUpDetails {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface UserLoginDetails {
  email: string;
  password: string;
}

export interface IStepperMethods {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export interface IRentalContext {
  loading: boolean;
  rentals: object[];
  fetchRentals: () => void;
  brandRentalsLoading: boolean;
  brandRentals: IFetchRentals[];
}

export interface IFetchRentals {
  _id: string;
  creator?: string | null;
  title: string;
  description: string;
  rentalPrice: {
    daily?: number;
    hourly?: number;
  };
  brand: string;
  purchasePrice: number;
  mileage: number;
  engine: string;
  transmissionType: string;
  images: string[];
  booked: boolean;
  rentalId?: string | null;
  rentalDate?: {
    initialDate: Date;
    endDate: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlogProps {
  creator: string;
  title: string;
  description: string;
  image: string;
  tags: string;
}


export interface IBlogData {
  _id: string;
  creator: {
    _id: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    image?: string | undefined;
  };
  image: string;
  title: string;
  description: string | undefined;
  tags: string[];
  comments?: IComment[],
  createdAt: string | undefined ;
}

export interface IComment {
  creator?: string;
  description?: string;
  name?: string;
  email?: string;
}
