import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTickets'
})
export class FilterTicketsPipe implements PipeTransform {

  transform(items: any[], filters: { status?: string, colour?: string, zeroFilter?: boolean, hiddenFilter?: boolean}): any[] {
    if (!items) {
      return [];
    }

    return items.filter(item => {
      const matchesStatus = item.status === filters.status;
      const matchesColour = item.colour === filters.colour;
      const matchesNumber = filters.zeroFilter ? item.number !== 0 : true;
      const matchesHidden = filters.hiddenFilter ? !item.hide : item.hide;

      return matchesStatus && matchesColour && matchesNumber && matchesHidden;
    }).sort((a, b) => a.order - b.order);;
  }

}
