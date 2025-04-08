import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user_services/user.service';
import { Usuario } from '../../models/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  allUsers: Usuario[] = [];
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  } 

  getUsers(): void {
    this.loading = true;
    this.userService.getUsers()
      .then((users) => {
        this.allUsers = users;
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
        this.loading = false;
      });
  }
}