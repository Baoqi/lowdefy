/*
  Copyright 2020 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import axiosHTTP from './http';
import { ConfigurationError, RequestError } from '../../context/errors';

const context = { ConfigurationError, RequestError };

describe('GET', () => {
  test('get default method,', async () => {
    const request = {
      url: 'https://postman-echo.com/get',
    };
    const connection = {};
    const res = await axiosHTTP({ request, connection, context });
    expect(res.status).toBe(200);
    expect(res.statusText).toBe('OK');
    expect(res.method).toBe(undefined);
    expect(res.path).toBe(undefined);
    expect(res.headers).toMatchObject({
      'content-type': 'application/json; charset=utf-8',
      date: expect.any(String),
      etag: expect.any(String),
      'content-length': expect.any(String),
    });
    expect(res.data).toMatchObject({
      args: {},
      headers: {
        'x-forwarded-proto': 'https',
        host: 'postman-echo.com',
        accept: 'application/json, text/plain, */*',
      },
      url: 'https://postman-echo.com/get',
    });
  });

  test('get specify method', async () => {
    const request = {
      url: 'https://postman-echo.com/get',
      method: 'get',
    };
    const connection = {};
    const res = await axiosHTTP({ request, connection, context });
    expect(res.status).toBe(200);
    expect(res.statusText).toBe('OK');
    expect(res.method).toBe(undefined);
    expect(res.path).toBe(undefined);
    expect(res.headers).toMatchObject({
      'content-type': 'application/json; charset=utf-8',
      date: expect.any(String),
      etag: expect.any(String),
      'content-length': expect.any(String),
    });
    expect(res.data).toMatchObject({
      args: {},
      headers: {
        'x-forwarded-proto': 'https',
        host: 'postman-echo.com',
        accept: 'application/json, text/plain, */*',
      },
      url: 'https://postman-echo.com/get',
    });
  });

  test('get with params', async () => {
    const request = {
      url: 'https://postman-echo.com/get',
      method: 'get',
      params: {
        foo: 'bar',
      },
    };
    const connection = {};
    const res = await axiosHTTP({ request, connection, context });
    expect(res.status).toBe(200);
    expect(res.statusText).toBe('OK');
    expect(res.method).toBe(undefined);
    expect(res.path).toBe(undefined);
    expect(res.headers).toMatchObject({
      'content-type': 'application/json; charset=utf-8',
      date: expect.any(String),
      etag: expect.any(String),
      'content-length': expect.any(String),
    });
    expect(res.data).toMatchObject({
      args: {
        foo: 'bar',
      },
      headers: {
        'x-forwarded-proto': 'https',
        host: 'postman-echo.com',
        accept: 'application/json, text/plain, */*',
      },
      url: 'https://postman-echo.com/get?foo=bar',
    });
  });
});

test('axios error', async () => {
  const request = {
    url: 'https://postman-echo.com/get',
    method: 'post',
    data: {
      foo: 'bar',
    },
  };
  const connection = {};
  await expect(axiosHTTP({ request, connection, context })).rejects.toThrow(RequestError);
  await expect(axiosHTTP({ request, connection, context })).rejects.toThrow(
    'Status: 404, Not Found; Data: ""'
  );
});

test('other error', async () => {
  await expect(axiosHTTP({ request: '', connection: '', context })).rejects.toThrow();
});
