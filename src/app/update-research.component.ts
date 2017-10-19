import { Component, AfterViewInit } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'update-research',
    templateUrl: './update-research.component.html',
    styleUrls: ['./update-research.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class UpdateResearchComponent implements AfterViewInit {
    researches: any[];
    newResearch: any = {};
    err: boolean;
    msg: string;

    constructor(
        private sessionService: AppSessionService,
        private apiService: CitasApiService,
        private router: Router,
        private titleService: Title
    ) {
        this.err = false;
        const loggedIn: boolean = this.sessionService.isLoggedIn();
        if (!loggedIn) {
            this.router.navigate(['/']);
        } else {
            this.titleService.setTitle('Update Research List');
        }

        let data;

        this.apiService.getResearch()
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.researches = data.data;
                console.log(this.researches);
            }
        )
    }

    public addResearch() {
        this.newResearch.authors = this.newResearch.authors.split(',').map(function(item){return item.trim()})
        this.newResearch.participants = this.newResearch.participants.split(',').map(function(item){return item.trim()})
        console.log(this.newResearch);
        let data;
        this.apiService.addResearch(
            this.sessionService.getLoggedInKey(),
            this.newResearch.research_title,
            this.newResearch.research_venue,
            this.newResearch.research_conference,
            this.newResearch.authors,
            this.newResearch.participants,
            this.newResearch.date_from,
            this.newResearch.date_to)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                console.log(data);
                if(data.Success) {
                    this.router.navigate(['/update-research']);
                } else {
                    this.err = true;
                    this.msg = 'Error Message: ' + data.error_message;
                }
            }
        );
    }

    ngAfterViewInit() {
        $('#date_to').datepicker({
            onSelect: (data, inst) => {
                this.newResearch.date_to = data;
            },
            dateFormat: 'yy-mm-dd',
        });
        $('#date_from').datepicker({
            onSelect: (data, inst) => {
                this.newResearch.date_from = data;
            },
            dateFormat: 'yy-mm-dd',
        });

    }
}
