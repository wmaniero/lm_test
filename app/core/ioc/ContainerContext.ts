import { createContext } from 'react';
import { Container } from 'inversify';
import { ContainerType, IObjectContainerType } from 'core/CoreTypes';
import ObjectContainer, { IObjectContainer } from './ObjectContainer';

export const container = new Container();
export const ContainerContext = createContext(container);

container.bind(ContainerType).toConstantValue(container);
container.bind(IObjectContainerType).to(ObjectContainer).inSingletonScope();

export const objectContainer = container.get<IObjectContainer>(IObjectContainerType);
