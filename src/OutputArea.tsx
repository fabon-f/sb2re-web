import { For, Show } from 'solid-js';
import type { Component } from 'solid-js';

type Props = {
  value: string,
  errors: string[],
  warnings: string[],
};

const OutputArea: Component<Props> = (props) => {
  return <div class="w-full h-full flex flex-col">
    <textarea readonly value={props.value} class="flex-1 resize-none" onClick={e => { e.currentTarget.select(); }} />
    <Show when={props.errors.length !== 0}>
      <ul>
        <For each={props.errors}>
          { error =>
            <li>{ error }</li>
          }
        </For>
      </ul>
    </Show>
    <Show when={props.warnings.length !== 0}>
      <ul>
        <For each={props.warnings}>
          { warning =>
            <li>{ warning }</li>
          }
        </For>
      </ul>
    </Show>
  </div>;
}

export default OutputArea;
