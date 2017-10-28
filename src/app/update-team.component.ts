import { document } from 'ngx-bootstrap/utils/facade/browser';
import { Component, AfterViewInit } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { CitasApiService } from './citas.api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UploadService } from './app.upload.service';

@Component({
    selector: 'update-team',
    templateUrl: './update-team.component.html',
    styleUrls: ['./update-team.component.css'],
    providers: [
        CitasApiService,
        AppSessionService,
        UploadService
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
    selectedMember: any = {};
    file: any;

    constructor(
        private uploadService: UploadService,
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

    public uploadPhotoNow() {
        const el = document.getElementById('fileField');
        const file = el.files[0]; // event.srcElement.files;
        console.log(file);
        let data: any;
        this.apiService.uploadImage(this.sessionService.getLoggedInKey(), this.selectedMember.member_id, 'team', file)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                console.log(data);
                if(data.Success){
                    window.location.reload();
                } else {
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        )
    }

    public viewMember(member: any) {
        this.selectedMember = member;
        console.log(this.selectedMember);
        $('#viewMemberModal').modal('toggle');
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

    public editTeamMemberNow(){
        let data: any;

        this.apiService.editTeamMember(
            this.sessionService.getLoggedInKey(),
            this.selectedMember.name,
            this.selectedMember.job_position,
            this.selectedMember.add_text,
            this.selectedMember.member_id
        ).subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                console.log(data);
                if(data.Success){
                    window.location.reload();
                    $('#editTeamModal').modal('hide');
                } else {
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        )
    }

    public uploadPhoto(member: any) {
        this.selectedMember = member;
        console.log('Upload photo for: ' + this.selectedMember.name);
        $('#uploadPhotoModal').modal('toggle');
    }

    public editTeamMember(member: any){
        this.selectedMember = member;
        console.log('Edit: ' + this.selectedMember.name);
        $('#editTeamModal').modal('toggle');
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
            this.new.name,
            this.new.job_position,
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
                if (data.Success) {
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