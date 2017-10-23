import { Component, AfterViewInit } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'update-training',
    templateUrl: './update-training.component.html',
    styleUrls: ['./update-training.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class UpdateTrainingComponent implements AfterViewInit {
    trainings: any[];
    new: any = {};
    err: boolean;
    msg: string;
    deleteType: string;
    deleteEntry: number;
    selectedTraining: any = {};

    constructor(
        private sessionService: AppSessionService,
        private apiService: CitasApiService,
        private router: Router,
        private titleService: Title
    ) {
        this.err = false
        const loggedIn: boolean = this.sessionService.isLoggedIn();
        if (!loggedIn) {
            this.router.navigate(['/']);
        } else {
            this.titleService.setTitle('Update Training List');
        }

        let data;

        this.apiService.getTrainings()
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.trainings = data.data;
                console.log(this.trainings);
            }
        )

    }

    public editTrainingNow() {
        let data: any;
        this.apiService.editTraining(
            this.sessionService.getLoggedInKey(),
            this.selectedTraining.training_name,
            this.selectedTraining.training_venue,
            this.selectedTraining.participants,
            this.selectedTraining.date_from,
            this.selectedTraining.date_to,
            this.selectedTraining.training_id
        ).subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                console.log(data);
                if (data.Success) {
                    window.location.reload();
                } else {
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        )
    }

    public editTraining(training) {
        this.selectedTraining = training;
        this.selectedTraining.date_from = this.formatDate(training.date_from);
        this.selectedTraining.date_to = this.formatDate(training.date_to);
        console.log(this.selectedTraining);

        $('#editTrainingModal').modal('toggle');
    }

    public viewTraining(training) {
        this.selectedTraining = training;
        console.log(this.selectedTraining);
        $('#viewTrainingModal').modal('toggle');
    }

    public addTraining() {
        this.new.participants = this.new.participants.split(',').map(function(item){return item.trim()});
        console.log(this.new);
        let data: any;
        this.apiService.addTraining(
            this.sessionService.getLoggedInKey(),
            this.new.training_name,
            this.new.training_venue,
            this.new.participants,
            this.new.date_from,
            this.new.date_to)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                console.log(data);
                if (data.Success) {
                    window.location.reload();
                    $('#addTrainingModal').modal('hide');
                } else {
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        )

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

    public deleteEntryNow() {
        console.log('Delete: ' + this.deleteType + ' ' + this.deleteEntry);
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

    public selectDelTraining(id) {
        this.deleteEntry = id;
        this.deleteType = 'training';
        $('#surePrompt').modal('toggle');
    }

    ngAfterViewInit() {
        $('#date_to').datepicker({
            onSelect: (data, inst) => {
                this.new.date_to = data;
            },
            dateFormat: 'yy-mm-dd',
        });
        $('#date_from').datepicker({
            onSelect: (data, inst) => {
                this.new.date_from = data;
            },
            dateFormat: 'yy-mm-dd',
        });
        $('#edit_date_to').datepicker({
            onSelect: (data, inst) => {
                this.selectedTraining.date_to = data;
            },
            dateFormat: 'yy-mm-dd',
        });
        $('#edit_date_from').datepicker({
            onSelect: (data, inst) => {
                this.selectedTraining.date_from = data;
            },
            dateFormat: 'yy-mm-dd',
        });
    }
}
