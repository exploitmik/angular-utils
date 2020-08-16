import { Injectable, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchAsyncService {
  constructor() {}

  listener(
    element: ElementRef<HTMLElement>,
    eventType: string,
    callback: (value: any) => Observable<any> | Promise<any>
  ) {
    return fromEvent(element.nativeElement, eventType).pipe(
      debounceTime(600),
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      switchMap((value: any) => callback(value))
    );
  }
}
