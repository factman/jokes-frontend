import {Component, OnInit} from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ModalComponent} from '../../components/modal/modal.component';

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
  joke = {title: '', category: '', body: ''};

  constructor(
    private apiData: ApiDataService,
    private router: ActivatedRoute,
    private navigator: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  openDialog(title: string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '800px',
      data: {
        title,
        joke: this.joke,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        console.log(result);
      }
    });
  }

  searchJokes($event: KeyboardEvent | any) {
    if ($event.key === 'Enter') {
      this.navigator.navigateByUrl(`/search/${$event.target.value}`);
    }
  }

  like(joke) {
    this.apiData.post(`/jokes/${joke._id}/like`)
      .then((res) => {
        if (res.success) {
          joke.likes += 1;
          this.snackBar.open(res.message, 'Like', { duration: 5000 });
        } else {
          this.snackBar.open(res.error.message, 'Like', { duration: 5000 });
        }
      })
      .catch(err => {
        this.snackBar.open(err, 'Like', { duration: 5000 });
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
                this.snackBar.open(res.error.message, 'Jokes', { duration: 5000 });
              }
              this.loading = false;
              this.title = 'Jokes';
            })
            .catch((err) => {
              this.snackBar.open(err, 'Jokes', { duration: 5000 });
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
                this.snackBar.open(res.error.message, 'Jokes', { duration: 5000 });
              }
              this.loading = false;
              this.title = `${url[1].path} Category`;
            })
            .catch((err) => {
              this.snackBar.open(err, 'Jokes', { duration: 5000 });
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
                this.snackBar.open(res.error.message, 'Search', { duration: 5000 });
              }
              this.title = 'Search Result';
              this.search = url[1].path;
            })
            .catch((err) => {
              this.snackBar.open(err, 'Jokes', { duration: 5000 });
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
          this.snackBar.open(res.error.message, 'Category', { duration: 5000 });
        }
      })
      .catch((err) => {
        this.snackBar.open(err, 'Category', { duration: 5000 });
        this.categories = [];
      });
  }

}
