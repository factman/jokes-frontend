import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {

  jokes: [object];
  error: { status: boolean, message: string };
  loading: boolean;

  constructor(private apiData: ApiDataService) { }

  ngOnInit() {
    this.apiData.get('/jokes')
      .then((res) => {
        if (res.success) {
          this.jokes = res.data;
        } else {
          this.error = { status: true, message: res.error.message};
        }
      })
      .catch((err) => {
        this.error = { status: true, message: err};
      });
  }

}
