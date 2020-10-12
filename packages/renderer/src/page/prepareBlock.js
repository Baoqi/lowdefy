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

import React, { lazy } from 'react';
import useDynamicScript from '../utils/useDynamicScript';
import loadComponent from '../utils/loadComponent';

const prepareBlock = ({ Components, block }) => {
  const componentId = `${block.meta.scope}:${block.meta.module}`;
  const { ready, failed } = useDynamicScript({
    url: block.meta.url,
  });
  if (!Components[componentId]) {
    if (!ready) {
      return <h2>Loading dynamic script: {block.meta.url}</h2>;
    }
    if (failed) {
      return <h2>Failed to load dynamic script: {block.meta.url}</h2>;
    }
    Components[componentId] = lazy(loadComponent(block.meta.scope, block.meta.module));
  }
  return Components[componentId];
};

export default prepareBlock;
