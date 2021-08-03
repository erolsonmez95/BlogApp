import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(content: string, charecterLimit: number): string{
      if(content.length <= charecterLimit){
        return content;
      }else{
        return `${content.substring(0,charecterLimit)}...`;
      }
    
  }

}
