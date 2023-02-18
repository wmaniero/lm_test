
import { interfaces } from 'inversify';
import { isFunction } from 'lodash';
import { helpers } from 'inversify-vanillajs-helpers';
import { ContainerType } from 'core/CoreTypes';

export interface IObjectContainer extends IServiceLocator {
  set<T>(key: symbol, object: interfaces.Newable<T> | T, parent?: string);
  contains(key: symbol): boolean;
  remove(key: symbol): void;
}

export interface IServiceLocator {
  get<T>(key: symbol, name?: string): T;
}

export default class ObjectContainer implements IObjectContainer {
  private container: interfaces.Container;

  constructor(container: interfaces.Container) {
    this.container = container;
  }

  get<T>(key: symbol, name?: string): T {
    return !name ? this.container.get<T>(key) : this.container.getNamed<T>(key, name);
  }

  set<T>(key: symbol, object: interfaces.Newable<T> | T, parent?: string) {
    const binding = isFunction(object)
      ? this.container.bind<T>(key).to(object as interfaces.Newable<T>)
      : this.container.bind<T>(key).toConstantValue(object as T);
    if (parent) {
      binding.whenInjectedInto(parent);
    }
  }

  contains(key: symbol): boolean {
    return this.container.isBound(key);
  }

  remove(key: symbol): void {
    this.container.unbind(key);
  }
}

helpers.annotate(ObjectContainer, [ContainerType]);
