import { useContext } from 'react';
import { ContainerContext } from './ContainerContext';

export function useDependency<T>(key: symbol, name?: string): T {
    const container = useContext(ContainerContext);

    return (name ? container.getNamed(key, name) : container.get(key)) as T;
}
