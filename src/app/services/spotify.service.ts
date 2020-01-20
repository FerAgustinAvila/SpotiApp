import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http:HttpClient) { 
    // console.log('Spotify service listo!');
  }

  getQuery( query:string ){
    
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization' : 'Bearer BQCFPFSPdM1gZiZgp4NgLusHGSsdaiHLqmggcJqHH5quYJwthc2DruIhZtOIaWQtWMs9ubvsSE6cw0mgmzQ'
    });

    return this.http.get(url, { headers });
  };

  getNewReleases(){

    return this.getQuery('browse/new-releases?limit=20').pipe( map( data => data['albums'].items));
  }

  getArtistas( termino: string ){
    /*
    const headers = new HttpHeaders({
      'Authorization' : 'Bearer BQCnRzFESPy4aKAzmtlI9e2MOq4Xhq14DcpcT53kHrYIgulTkoTPFSFGG8-Y-e5I872Jac1RDh7qWYDUoSg'
    });

    return this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers }).pipe( map( data => data['artists'].items));
    */

   return this.getQuery(`search?q=${ termino }&type=artist&limit=15`).pipe( map( data => data['artists'].items));
  }


  getArtista( id: string){

    return this.getQuery(`artists/${ id }`);
  }

  getTopTracks( id: string){

    return this.getQuery(`artists/${ id }/top-tracks?country=us`).pipe( map( data => data['tracks']));
  }
}
