/*
  Copyright 2020-2021 Lowdefy, Inc

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
import chokidar from 'chokidar';
import BatchChanges from '../../utils/BatchChanges';

function buildWatcher({ build, context, reloadFn }) {
  let started = false;
  const buildCallback = async () => {
    if (started) {
      await build();
      reloadFn();
    } else {
      started = true;
    }
  };
  const buildBatchChanges = new BatchChanges({ fn: buildCallback, context });
  const configWatcher = chokidar.watch('.', {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    persistent: true,
  });
  configWatcher.on('add', () => buildBatchChanges.newChange());
  configWatcher.on('change', () => buildBatchChanges.newChange());
  configWatcher.on('unlink', () => buildBatchChanges.newChange());
}

export default buildWatcher;
