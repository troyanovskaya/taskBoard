import { Component, EventEmitter, inject } from '@angular/core';
import { CreateTeamComponent } from '../reusable/create-team/create-team.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService: AuthService = inject(AuthService);
  dataService: DataService = inject(DataService);
  taskService: TaskService = inject(TaskService);
  logout(){
    this.authService.logout();
  }
  returnToOwnBoard(){
    if(this.authService.user){
      this.dataService.selectedUser = undefined;
      this.dataService.changeRole('user');
      this.taskService.getUserTasks(this.authService.user.localId);

    }

  }
}
