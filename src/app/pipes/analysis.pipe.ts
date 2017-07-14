import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'analysis' })

export class AnalysisPipe implements PipeTransform {
    transform(str: string): string {
        var res = "";

        switch(str){
            case "not_infected": res = "Healthy"; break;
            case "infected": res = "Infected"; break;
            case "unknown": res = "Unknown"; break;
            case "all": res = "All"; break;
        }

        return res;
    }
}