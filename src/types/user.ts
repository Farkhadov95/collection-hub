export type newUserForm = {
    username: string,
    email: string,
    password: string,
    conf_password: string,
  }
  
  export type newUser = {
    username: string,
    email: string,
    password: string,
  }
  
  export type user = {
    email: string,
    password: string,
  }
  
  export type userInfo = {
    _id: string,
    username: string,
    email: string,
    createdAt: Date,
    isAdmin: boolean,
  }
  
  export type currentUser = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
  }