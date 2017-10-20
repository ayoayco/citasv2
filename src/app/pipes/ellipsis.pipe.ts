import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ellipsis'
})

export class EllipsisPipe implements PipeTransform{
    transform(str: string, limit: number) {
        if (limit === undefined) {
            limit = 32;
        }
        if (str.length > limit) {
            return(str.substr(0, limit - 1) + '...');
        }
        return str;
    }
}
