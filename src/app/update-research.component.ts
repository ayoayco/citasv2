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
    deleteType: string;
    deleteEntry: number;
    selectedResearch: any = {};

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
            }
        )
    }

    public editResearchNow(){
        let data: any;
        this.apiService.editResearch(
            this.sessionService.getLoggedInKey(),
            this.selectedResearch.research_title,
            this.selectedResearch.research_venue,
            this.selectedResearch.research_conference,
            this.selectedResearch.authors,
            this.selectedResearch.delegates,
            this.selectedResearch.date_from,
            this.selectedResearch.date_to,
            this.selectedResearch.research_id
        ).subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                if (data.Success) {
                    window.location.reload();
                } else {
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        )

    }

    public editResearch(research: any) {
        this.selectedResearch = research;
        this.selectedResearch.date_from = this.formatDate(research.date_from);
        this.selectedResearch.date_to = this.formatDate(research.date_to);
        $('#editResearchModal').modal('toggle');
    }

    public viewResearch(research) {
        this.selectedResearch = research;
        $('#viewResearchModal').modal('toggle');
    }

    public formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }

        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }


    public addResearch() {
        this.newResearch.authors = this.newResearch.authors.split(',').map(function(item){return item.trim()})
        this.newResearch.delegates = this.newResearch.delegates.split(',').map(function(item){return item.trim()})
        let data;
        this.apiService.addResearch(
            this.sessionService.getLoggedInKey(),
            this.newResearch.research_title,
            this.newResearch.research_venue,
            this.newResearch.research_conference,
            this.newResearch.authors,
            this.newResearch.delegates,
            this.newResearch.date_from,
            this.newResearch.date_to)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                if(data.Success) {
                    window.location.reload();
                    $('#addResearchModal').modal('hide');
                } else {
                    this.err = true;
                    this.msg = 'Error Message: ' + data.error_message;
                }
            }
        );
    }

    public deleteEntryNow() {
        let data: any;
        this.apiService.deleteEntry(this.sessionService.getLoggedInKey(), this.deleteType, this.deleteEntry)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                if (data.Success) {
                    window.location.reload();
                } else {
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        )
    }

    public selectDelResearch(research_id) {
        this.deleteEntry = research_id;
        this.deleteType = 'research';
        $('#surePrompt').modal('toggle');
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
        $('#edit_date_to').datepicker({
            onSelect: (data, inst) => {
                this.selectedResearch.date_to = data;
            },
            dateFormat: 'yy-mm-dd',
        });
        $('#edit_date_from').datepicker({
            onSelect: (data, inst) => {
                this.selectedResearch.date_from = data;
            },
            dateFormat: 'yy-mm-dd',
        });

    }
}
