import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTickets'
})
export class FilterTicketsPipe implements PipeTransform {

  transform(items: any[], filters: { status?: string, colour?: string, zeroFilter?: boolean, hiddenFilter?: boolean}): any[] {
    if (!items) {
      return [];
    }
    console.log(filters.colour)
    return items.filter(item => {
      const matchesStatus = filters.status!==undefined ? item.status === filters.status : true;
      const matchesColour = filters.colour!==undefined ? item.colour === filters.colour: true;
      const matchesNumber = filters.zeroFilter!==undefined ? filters.zeroFilter ? (item.number !== 0) : true : true;
      const matchesHidden = filters.hiddenFilter!==undefined ? !item.hide===filters.hiddenFilter : true;

      return matchesStatus && matchesColour && matchesNumber && matchesHidden;
    }).sort((a, b) => a.order - b.order);;
  }

}
