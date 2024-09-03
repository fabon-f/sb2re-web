import { createMemo, createSignal, For } from 'solid-js';
import type { Component } from 'solid-js';
import { convert } from './sb2re';
import OutputArea from './OutputArea';

const App: Component = () => {
  const [text, setText] = createSignal('')
  const [baseHeadingLevel, setBaseHeadingLevel] = createSignal(3);
  const [titleIncluded, setTitleIncluded] = createSignal(true);
  let dialogElement: HTMLDialogElement | undefined;
  const reviewResult = createMemo(() => convert(text(), { baseHeadingLevel: baseHeadingLevel(), hasTitle: titleIncluded() }))
  return <div class="h-full flex flex-col">
    <header class="p-2 flex items-center justify-between">
      <span class="text-2xl">sb2re-web</span>
      <div class="flex gap-4">
        <button type="button" class="bg-transparent border-0 p-0 flex" title="設定" onClick={() => dialogElement?.showModal()}>
          <span class="i-material-symbols-light:settings block text-3xl" aria-hidden="true"></span>
          <span class="text-xl">設定</span>
        </button>
        <a href="https://github.com/fabon-f/sb2re-web" target="_blank" rel="noopener" class="i-logos:github-icon text-3xl">
          <span class="sr-only">GitHub</span>
        </a>
        <dialog ref={dialogElement} class="backdrop:bg-black/50">
          <form method="dialog" class="space-y-6">
            <div>
              <label>
                <div class="text-lg">見出し基準レベル</div>
                <input type="number" onInput={e => setBaseHeadingLevel(parseInt(e.target.value))} value={3} min={2} max={10} />
              </label>
              <div><code>{`[${'*'.repeat(baseHeadingLevel())} 見出し]`}</code>を節の見出しとして扱う</div>
            </div>
            <div>
              <label>
                <input type="checkbox" checked={titleIncluded()} oninput={e => setTitleIncluded(e.target.checked)} />
                <span class="text-lg">1行目を章タイトルとして扱う</span>
              </label>
            </div>
            <button type="submit">閉じる</button>
          </form>
        </dialog>
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
