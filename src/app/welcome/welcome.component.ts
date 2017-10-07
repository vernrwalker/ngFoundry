///import { parse } from 'querystring';
import { Component, OnInit } from '@angular/core';

import { foNode } from "../foundry/foNode.model";
import { foConcept } from "../foundry/foConcept.model";

import { EmitterService } from '../common/emitter.service';

@Component({
  selector: 'foundry-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  model = [];
  def: foConcept = new foConcept();

  constructor() { }

  private info(message, title?) {
    let toast = {
      title: title || '',
      message: message
    }
    EmitterService.get("SHOWINFO").emit(toast);
  }

  doToast(): void {
    this.info("info message","my title")
  }

  ngOnInit(): void {

    let xxx = function () { return "hello" }
    let yyy = xxx.toString();
    let zzz = '{ return "hello" }';

    function evil(fn) {
      return new Function(fn)();
    }

    let props = {
      first: 'steve',
      last: 'strong',
      full: function () {
        return `hello all ${this.first} - ${this.last}`
      },
      xxx: xxx,
      yyy: yyy,
      zzz: evil(zzz),
      morestuff: function (x) {
        return `${this.first} - ${this.last}`
      }
    }

    this.def = new foConcept({
      first: 'mile',
      last: 'davis',
    });


    this.model = [
      this.def,
      this.def.newInstance(),
      // new foNode(props),
      // new foNode(props),
      new foNode(props)];
  }

}
