export interface apiMiddlewareInterface {
    url: string;
    method: string;
    data?: any;
    filterParams?: any;
    navigation?: any;
    contentType?: string;
    setShowError?: any;
  }

  export interface UserInterface {
    __v: number;
    _id: string;
    address: string;
    createdAt: string;
    email: string;
    mobile: string;
    password: string;
    profilePic: string;
    role: string;
    token: string;
    updatedAt: string;
    username: string;
  }