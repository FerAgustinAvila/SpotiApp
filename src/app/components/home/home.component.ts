import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  /*paises: any[] = [];*/

  nuevasCanciones: any[] = [];
  loading: boolean;

  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService /*private http: HttpClient*/ ) {

    this.loading = true;
    this.error = false;
    
    this.spotify.getNewReleases()
                .subscribe( (data: any) => {
                  this.nuevasCanciones = data;
                  this.loading = false;
                }, (errorServicio)=> {

                  this.error = true;

                  console.log(errorServicio);
                  this.mensajeError = errorServicio.error.error.message;
                });
    
    /*this.http.get('https://restcountries.eu/rest/v2/lang/es')
        .subscribe( (resp: any) => {
          this.paises = resp;
          console.log( resp );
        });*/
  };


}
