import { createMemo, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import type { Component } from 'solid-js';
import { convert } from './sb2re';
import OutputArea from './OutputArea';

const App: Component = () => {
  const [text, setText] = createSignal('')
  const [settings, setSettings] = createStore({
    baseHeadingLevel: 3,
    titleIncluded: true,
  });
  let dialogElement: HTMLDialogElement | undefined;
  const reviewResult = createMemo(() => convert(text(), { baseHeadingLevel: settings.baseHeadingLevel, hasTitle: settings.titleIncluded }))
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
                <input type="number" onInput={e => setSettings({ baseHeadingLevel: parseInt(e.target.value) })} value={3} min={2} max={10} />
              </label>
              <div><code>{`[${'*'.repeat(settings.baseHeadingLevel)} 見出し]`}</code>を節の見出しとして扱う</div>
            </div>
            <div>
              <label>
                <input type="checkbox" checked={settings.titleIncluded} onInput={e => setSettings({ titleIncluded: e.target.checked })} />
                <span class="text-lg">1行目を章タイトルとして扱う</span>
              </label>
            </div>
            <button type="submit" autofocus>閉じる</button>
          </form>
        </dialog>
      </div>
    </header>
    <div class="flex-1 flex">
      <div class="w-2/4 p-2">
        <textarea onInput={e => setText(e.target.value)} class="w-full h-full resize-none" placeholder="Scrapboxテキストを入力"></textarea>
      </div>
      <div class="w-2/4 p-2">
        <OutputArea value={reviewResult().text} errors={reviewResult().errors} warnings={reviewResult().warnings} />
      </div>
    </div>
  </div>;
};

export default App;
