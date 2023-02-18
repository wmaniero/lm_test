import { container } from 'core/ioc/ContainerContext';
import { httpClient } from 'core/http/httpContainer';
import { IHTTPClientType } from 'core/CoreTypes';

container.bind(IHTTPClientType).toConstantValue(httpClient);
