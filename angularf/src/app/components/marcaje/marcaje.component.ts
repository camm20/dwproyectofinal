import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from 'src/app/services/backend.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marcaje',
  templateUrl: './marcaje.component.html',
  styleUrls: ['./marcaje.component.css']
})
export class MarcajeComponent implements OnInit {

  todayDate = new Date();
  public error = null;
  tipoMarca: any = "";
  cantMarcas: any;

  constructor(private Token:TokenService, private Auth:AuthService, private backend:BackendService, private router:Router ) { }

  ngOnInit(): void {
    
    setTimeout(() => {
      this.backend.getMarcajes().subscribe(
        data=>this.handleResponse(data)
      );
    }, 1000);
  }

  camm: any= this.Auth.getUid();
  date: any= this.todayDate.toLocaleString().split(',')[0];
  hour: any= this.todayDate.toLocaleString().split(',')[1];
  faCalendarDays = faCalendarDays;
  faStopwatch = faStopwatch;


  getTipoMarca(){
    this.cantMarcas = this.backend.getMarcajes().subscribe(
      data=>{
        this.cantMarcas = data;
        console.log('getTipoMarca()');
        console.log(data);
        console.log(this.cantMarcas);

      }//this.handleResponse(data)

    );
  }

  handleResponse(data:any){
    if(data[0].marcajes >= 1){
      this.tipoMarca = "Salida.";
    }else{
      this.tipoMarca = "Entrada."
    }
  }

  handleError(error:any){
    this.error = error.error.error;
  }

  

  marcar(event:MouseEvent){
    event.preventDefault();
    this.backend.setMarcaje().subscribe(
      data=>this.handleMarcaResponse(data),
      error=>this.handleMarcaError(error)
    );
  }

  handleMarcaResponse(data:any){
      this.logout();
  }

  handleMarcaError(error:any){
    this.error = error.error.error;
  }

  logout(){
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.Auth.removeUid();
    this.router.navigateByUrl('/');
  }

  

}
