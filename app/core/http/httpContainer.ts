import axios from 'axios';
import { HTTPClient } from './HttpClient';

export const httpClient = new HTTPClient(axios);
