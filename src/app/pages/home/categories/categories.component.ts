import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  @Input() title:string = ""

  @Input() data:any[] = []

  @Output() selectedValue = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  detectChanges(event:any) {
    this.selectedValue.emit(event)
  }
}
