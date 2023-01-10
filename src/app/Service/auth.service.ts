import { Injectable } from '@angular/core';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

authUser(user:Login)
{
  let UserArray = [];

  if(localStorage.getItem('Users'))
  {
    UserArray = JSON.parse(localStorage.getItem('Users')!);
  }

  return UserArray.find((p: { userName: string; }) => p.userName === user.userName);
}
}
