import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ellipsis'
})

export class EllipsisPipe implements PipeTransform{
    transform(str: string) {
        return(str.substr(0, 35) + '...');
    }
}
