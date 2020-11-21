import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  statement = true;

  toggle(): void {
    this.statement = !this.statement;
  }
}
