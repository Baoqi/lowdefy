import testContext from '../testContext';

// Mock apollo client
const mockReqResponses = {
  req_one: {
    data: {
      request: {
        id: 'req_one',
        success: true,
        response: 1,
      },
    },
  },
  req_two: {
    data: {
      request: {
        id: 'req_two',
        success: true,
        response: 2,
      },
    },
  },
};

const mockQuery = jest.fn();
const mockQueryImp = ({ variables }) => {
  const { requestInput } = variables;
  const { requestId } = requestInput;
  return new Promise((resolve, reject) => {
    if (requestId === 'req_error') {
      reject(mockReqResponses[requestId]);
    }
    resolve(mockReqResponses[requestId]);
  });
};

const client = {
  query: mockQuery,
  writeFragment: jest.fn(),
};

// Mock message
const mockMessageSuccess = jest.fn();
const mockMessageError = jest.fn();
const message = { loading: () => jest.fn(), error: mockMessageError, success: mockMessageSuccess };

const openidLogoutUrl = 'logout';
const pageId = 'one';
const user = { firstName: 'ABC' };

const rootContext = {
  client,
  // appGraphql,
  message,
  openidLogoutUrl,
  user,
};

beforeEach(() => {
  mockQuery.mockReset();
  mockQuery.mockImplementation(mockQueryImp);
});

test('Fetch call one request', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    requests: [
      {
        requestId: 'req_one',
      },
    ],
    areas: {
      content: {
        blocks: [
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
              valueType: 'string',
            },
            actions: {
              onClick: [{ id: 'a', type: 'Fetch', params: 'req_one' }],
            },
          },
        ],
      },
    },
  };
  const context = testContext({
    rootContext,
    rootBlock,
    pageId,
  });
  const { button } = context.RootBlocks.map;
  await context.Requests.callRequests();
  expect(context.requests.req_one).toEqual({
    error: [null],
    loading: false,
    response: 1,
  });
  const promise = button.callAction({ action: 'onClick' });
  expect(context.requests.req_one).toEqual({
    error: [null],
    loading: true,
    response: 1,
  });
  await promise;
  expect(context.requests.req_one).toEqual({
    error: [null, null],
    loading: false,
    response: 1,
  });
});

test('Fetch call all requests', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    requests: [
      {
        requestId: 'req_one',
      },
      {
        requestId: 'req_two',
      },
    ],
    areas: {
      content: {
        blocks: [
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
              valueType: 'string',
            },
            actions: {
              onClick: [{ id: 'a', type: 'Fetch' }],
            },
          },
        ],
      },
    },
  };
  const context = testContext({
    rootContext,
    rootBlock,
    pageId,
  });
  const { button } = context.RootBlocks.map;
  await context.Requests.callRequests();
  expect(context.requests).toEqual({
    req_one: {
      error: [null],
      loading: false,
      response: 1,
    },
    req_two: {
      error: [null],
      loading: false,
      response: 2,
    },
  });
  const promise = button.callAction({ action: 'onClick' });
  expect(context.requests).toEqual({
    req_one: {
      error: [null],
      loading: true,
      response: 1,
    },
    req_two: {
      error: [null],
      loading: true,
      response: 2,
    },
  });
  await promise;
  expect(context.requests).toEqual({
    req_one: {
      error: [null, null],
      loading: false,
      response: 1,
    },
    req_two: {
      error: [null, null],
      loading: false,
      response: 2,
    },
  });
});

test('Fetch call array of requests', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    requests: [
      {
        requestId: 'req_one',
      },
      {
        requestId: 'req_two',
      },
    ],
    areas: {
      content: {
        blocks: [
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
              valueType: 'string',
            },
            actions: {
              onClick: [{ id: 'a', type: 'Fetch', params: ['req_one', 'req_two'] }],
            },
          },
        ],
      },
    },
  };
  const context = testContext({
    rootContext,
    rootBlock,
    pageId,
  });
  const { button } = context.RootBlocks.map;
  await context.Requests.callRequests();
  expect(context.requests).toEqual({
    req_one: {
      error: [null],
      loading: false,
      response: 1,
    },
    req_two: {
      error: [null],
      loading: false,
      response: 2,
    },
  });
  const promise = button.callAction({ action: 'onClick' });
  expect(context.requests).toEqual({
    req_one: {
      error: [null],
      loading: true,
      response: 1,
    },
    req_two: {
      error: [null],
      loading: true,
      response: 2,
    },
  });
  await promise;
  expect(context.requests).toEqual({
    req_one: {
      error: [null, null],
      loading: false,
      response: 1,
    },
    req_two: {
      error: [null, null],
      loading: false,
      response: 2,
    },
  });
});
