import { createMemo, createSignal, For } from 'solid-js';
import type { Component } from 'solid-js';
import { convert } from './sb2re';

const App: Component = () => {
  const [text, setText] = createSignal('')
  const [baseHeadingLevel, setBaseHeadingLevel] = createSignal(3);
  const [titleIncluded, setTitleIncluded] = createSignal(true);
  const reviewResult = createMemo(() => convert(text(), { baseHeadingLevel: baseHeadingLevel(), hasTitle: titleIncluded() }))
  return <div>
    <textarea onInput={e => setText(e.target.value)}></textarea>
    <textarea readonly value={reviewResult().text}></textarea>
    <label>
      見出し基準レベル
      <input type="number" onInput={e => setBaseHeadingLevel(parseInt(e.target.value))} value={3} />
    </label>
    <label>
      1行目を章タイトルとして扱う
      <input type="checkbox" checked={titleIncluded()} oninput={e => setTitleIncluded(e.target.checked)} />
    </label>
    <ul>
      <For each={reviewResult().errors}>
        { error =>
          <li>{ error }</li>
        }
      </For>
    </ul>
    <ul>
      <For each={reviewResult().warnings}>
        { warning =>
          <li>{ warning }</li>
        }
      </For>
    </ul>
  </div>;
};

export default App;
