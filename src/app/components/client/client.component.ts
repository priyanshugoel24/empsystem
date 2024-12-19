import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';

@Component({
  selector: 'app-client',
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  clientObj : Client = new Client();
  clientList : Client [] = [];

  clientService = inject(ClientService);

  onSaveClient(){
    debugger;
    this.clientService.addUpdate(this.clientObj).subscribe((res : APIResponseModel) =>{
     if(res.result){
      alert("client created successfully");
      this.loadClient();
      this.clientObj = new Client();
     }else{
      alert(res.message);
     }
    }
  )
  }

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(){
    this.clientService.getAllClients().subscribe((res : APIResponseModel) =>{
      this.clientList = res.data;

    })

  }

  onDelete(id : number){
    const isDelete = confirm("Are you sure you want to delete this client?");
    if(!isDelete){
      return;
    }
    this.clientService.deleteClient(id).subscribe((res : APIResponseModel) =>{
      if(res.result){
        alert("client deleted successfully");
        this.loadClient();
      }else{
        alert(res.message);
      }
    })
  }

  onEdit(client : Client){
    this.clientObj = client;
    
  }


}
