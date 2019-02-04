import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {

  jokes = [];
  categories = [];
  title = 'Jokes';
  search;
  loading = false;
  value = '';

  constructor(private apiData: ApiDataService, private router: ActivatedRoute, private navigator: Router) { }

  searchJokes($event: KeyboardEvent | any) {
    if ($event.key === 'Enter') {
      this.navigator.navigateByUrl(`/search/${$event.target.value}`);
    }
  }

  like(id) {
    this.apiData.post(`/jokes/${id}/like`)
      .then((res) => {
        if (res.success) {
          this.navigator.onSameUrlNavigation = 'reload';
          this.navigator.navigateByUrl(window.location.pathname);
        }
        this.loading = false;
        this.title = 'Jokes';
      });
  }

  ngOnInit() {
    this.router.url.subscribe( url => {
      switch (url[0].path) {
        case 'jokes':
          this.loading = true;
          this.apiData.get('/jokes')
            .then((res) => {
              if (res.success) {
                this.jokes = res.data;
              } else {
                this.jokes = [];
              }
              this.loading = false;
              this.title = 'Jokes';
            })
            .catch((err) => {
              this.jokes = [];
              this.loading = false;
            });
          break;

        case 'categories':
          this.loading = true;
          this.apiData.get(`/jokes/filter/${url[1].path}`)
            .then((res) => {
              if (res.success) {
                this.jokes = res.data;
              } else {
                this.jokes = [];
              }
              this.loading = false;
              this.title = `${url[1].path} Category`;
            })
            .catch((err) => {
              this.jokes = [];
              this.loading = false;
            });
          break;

        case 'search':
          this.apiData.get(`/jokes/search/${url[1].path}`)
            .then((res) => {
              if (res.success) {
                this.jokes = res.data;
              } else {
                this.jokes = [];
              }
              this.title = 'Search Result';
              this.search = url[1].path;
            })
            .catch((err) => {
              this.jokes = [];
              this.loading = false;
            });
          break;
      }
    });

    this.apiData.get('/jokes/categories')
      .then((res) => {
        if (res.success) {
          this.categories = res.data;
        } else {
          this.categories = [];
        }
      })
      .catch((err) => {
        this.categories = [];
      });
  }

}
