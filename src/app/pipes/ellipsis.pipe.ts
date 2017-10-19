import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ellipsis'
})

export class EllipsisPipe implements PipeTransform{
    transform(str: string) {
        const limit = 30;
        if (str.length > limit) {
            return(str.substr(0, limit) + '...');
        }
        return str;
    }
}
