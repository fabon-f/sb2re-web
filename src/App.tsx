import { createMemo, createSignal, For } from 'solid-js';
import type { Component } from 'solid-js';
import { convert } from './sb2re';
import OutputArea from './OutputArea';

const App: Component = () => {
  const [text, setText] = createSignal('')
  const [baseHeadingLevel, setBaseHeadingLevel] = createSignal(3);
  const [titleIncluded, setTitleIncluded] = createSignal(true);
  const reviewResult = createMemo(() => convert(text(), { baseHeadingLevel: baseHeadingLevel(), hasTitle: titleIncluded() }))
  return <div class="h-full flex flex-col">
    <header class="p-2 flex items-center justify-between">
      <span class="text-2xl">sb2re-web</span>
      <div class="flex gap-2">
        <label>
          見出し基準レベル
          <input type="number" onInput={e => setBaseHeadingLevel(parseInt(e.target.value))} value={3} />
        </label>
        <label>
          1行目を章タイトルとして扱う
          <input type="checkbox" checked={titleIncluded()} oninput={e => setTitleIncluded(e.target.checked)} />
        </label>
      </div>
    </header>
    <div class="flex-1 flex">
      <div class="w-2/4 p-2">
        <textarea onInput={e => setText(e.target.value)} class="w-full h-full resize-none"></textarea>
      </div>
      <div class="w-2/4 p-2">
        <OutputArea value={reviewResult().text} errors={reviewResult().errors} warnings={reviewResult().warnings} />
      </div>
    </div>
  </div>;
};

export default App;
