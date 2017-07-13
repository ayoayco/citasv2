import { Component, AfterViewInit } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { TruncatePipe } from './pipes/truncate';

@Component({
    selector: 'app-about-research',
    templateUrl: './about-research.component.html',
    styleUrls: ['./about-research.component.css'],
    providers: [
        CitasApiService
    ]
})

export class AppAboutResearchComponent implements AfterViewInit {
    research: any[];
    constructor(private apiService: CitasApiService){
        let data: any;
        this.apiService.getResearch()
        .then(
            res => {
                data = res;
                this.research = data.data;
                this.research.sort(function(a,b){
                    return (new Date(b.date_from).getTime() - new Date(a.date_from).getTime());
                })
                console.log(this.research);
            }
        );
    }

    ngAfterViewInit(){
        var hideList = ($('#searchResearch').val() == "" || $('#searchResearch').val() == undefined);
        if(hideList){
            $('#xButton').hide();
        }else{
            $('#xButton').show();
        }
    }

    public clearSearchResearch(){
        $('#searchResearch').val("");
    }

    public search(str: string){

        var hideList = ($('#searchResearch').val() == "" || $('#searchResearch').val() == undefined);
        if(hideList){
            $('#xButton').hide();
        }else{
            $('#xButton').show();
        }
        // Declare variables
        var input, filter, ul, li, a, i;
        input = $('#searchResearch');
        filter = input.val().toUpperCase();
        ul = $('#searchList');
        li = ul.find('li');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("h4")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }

    }
}