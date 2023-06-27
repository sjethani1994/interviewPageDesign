import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  public userList: any = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getUserList().subscribe((res) => {
      this.userList = res.data;
    });
  }
}
