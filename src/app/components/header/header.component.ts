import { Component, OnInit } from '@angular/core';
import {ApiDataService} from '../../services/api-data.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private apiData: ApiDataService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  uploadFile(type, result) {
    const body = (type === 'JSON') ? JSON.parse(result) : [result];
    this.apiData.post(`/jokes/import/${type.toUpperCase()}`, body)
      .then((res) => {
        if (res.success) {
          this.snackBar.open(res.message, 'Upload', { duration: 5000 });
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigateByUrl('/jokes');
        } else {
          this.snackBar.open(res.error.message, 'Upload', { duration: 5000 });
        }
      })
      .catch(err => {
        this.snackBar.open(err, 'Upload', { duration: 5000 });
      });
  }

  download(type: 'JSON' | 'CSV') {
    this.apiData.get(`/jokes/export/${type.toUpperCase()}`)
      .then((res) => {
        const mime = type === 'JSON' ? { type: 'application/json' } : { type: 'text/csv' };
        const data = type === 'JSON' ? JSON.stringify(res.data) : res.data.toString();
        const fileName = `Jokes_Export_${new Date().getTime().toString()}.${type.toLowerCase()}`;
        if (res.success) {
          this.snackBar.open(res.message, 'Download', { duration: 5000 });
          this.downloadFile(data, mime, fileName);
        } else {
          this.snackBar.open(res.error.message, 'Download', { duration: 5000 });
        }
      })
      .catch(err => {
        this.snackBar.open(err, 'Download', { duration: 5000 });
      });
  }

  upload(type: 'JSON' | 'CSV') {
    const file = document.createElement('input');
    file.type = 'file';
    file.accept = type === 'JSON' ? 'application/json' : '*/csv';
    file.style.display = 'hidden';
    file.multiple = false;
    file.onchange = ($event: any) => {
      const fileData = $event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        this.uploadFile(type, reader.result);
        document.body.removeChild(file);
      };
      reader.readAsText(fileData);
    };
    document.body.appendChild(file);
    file.click();
  }

  downloadFile(data: string, type: { type: string }, fileName: string) {
    const blob = new Blob([data], type);
    const url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }

}
