import testContext from '../testContext';

const pageId = 'one';
const client = { writeFragment: jest.fn() };

const rootContext = {
  client,
};

test('list block no init', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'array_input',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
  const { list } = context.RootBlocks.map;
  expect(list.value).toBe(undefined);
  expect(context.state).toEqual({ list: [] });
});

test('list block with init', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'array_input',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
    initState: { list: [{ text: 'hello' }] },
  });
  const text0 = context.RootBlocks.map['list.0.text'];
  expect(text0.value).toEqual('hello');
  expect(context.state).toEqual({ list: [{ text: 'hello' }] });
});

test('list block init with non array', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'array_input',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
    initState: { list: 'hello' },
  });
  expect(context.state).toEqual({ list: [] });
});

test('list block no init push item, no defaultValue', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'array_input',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
  const { list } = context.RootBlocks.map;

  expect(list.value).toBe(undefined);
  expect(context.state).toEqual({ list: [] });
  list.pushItem();
  const text0 = context.RootBlocks.map['list.0.text'];

  expect(text0.value).toBe(null);
  expect(context.state).toEqual({ list: [{ text: null }] });
});

test('list block with init move item up', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'array_input',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'NumberInput',
                    blockId: 'list.$',
                    meta: {
                      category: 'input',
                      valueType: 'number',
                    },
                  },
                ],
              },
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
    initState: { list: [0, 1, 2, 3, 4, 5] },
  });
  const { list } = context.RootBlocks.map;
  expect(context.state).toEqual({ list: [0, 1, 2, 3, 4, 5] });
  list.moveItemUp(0);
  expect(context.state).toEqual({ list: [0, 1, 2, 3, 4, 5] });
  list.moveItemUp(1);
  expect(context.state).toEqual({ list: [1, 0, 2, 3, 4, 5] });
});

test('list block with init move item down', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'array_input',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'NumberInput',
                    blockId: 'list.$',
                    meta: {
                      category: 'input',
                      valueType: 'number',
                    },
                  },
                ],
              },
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
    initState: { list: [0, 1, 2, 3, 4, 5] },
  });
  const { list } = context.RootBlocks.map;
  expect(context.state).toEqual({ list: [0, 1, 2, 3, 4, 5] });
  list.moveItemDown(5);
  expect(context.state).toEqual({ list: [0, 1, 2, 3, 4, 5] });
  list.moveItemDown(1);
  expect(context.state).toEqual({ list: [0, 2, 1, 3, 4, 5] });
});

test('list block no init unshift item to start, no defaultValue', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'array_input',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
  const { list, root } = context.RootBlocks.map;
  const BlocksContainingList = context.RootBlocks.subBlocks[root.id][0];

  expect(list.value).toBe(undefined);
  expect(context.state).toEqual({ list: [] });
  list.unshiftItem();
  expect(context.state).toEqual({ list: [{ text: null }] });
  const text0 = context.RootBlocks.map['list.0.text'];
  const ListSubblocks0 = BlocksContainingList.subBlocks[list.id][0];

  text0.setValue('first');
  expect(context.state).toEqual({ list: [{ text: 'first' }] });
  expect(ListSubblocks0.arrayIndices).toEqual([0]);

  list.unshiftItem();
  expect(context.state).toEqual({ list: [{ text: null }, { text: 'first' }] });
  expect(ListSubblocks0.arrayIndices).toEqual([1]);

  // get new references to Blocks classes at index 0 and 1
  const NewListSubblocks0 = BlocksContainingList.subBlocks[list.id][0];
  const NewListSubblocks1 = BlocksContainingList.subBlocks[list.id][1];

  expect(NewListSubblocks0.arrayIndices).toEqual([0]);
  expect(NewListSubblocks1.arrayIndices).toEqual([1]);
  // first Blocks class should have moved to index 1
  expect(ListSubblocks0).toBe(NewListSubblocks1);

  // original text0
  expect(text0.value).toEqual('first');
  const newText0 = context.RootBlocks.map['list.0.text'];
  expect(newText0.value).toEqual(null);
});

test('list block no init unshift item to start, no defaultValue, block id not in array', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'array_input',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'other.$',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
  const { list, root } = context.RootBlocks.map;
  const BlocksContainingList = context.RootBlocks.subBlocks[root.id][0];
  expect(context.state).toEqual({ list: [] });
  list.unshiftItem();
  expect(context.state).toEqual({ other: [null] });
  const text0 = context.RootBlocks.map['other.0'];
  text0.setValue('first');
  expect(context.state).toEqual({ other: ['first'] });
  list.unshiftItem();

  const NewListSubblocks0 = BlocksContainingList.subBlocks[list.id][0];
  const NewListSubblocks1 = BlocksContainingList.subBlocks[list.id][1];

  expect(NewListSubblocks0.arrayIndices).toEqual([0]);
  expect(NewListSubblocks1.arrayIndices).toEqual([1]);
  expect(text0.value).toEqual('first');
  const newText0 = context.RootBlocks.map['other.0'];
  expect(newText0.value).toEqual(null);

  expect(context.state).toEqual({ other: [null, 'first'] });
});

test('list block unshift item clear all previous values', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'array_input',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                  {
                    type: 'List',
                    blockId: 'list.$.innerList',
                    meta: {
                      category: 'list',
                      valueType: 'array',
                    },
                    areas: {
                      content: {
                        blocks: [
                          {
                            type: 'NumberInput',
                            blockId: 'list.$.innerList.$',
                            meta: {
                              category: 'input',
                              valueType: 'string',
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
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
    initState: {
      list: [
        {
          text: 'A',
          innerList: [0],
        },
        {
          text: 'C',
          innerList: [1, 2],
        },
      ],
    },
  });
  const { list } = context.RootBlocks.map;
  expect(context.state).toEqual({
    list: [
      {
        text: 'A',
        innerList: [0],
      },
      {
        text: 'C',
        innerList: [1, 2],
      },
    ],
  });
  list.unshiftItem();
  expect(context.state).toEqual({
    list: [
      {
        text: null,
        innerList: [],
      },
      {
        text: 'A',
        innerList: [0],
      },
      {
        text: 'C',
        innerList: [1, 2],
      },
    ],
  });
});

test('list block with init push item, no defaultValue', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'array_input',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
    initState: { list: [{ text: 'a' }] },
  });
  const { list } = context.RootBlocks.map;
  expect(context.state).toEqual({ list: [{ text: 'a' }] });
  list.pushItem();
  expect(context.state).toEqual({ list: [{ text: 'a' }, { text: null }] });
});

test('list block with init including extra data and push item, no defaultValue', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.b',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
    initState: { list: [{ b: 'b', c: 'c' }], d: 'd' },
  });
  const { list } = context.RootBlocks.map;
  expect(context.state).toEqual({ list: [{ b: 'b', c: 'c' }], d: 'd' });
  list.pushItem();
  expect(context.state).toEqual({ list: [{ b: 'b', c: 'c' }, { b: null }], d: 'd' });
});

test('list block no init push item, with defaultValue', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'array_input',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    defaultValue: 'default',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
  expect(context.state).toEqual({ list: [] });
  const { list } = context.RootBlocks.map;
  list.pushItem();
  expect(context.state).toEqual({ list: [{ text: 'default' }] });
});

test('list block defaultValue', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'array_input',
            blockId: 'a',
            defaultValue: [{ b: 'default' }],
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'a.$.b',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
  expect(context.state).toEqual({ a: [{ b: 'default' }] });
});

test('list block with rec visible in parent blocks', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.a',
                    visible: true,
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                  {
                    type: 'TextInput',
                    blockId: 'list.$.b',
                    visible: { _mql_test: { 'list.0.a': 'show b' } },
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
            },
          },
          {
            type: 'TextInput',
            blockId: 'c',
            visible: { _mql_test: { 'list.0.b': { $exists: true } } },
            meta: {
              category: 'input',
              valueType: 'string',
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
    initState: { list: [{ b: 'b', a: 'a' }], c: 'c' },
  });
  const a0 = context.RootBlocks.map['list.0.a'];
  expect(context.state).toEqual({ list: [{ a: 'a' }] });
  a0.setValue('show b');
  expect(context.state).toEqual({ list: [{ b: 'b', a: 'show b' }], c: 'c' });
});

test('list block with visible', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            visible: { _state: 'swtch' },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.a',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
            },
          },
          {
            type: 'Switch',
            blockId: 'swtch',
            meta: {
              category: 'input',
              valueType: 'boolean',
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
    initState: { list: [{ a: 'a' }], swtch: true },
  });
  const { swtch } = context.RootBlocks.map;

  expect(context.state).toEqual({ list: [{ a: 'a' }], swtch: true });
  swtch.setValue(false);
  expect(context.state).toEqual({ swtch: false });
  swtch.setValue(true);
  expect(context.state).toEqual({ list: [{ a: 'a' }], swtch: true });
});

test('toggle list object field visibility with index', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    visible: { _state: 'list.$.swtch' },
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                  {
                    type: 'Switch',
                    blockId: 'list.$.swtch',
                    meta: {
                      category: 'input',
                      valueType: 'boolean',
                    },
                  },
                ],
              },
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
    initState: {
      list: [
        { text: 'a1', swtch: true },
        { text: 'a2', swtch: false },
      ],
    },
  });
  const swtch1 = context.RootBlocks.map['list.1.swtch'];

  expect(context.state).toEqual({ list: [{ text: 'a1', swtch: true }, { swtch: false }] });
  swtch1.setValue(true);
  expect(context.state).toEqual({
    list: [
      { text: 'a1', swtch: true },
      { text: 'a2', swtch: true },
    ],
  });
  swtch1.setValue(false);
  expect(context.state).toEqual({ list: [{ text: 'a1', swtch: true }, { swtch: false }] });
});

test('primitive list block no init', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'List',
                    blockId: 'list',
                    meta: {
                      category: 'list',
                      valueType: 'array',
                    },
                    areas: {
                      content: {
                        blocks: [
                          {
                            type: 'NumberInput',
                            blockId: 'list.$',
                            meta: {
                              category: 'input',
                              valueType: 'number',
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
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
  expect(context.state).toEqual({ list: [] });
});

test('primitive list block with init', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'NumberInput',
                    blockId: 'list.$',
                    meta: {
                      category: 'input',
                      valueType: 'number',
                    },
                  },
                ],
              },
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
    initState: { list: [1, 2, 3] },
  });
  const number0 = context.RootBlocks.map['list.0'];
  expect(number0.value).toBe(1);
  expect(context.state).toEqual({ list: [1, 2, 3] });
});

test('primitive list block with init, push item and setValue', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'NumberInput',
                    blockId: 'list.$',
                    meta: {
                      category: 'input',
                      valueType: 'number',
                    },
                  },
                ],
              },
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
    initState: { list: [1, 2, 3] },
  });
  expect(context.state).toEqual({ list: [1, 2, 3] });
  const { list } = context.RootBlocks.map;
  list.pushItem();
  expect(context.state).toEqual({ list: [1, 2, 3, null] });
  const a3 = context.RootBlocks.map['list.3'];
  a3.setValue(-1);
  expect(context.state).toEqual({ list: [1, 2, 3, -1] });
});

test('primitive list block with init, push item and setValue', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'NumberInput',
                    blockId: 'list.$',
                    meta: {
                      category: 'input',
                      valueType: 'number',
                    },
                  },
                ],
              },
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
    initState: { list: [1, 2, 3] },
  });
  expect(context.state).toEqual({ list: [1, 2, 3] });
  const { list } = context.RootBlocks.map;
  list.pushItem();
  expect(context.state).toEqual({ list: [1, 2, 3, null] });
  const a3 = context.RootBlocks.map['list.3'];
  a3.setValue(-1);
  expect(context.state).toEqual({ list: [1, 2, 3, -1] });
});

test('primitive list block with init and push item with defaultValue', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'NumberInput',
                    blockId: 'list.$',
                    defaultValue: 10,
                    meta: {
                      category: 'input',
                      valueType: 'number',
                    },
                  },
                ],
              },
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
    initState: { list: [1, 2, 3] },
  });
  expect(context.state).toEqual({ list: [1, 2, 3] });
  const { list } = context.RootBlocks.map;
  list.pushItem();
  expect(context.state).toEqual({ list: [1, 2, 3, 10] });
});

test('list block with nested primitive array with init, push item default on inputs and setValue', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'List',
                    blockId: 'list.$.innerList',
                    meta: {
                      category: 'list',
                      valueType: 'array',
                    },
                    areas: {
                      content: {
                        blocks: [
                          {
                            type: 'NumberInput',
                            blockId: 'list.$.innerList.$',
                            defaultValue: 10,
                            meta: {
                              category: 'input',
                              valueType: 'number',
                            },
                          },
                        ],
                      },
                    },
                  },
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    defaultValue: 'text dV',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
    initState: { list: [{ innerList: [1, 2, 3], text: 'text' }] },
  });
  expect(context.state).toEqual({ list: [{ innerList: [1, 2, 3], text: 'text' }] });
  const { list } = context.RootBlocks.map;
  list.pushItem();
  expect(context.state).toEqual({
    list: [
      { innerList: [1, 2, 3], text: 'text' },
      { innerList: [], text: 'text dV' },
    ],
  });
  const innerList1 = context.RootBlocks.map['list.1.innerList'];
  innerList1.pushItem();
  expect(context.state).toEqual({
    list: [
      { innerList: [1, 2, 3], text: 'text' },
      { innerList: [10], text: 'text dV' },
    ],
  });
  const number10 = context.RootBlocks.map['list.1.innerList.0'];
  number10.setValue(-1);
  expect(context.state).toEqual({
    list: [
      { innerList: [1, 2, 3], text: 'text' },
      { innerList: [-1], text: 'text dV' },
    ],
  });
});

test('list block with nested primitive array with init, push item and setValue', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'List',
                    blockId: 'list.$.innerList',
                    defaultValue: [-1, 0, 1],
                    meta: {
                      category: 'list',
                      valueType: 'array',
                    },
                    areas: {
                      content: {
                        blocks: [
                          {
                            type: 'NumberInput',
                            blockId: 'list.$.innerList.$',
                            defaultValue: 10,
                            meta: {
                              category: 'input',
                              valueType: 'number',
                            },
                          },
                        ],
                      },
                    },
                  },
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
    initState: { list: [{ innerList: [1, 2, 3], text: 'text' }] },
  });
  expect(context.state).toEqual({ list: [{ innerList: [1, 2, 3], text: 'text' }] });
  const { list } = context.RootBlocks.map;
  list.pushItem();
  expect(context.state).toEqual({
    list: [
      { innerList: [1, 2, 3], text: 'text' },
      { innerList: [-1, 0, 1], text: null },
    ],
  });
  const innerList1 = context.RootBlocks.map['list.1.innerList'];
  innerList1.pushItem();
  expect(context.state).toEqual({
    list: [
      { innerList: [1, 2, 3], text: 'text' },
      { innerList: [-1, 0, 1, 10], text: null },
    ],
  });
  const number13 = context.RootBlocks.map['list.1.innerList.3'];
  number13.setValue(-1);
  expect(context.state).toEqual({
    list: [
      { innerList: [1, 2, 3], text: 'text' },
      { innerList: [-1, 0, 1, -1], text: null },
    ],
  });
});

test('list block with init remove item of first item and more than two values', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
    initState: { list: [{ text: '0' }, { text: '1' }, { text: '2' }] },
  });
  const { list } = context.RootBlocks.map;
  expect(context.state).toEqual({ list: [{ text: '0' }, { text: '1' }, { text: '2' }] });
  list.removeItem(0);
  expect(context.state).toEqual({ list: [{ text: '1' }, { text: '2' }] });
  const blocksContainingList = context.RootBlocks.subBlocks[context.RootBlocks.map.root.id][0];
  const listSubblocksList = blocksContainingList.subBlocks[list.id];
  expect(listSubblocksList[0].arrayIndices).toEqual([0]);
  expect(listSubblocksList[1].arrayIndices).toEqual([1]);
  expect(listSubblocksList.length).toEqual(2);
});

test('list block remove item, add item does not have previous item value ', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
    initState: { list: [{ text: '0' }] },
  });
  const { list } = context.RootBlocks.map;
  const blocksContainingList = context.RootBlocks.subBlocks[context.RootBlocks.map.root.id][0];
  const listSubblocksList = blocksContainingList.subBlocks[list.id];

  expect(context.state).toEqual({ list: [{ text: '0' }] });
  list.removeItem(0);
  expect(context.state).toEqual({ list: [] });
  expect(listSubblocksList.length).toEqual(0);
  list.pushItem();
  expect(context.state).toEqual({ list: [{ text: null }] });
  expect(listSubblocksList.length).toEqual(1);
});

test('list block with init remove item and set existing item values', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                ],
              },
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
    initState: { list: [{ text: '0' }, { text: '1' }, { text: '2' }] },
  });
  const { list } = context.RootBlocks.map;
  const text0 = context.RootBlocks.map['list.0.text'];
  const text2 = context.RootBlocks.map['list.2.text'];
  const blocksContainingList = context.RootBlocks.subBlocks[context.RootBlocks.map.root.id][0];
  const listSubblocksList = blocksContainingList.subBlocks[list.id];

  expect(context.state).toEqual({ list: [{ text: '0' }, { text: '1' }, { text: '2' }] });
  expect(listSubblocksList[0].arrayIndices).toEqual([0]);
  expect(listSubblocksList[1].arrayIndices).toEqual([1]);
  expect(listSubblocksList[2].arrayIndices).toEqual([2]);

  list.removeItem(1);
  expect(context.state).toEqual({ list: [{ text: '0' }, { text: '2' }] });
  expect(listSubblocksList[0].arrayIndices).toEqual([0]);
  expect(listSubblocksList[1].arrayIndices).toEqual([1]);
  expect(listSubblocksList.length).toEqual(2);

  text0.setValue('new 0');
  text2.setValue('new 2');
  expect(context.state).toEqual({ list: [{ text: 'new 0' }, { text: 'new 2' }] });

  list.pushItem();
  expect(context.state).toEqual({ list: [{ text: 'new 0' }, { text: 'new 2' }, { text: null }] });
  expect(listSubblocksList.length).toEqual(3);
});

test('primitive list block with init remove item', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'NumberInput',
                    blockId: 'list.$',
                    meta: {
                      category: 'input',
                      valueType: 'number',
                    },
                  },
                ],
              },
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
    initState: { list: [0, 1, 2, 3, 4, 5, 6, 7] },
  });
  expect(context.state).toEqual({ list: [0, 1, 2, 3, 4, 5, 6, 7] });

  const { list } = context.RootBlocks.map;
  const num3 = context.RootBlocks.map['list.3'];
  const num5 = context.RootBlocks.map['list.5'];
  const blocksContainingList = context.RootBlocks.subBlocks[context.RootBlocks.map.root.id][0];
  const listSubblocksList = blocksContainingList.subBlocks[list.id];

  const B3 = listSubblocksList[3];
  const B4 = listSubblocksList[4];
  const B5 = listSubblocksList[5];
  const B6 = listSubblocksList[6];
  expect(B3.arrayIndices).toEqual([3]);
  expect(B4.arrayIndices).toEqual([4]);
  expect(B5.arrayIndices).toEqual([5]);
  expect(B6.arrayIndices).toEqual([6]);

  list.removeItem(4);
  expect(context.state).toEqual({ list: [0, 1, 2, 3, 5, 6, 7] });
  expect(B3.arrayIndices).toEqual([3]);
  expect(B4.arrayIndices).toEqual([4]);
  expect(B5.arrayIndices).toEqual([4]);
  expect(B6.arrayIndices).toEqual([5]);

  list.pushItem();
  num3.setValue(30);
  num5.setValue(50);
  expect(context.state).toEqual({ list: [0, 1, 2, 30, 50, 6, 7, null] });
});

test('nested list', () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            type: 'Paragraph',
            blockId: 'par',
            meta: {
              category: 'display',
            },
          },
          {
            type: 'List',
            blockId: 'list',
            meta: {
              category: 'list',
              valueType: 'array',
            },
            areas: {
              content: {
                blocks: [
                  {
                    type: 'TextInput',
                    blockId: 'list.$.text',
                    meta: {
                      category: 'input',
                      valueType: 'string',
                    },
                  },
                  {
                    type: 'Switch',
                    blockId: 'list.$.swtch',
                    defaultValue: true,
                    meta: {
                      category: 'input',
                      valueType: 'boolean',
                    },
                  },
                  {
                    type: 'Box',
                    blockId: 'list.$.container',
                    meta: {
                      category: 'container',
                    },
                    visible: { _state: 'list.$.swtch' },
                    areas: {
                      content: {
                        blocks: [
                          {
                            type: 'Paragraph',
                            blockId: 'list.$.par',
                            meta: {
                              category: 'display',
                            },
                          },
                          {
                            type: 'List',
                            blockId: 'list.$.innerList',
                            meta: {
                              category: 'list',
                              valueType: 'array',
                            },
                            areas: {
                              content: {
                                blocks: [
                                  {
                                    type: 'List',
                                    blockId: 'list.$.innerList.$.innerInnerList',
                                    meta: {
                                      category: 'list',
                                      valueType: 'array',
                                    },
                                    areas: {
                                      content: {
                                        blocks: [
                                          {
                                            type: 'NumberInput',
                                            blockId: 'list.$.innerList.$.innerInnerList.$',
                                            meta: {
                                              category: 'input',
                                              valueType: 'number',
                                            },
                                          },
                                        ],
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
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
    initState: {
      list: [
        { text: 'b0' },
        { text: 'b1' },
        { text: 'b2', innerList: [{ innerInnerList: [1, 2, 3, 4, 5, 6, 7] }] },
        { text: 'b3', innerList: [{ innerInnerList: [1, 2, 3] }] },
        { text: 'b4' },
      ],
    },
  });
  expect(context.state).toEqual({
    list: [
      { text: 'b0', innerList: [], swtch: true },
      { text: 'b1', innerList: [], swtch: true },
      { text: 'b2', innerList: [{ innerInnerList: [1, 2, 3, 4, 5, 6, 7] }], swtch: true },
      { text: 'b3', innerList: [{ innerInnerList: [1, 2, 3] }], swtch: true },
      { text: 'b4', innerList: [], swtch: true },
    ],
  });

  const { list } = context.RootBlocks.map;
  const container2 = context.RootBlocks.map['list.2.container'];
  const swtch2 = context.RootBlocks.map['list.2.swtch'];

  swtch2.setValue(false);
  expect(container2.visibleEval.output).toEqual(false);
  expect(context.state).toEqual({
    list: [
      { text: 'b0', innerList: [], swtch: true },
      { text: 'b1', innerList: [], swtch: true },
      { text: 'b2', swtch: false },
      { text: 'b3', innerList: [{ innerInnerList: [1, 2, 3] }], swtch: true },
      { text: 'b4', innerList: [], swtch: true },
    ],
  });

  swtch2.setValue(true);
  expect(container2.visibleEval.output).toEqual(true);
  expect(context.state).toEqual({
    list: [
      { text: 'b0', innerList: [], swtch: true },
      { text: 'b1', innerList: [], swtch: true },
      { text: 'b2', innerList: [{ innerInnerList: [1, 2, 3, 4, 5, 6, 7] }], swtch: true },
      { text: 'b3', innerList: [{ innerInnerList: [1, 2, 3] }], swtch: true },
      { text: 'b4', innerList: [], swtch: true },
    ],
  });

  list.removeItem(2);
  expect(context.state).toEqual({
    list: [
      { text: 'b0', innerList: [], swtch: true },
      { text: 'b1', innerList: [], swtch: true },
      { text: 'b3', innerList: [{ innerInnerList: [1, 2, 3] }], swtch: true },
      { text: 'b4', innerList: [], swtch: true },
    ],
  });

  list.pushItem();
  expect(context.state).toEqual({
    list: [
      { text: 'b0', innerList: [], swtch: true },
      { text: 'b1', innerList: [], swtch: true },
      { text: 'b3', innerList: [{ innerInnerList: [1, 2, 3] }], swtch: true },
      { text: 'b4', innerList: [], swtch: true },
      { text: null, innerList: [], swtch: true },
    ],
  });
});
