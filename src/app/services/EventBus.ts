import Vue from "vue";

export interface EventType<E> {
  name: string;
}

export interface EventCallback<E> {
  (event: E): void;
}

export interface EventBus {
  dispatch<E>(type: EventType<E>, event: E): void;
  addListener<E>(type: EventType<E> | EventType<E>[], cb: EventCallback<E>): void;
  removeListener<E>(type: EventType<E> | EventType<E>[], cb: EventCallback<E>): void;
}

export class DefaultEventBus implements EventBus {
  private vue: Vue = new Vue();

  dispatch<E>(type: EventType<E>, event: E): void {
    this.vue.$emit(type.name, event);
  }

  addListener<E>(type: EventType<E> | EventType<E>[], cb: EventCallback<E>): void {
    const eventNames = (Array.isArray(type) ? type : [type]).map(value => value.name);
    this.vue.$on(eventNames, cb);
  }

  removeListener<E>(type: EventType<E> | EventType<E>[], cb: EventCallback<E>): void {
    const eventNames = (Array.isArray(type) ? type : [type]).map(value => value.name);
    this.vue.$off(eventNames, cb);
  }
}
