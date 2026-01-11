import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footercomponent.html',
    styleUrls: ['./footercomponent.scss']
})
export class FooterComponent {
    currentYear = new Date().getFullYear();
}