import { Component, AfterViewInit } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { CitasApiService } from './citas.api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'update-team',
    templateUrl: './update-team.component.html',
    styleUrls: ['./update-team.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class UpdateTeamComponent implements AfterViewInit{
    teams: any[];
    new: any = {};
    newDept: string;
    deleteEntry: number;
    deleteType: string;
    err: boolean;
    msg: string;

    constructor(
        private apiService: CitasApiService, 
        private router: Router,
        private titleService: Title,
        private sessionService: AppSessionService
    ) {
        this.err = false;
        const loggedIn: boolean = this.sessionService.isLoggedIn();
        if (!loggedIn) {
            this.router.navigate(['/']);
        } else {
            this.titleService.setTitle('Update Team');
        }

        let data;

        this.apiService.getTeamList()
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.teams = data.data;
                console.log(this.teams);
            }
        )
    }

    public deleteEntryNow() {
        console.log('Delete: ' + this.deleteType + ' ' + this.deleteEntry);
        let data: any;
        this.apiService.deleteEntry(
            this.sessionService.getLoggedInKey(),
            this.deleteType, this.deleteEntry)
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    console.log(data);
                    if (data.Success) {
                        window.location.reload()
                    } else {
                        this.err = true;
                        this.msg = 'Error: ' + data.error_message;
                    }
                }
            );
    }

    public selectDelMember(member_id: number) {
        this.deleteEntry = member_id;
        this.deleteType = 'team';
        $('#surePrompt').modal('toggle');
    }

    public selectDelDept(dept_id: number) {
        this.deleteEntry = dept_id;
        this.deleteType = 'department';
        $('#surePrompt').modal('toggle');
    }

    public selectDept(dept_id: number){
            this.new.dept_id = dept_id.toString();
            $('#addTeamModal').modal('toggle');
    }

    public addTeamMember() {
        console.log(this.new);
        let data: any;
        this.apiService.addTeamMember(
            this.sessionService.getLoggedInKey(),
            this.new.fullname,
            this.new.position,
            this.new.add_text,
            this.new.dept_id)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body)
                console.log(data);
                if (data.Success) {
                    window.location.reload();
                    $('#addTeamModal').modal('hide');
                } else {
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        )
   }

    public addDepartment(){
        console.log(this.newDept);
        let data: any;
        this.apiService.addDepartment(this.sessionService.getLoggedInKey(), this.newDept)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                console.log(data);
                if(data.Success){
                    window.location.reload();
                    $('#addDeptModal').modal('hide');
                } else {
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        )
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

        $('[data-toggle="tooltip"]').tooltip();
    }

}