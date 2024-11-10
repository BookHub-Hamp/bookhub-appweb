import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserProfile } from '../../shared/models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseURL = `${environment.apiUrl}/user/profile`;

  private http = inject(HttpClient);

  getUserProfile(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseURL}/${userId}`);
  }

  updateUserProfile(
    userId: number,
    profileData: UserProfile
  ): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.baseURL}/${userId}`, profileData);
  }
}
