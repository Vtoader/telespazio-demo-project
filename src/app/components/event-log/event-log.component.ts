import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { EventLogService } from 'src/app/services/event-log.service';

@Component({
  selector: 'app-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.css']
})
export class EventLogComponent implements OnInit {


  eventLogs: any = [];
  timeLineEvents: any = [];
  displayedColumns: string[] = ['timestamp', 'level', 'message'];
  constructor(private elem: ElementRef,
    private eventLogService: EventLogService) { }

  ngOnInit() {
    this.eventLogService.getEventLogs().subscribe(res => {
      res.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      this.eventLogs = res;
      this.normalizeTimeline(this.eventLogs);
    })
  }

  handleMouseOver(index) {
    const elements = this.elem.nativeElement.querySelectorAll('.event');
    elements[index].classList.add("focused-event");
  }

  handleMouseLeave(index) {
    const elements = this.elem.nativeElement.querySelectorAll('.event');
    elements[index].classList.remove("focused-event");
  }

  eventFocused(index) {
    const elements = this.elem.nativeElement.querySelectorAll('.cdk-row');
    elements[index].style.backgroundColor = "rgb(4 255 82 / 17%)";
  }

  eventUnfocused(index) {
    const elements = this.elem.nativeElement.querySelectorAll('.cdk-row');
    elements[index].style.backgroundColor = "white";

  }

  normalizeTimeline(events) {
    this.timeLineEvents = events.map(elem => {
      return { ...elem, timestamp: new Date(elem.timestamp).getTime() };
    })
    const minEvent = this.timeLineEvents[0].timestamp;
    const maxEvent = this.timeLineEvents[this.timeLineEvents.length - 1].timestamp;
    this.timeLineEvents = this.timeLineEvents.map((event, i) => {
      return { ...event, timestamp: (((event.timestamp - minEvent) / (maxEvent - minEvent)) * 100).toFixed(2), index: i }
    });
  }

}
